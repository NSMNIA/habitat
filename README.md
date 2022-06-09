<h1 align="center">Habitat 360</h1>

# The project
This project is made with [Next.js](https://nextjs.org/). It is an application that is built on [React](https://reactjs.org/) and uses [NextAuth](https://next-auth.js.org/) to provide a seamless user experience.

## NextAuth
NextAuth is a [Next.js](https://nextjs.org/) based authentication and authorization system. It is built on top of [Passport.js](https://www.passportjs.org/). First, NextAuth is configured to use a [database](https://next-auth.js.org/adapters/prisma) that uses [MySQL](https://www.mysql.com/). The database connection is connected via [Prisma](https://www.prisma.io/).

In the file [/pages/api/auth/[...nextauth].ts](https://github.com/NSMNIA/habitat/blob/main/pages/api/auth/%5B...nextauth%5D.ts) are the authentication providers. For now, it uses the [Google](https://next-auth.js.org/providers/google) and [email](https://next-auth.js.org/providers/email) provider.

The callback gets the user's information from the database and creates a session. This session is stored in a cookie of the browser as a [JSON Web Token](https://jwt.io/).

## Middleware
To use the authentication system, the user must be authenticated. The authentication middleware is used to check if the user is authenticated or if the user is authorised. The middleware will be executed before the route handler. You can use the [Next Middleware](https://nextjs.org/docs/advanced-features/middleware) function to create the middleware.

### Example
To see if the user is autorised to access a route you can use the following code:
```typescript
// pages/promoter/_middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const session: any = await getToken({
        req,
        secret: process.env.JWT_SECRET
    });
    const { pathname, origin } = req.nextUrl;
    if (!session) return NextResponse.redirect(`${origin}/`);
    if (session?.user?.Roles?.role_type.toLowerCase() !== 'promoter') return NextResponse.redirect(`${origin}/`)
    return NextResponse.next();
}
```
First it will check if the user is authenticated. If the user is not authenticated, the user will be redirected to the homepage. If the user is authenticated, it will check if the user is a promoter. If the user is not a promoter, the user will be redirected to the homepage.

## Database
The database is connected to the [Prisma](https://www.prisma.io/) database. The database is used to store the users and their information. To use the database, you must import the [Prisma](https://www.prisma.io/) library and the [PrismaClient](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/). In the file [/prisma/schema.prisma](https://github.com/NSMNIA/habitat/blob/main/prisma/schema.prisma) is the database schema. You can use the [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference) to generate the schema. With Prisma you can always choose another provider then `MySQL`, like `PostgreSQL`, `SQLite`, `SQL Server`, `MongoDB` or `CockroachDB`. So, if you want to change to another provider, it can automatically compile your relational database scheme into your chosen provider.

## Environment variables
To create the environment variables, you'll need to create a file called `.env` in the root directory of the project. If the file is not created the application will not be working. The file should contain the following variables:
```dotenv
NODE_ENV="development"
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
DB_HOSTNAME=""
DB_PORT=""
DATABASE_URL="mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}";
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT=""
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
JWT_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
```

## Getting data
To get data in the pages, you'll need the function `getServerSideProps`. To get data form the database you'll need to make an `API` route. The `API` needs to be called in the `getServerSideProps` function. The data can be returned as a JSON object and can later be used in the page.

### Example
```tsx
// pages/properties/index.tsx
export async function getServerSideProps(context: GetServerSidePropsContext) {
    ...
    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/all`).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });
    ...
}
```
```tsx
// pages/api/properties/all.ts
const handler = async (req: any, res: any) => {
    const prisma = new PrismaClient()
    if (req.method !== 'POST') return res.status(503).json({ success: 0, message: 'Method not allowed' });
    try {
        const cities = await prisma.properties.groupBy({
            by: ['city']
        })
        await prisma.properties.findMany({
            include: {
                PropertyFiles: true
            }
        }).then(found => {
            if (!found) return res.status(500).json({ success: 0, message: 'Internal server error' });
            return res.status(200).json({ success: 1, message: 'Properties found successfully', properties: found, cities: cities });
        })
    } catch (err: any) {
        return res.json({ success: 0, message: err.message });
    }
}
```

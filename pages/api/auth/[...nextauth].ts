import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || ''
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, token }: any) {
            if (token?.user) {
                session.user = token.user;
            }
            if (token?.role) {
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }: any) {
            if (user) token.user = user;
            await prisma.user.findUnique({
                where: {
                    id: token?.user?.id
                },
                include: {
                    Roles: true
                }
            }).then(found => {
                if (!found) return token;
                token.user = found;
            });
            return token
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/',
        verifyRequest: '/verify',
        newUser: '/app/new',
    },
    secret: process.env.JWT_SECRET
})
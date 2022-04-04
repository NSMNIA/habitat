import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { Sequelize, DataTypes } from "sequelize"
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    sync: false
});

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
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    adapter: SequelizeAdapter(sequelize, {
        models: {
            User: sequelize.define("user", {
                ...models.User,
                roles: DataTypes.INTEGER,
            }),
        }
    }),
})
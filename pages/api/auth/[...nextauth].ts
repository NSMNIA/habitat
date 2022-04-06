import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { Sequelize, DataTypes } from "sequelize"
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"

const DB_NAME = process.env.DB_NAME || 'habitat';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
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
    callbacks: {
        session: async ({ session, token, user }) => {
            let success: boolean = parseInt(user?.id) > 0;
            if (user && success) {
                const details = {
                    user: {
                        ...user
                    }
                }
                return Promise.resolve({
                    ...session,
                    ...details
                });
            }
            return session
        }
    }
})
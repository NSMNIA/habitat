import type { NextPage } from 'next'
import { getSession, signOut } from 'next-auth/react'

const Dashboard = ({ session }: any) => {
    const user = session?.user;

    return (
        <>
            Dashboard

            <button onClick={() => signOut()}>
                Sign out
            </button>
        </>
    )
}

export default Dashboard

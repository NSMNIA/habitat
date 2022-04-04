import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Dashboard = ({ session }: any) => {
    const user = session?.user;

    return (
        <>
            Dashboard
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (!session) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    };

    return {
        props: {
            session
        }
    }
}

export default Dashboard

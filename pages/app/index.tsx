import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'

const Dashboard = () => {
    const session = useSession();

    if (session.status === 'loading') return (<div>Loading...</div>);
    console.log(session.data);
    return (
        <>
            <h1>Welcome {session.data?.user?.name}</h1>
            <p>Role: {session.data?.user?.role}</p>

            <button onClick={() => signOut()}>
                Sign out
            </button>
        </>
    )
}

export default Dashboard

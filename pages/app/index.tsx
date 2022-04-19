import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'

const Dashboard = () => {
    const session = useSession();

    if (session.status === 'loading') return (<div>Loading...</div>);
    return (
        <>
            <h1>Welcome {session.data?.user?.name}</h1>
            <p>Role name: {session.data?.user?.Roles?.role_name}</p>
            <p>Role type: {session.data?.user?.Roles?.role_type}</p>

            <button onClick={() => signOut()}>
                Sign out
            </button>
        </>
    )
}

export default Dashboard

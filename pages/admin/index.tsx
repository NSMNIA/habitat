import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

const index = (props: Props) => {
    const session = useSession();

    if (session.status === 'loading') return (<div>Loading...</div>);
    console.log(session.data);
    return (
        <div>
            <h1>Admin</h1>
        </div>
    )
}

export default index
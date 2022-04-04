import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (session) return (<>
    <h2>{session.user?.name}</h2>
    {session.user?.image && <div style={{ width: '200px', height: '400px', position: 'relative' }}><Image src={session.user?.image} alt="profile_pic" layout='fill' objectFit='cover' /></div>}
    <button onClick={() => signOut()}>
      Sign out
    </button>
  </>)
  return (
    <>
      <h1>Hallo</h1>
      <button onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default Home

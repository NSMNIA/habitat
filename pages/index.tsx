import React, { useState } from 'react';
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import type { NextPage } from 'next'
import { getSession, signIn } from 'next-auth/react';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const loginViaEmail = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email === '') return;
    signIn('email', { callbackUrl: '/app', email });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <div>
          <form action='' onSubmit={loginViaEmail}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">Send login link</button>
          </form>
          <button onClick={() => signIn('google', { callbackUrl: '/app' })}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) return {
    redirect: {
      permanent: false,
      destination: '/app'
    },
    props: {
      session
    }
  }

  return {
    props: {

    }
  }
}
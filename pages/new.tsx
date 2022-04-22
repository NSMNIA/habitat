import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

type Props = {}

const New = (props: Props) => {
    const session: any = useSession();
    const [name, setName] = useState<string>('');
    const [contactMessenger, setContactMessenger] = useState<string>('');
    const [contactWhatsapp, setContactWhatsapp] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (session.status === 'authenticated') {
            setName(session?.data?.user?.name !== null ? session?.data?.user?.name : '');
            setContactMessenger(session?.data?.user?.contact_messager !== null ? session?.data?.user?.contact_messager : '');
            setContactWhatsapp(session?.data?.user?.contact_whatsapp !== null ? session?.data?.user?.contact_whatsapp : '');
            setLanguage(session?.data?.user?.language === null ? '' : session?.data?.user?.language);
            setLoaded(true)
        }
    }, [session]);

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    const updateUser = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setUpdating(true);
        if (name === '' || language === '') return;
        await axios.post('/api/user/update', {
            id: session?.data?.user?.id,
            name,
            contact_messager: contactMessenger,
            contact_whatsapp: contactWhatsapp,
            language
        }).then((res: any) => {
            setUpdating(false);
            reloadSession();
            return router.push({
                pathname: '/',
            })
        }).catch(err => {
            setUpdating(false);
            console.error(err.message);
        })
    }

    // TODO: add subscriptions

    return (
        <div>
            <h1>Registreer</h1>
            <form action="" method='post' onSubmit={updateUser}>
                {loaded && (
                    <>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                        <input type="text" value={contactMessenger} onChange={e => setContactMessenger(e.target.value)} placeholder="Messenger" />
                        <input type="text" value={contactWhatsapp} onChange={e => setContactWhatsapp(e.target.value)} placeholder="WhatsApp" />

                        <select name="" id="" defaultValue={language} onChange={e => setLanguage(e.target.value)}>
                            <option value="">Select language</option>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                        </select>

                        <button type="submit" disabled={updating}>
                            {updating ? 'Updating...' : 'Save'}
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    const session = await getSession({ req });
    if (session && session.user?.name !== null) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {}
        }
    }

    return {
        props: {},
    };
}

export default New

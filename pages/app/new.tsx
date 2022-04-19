import axios from 'axios';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

const New = (props: Props) => {
    const session = useSession();
    const [name, setName] = useState<string>('');
    const [contactMessenger, setContactMessenger] = useState<string>('');
    const [contactWhatsapp, setContactWhatsapp] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (session.status === 'authenticated') {
            setName(session?.data?.user?.name !== null ? session?.data?.user?.name : '');
            setContactMessenger(session?.data?.user?.contact_messager !== null ? session?.data?.user?.contact_messager : '');
            setContactWhatsapp(session?.data?.user?.contact_whatsapp !== null ? session?.data?.user?.contact_whatsapp : '');
            setLanguage(session?.data?.user?.language === null ? '' : session?.data?.user?.language);
            setLoaded(true)
        }
    }, [session]);

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
            if (Router.pathname === '/app') {
                return Router.push('/');
            }
            return Router.push('/');
        }).catch(err => {
            setUpdating(false);
            console.error(err.message);
        })
    }

    return (
        <div>
            New user
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
                            Save
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

export default New

function useNavigate() {
    throw new Error('Function not implemented.');
}

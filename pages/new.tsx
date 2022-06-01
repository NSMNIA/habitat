import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

type Props = {}

const New = (props: Props) => {
    const session: any = useSession();
    const [name, setName] = useState<string>('');
    const [contactMessenger, setContactMessenger] = useState<string>('');
    const [contactWhatsapp, setContactWhatsapp] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const [roleType, setRoleType] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const roleConsumer = useRef<any>(null);
    const rolePromoter = useRef<any>(null);
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
            language,
            role: role
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

    // TODO: add subscriptions and roles

    const changeRoleType = (type: string) => {
        setRoleType(type);
        setRole('');
        if (type === 'promoter') {
            roleConsumer.current.classList.remove('active');
            rolePromoter.current.classList.add('active');
        } else if (type === 'consumer') {
            rolePromoter.current.classList.remove('active');
            roleConsumer.current.classList.add('active');
        } else {
            rolePromoter.current.classList.remove('active');
            roleConsumer.current.classList.remove('active');
        }
    }

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
                            <option value="en-US">English</option>
                            <option value="es-ES">Spanish</option>
                        </select>

                        <select value={roleType} onChange={e => changeRoleType(e.target.value)}>
                            <option value="">Select role</option>
                            <option value="consumer">Consumer</option>
                            <option value="promoter">Promoter</option>
                        </select>

                        {/* Consumer */}
                        <select className='hb-select--hide' ref={roleConsumer} value={role} onChange={e => setRole(e.target.value)}>
                            <option value="8">Individual</option>
                            <option value="7">Company</option>
                        </select>

                        {/* Promoter */}
                        <select className='hb-select--hide' ref={rolePromoter} value={role} onChange={e => setRole(e.target.value)}>
                            <option value="6">Individual</option>
                            <option value="5">Constructor</option>
                            <option value="4">Agency</option>
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
    const session: any = await getSession({ req });
    if (session && session.user?.name !== null) {
        // if (session && session.user?.name !== null && session.user?.Roles !== null) {
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

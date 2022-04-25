import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next/types"
import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Navbar.module.scss'
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

type Props = {}

const Navbar: NextPage = (props: Props) => {
    const { t } = useTranslation();
    const session: any = useSession();
    const [email, setEmail] = useState<string>('');
    const modal = useRef<any>(null);
    const [language, setLanguage] = useState<string>('');

    const locales: any = [{
        code: 'en-US',
        name: 'English'
    }, {
        code: 'es-ES',
        name: 'Español'
    }]

    const loginViaEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (email === '') return;
        signIn('email', { callbackUrl: window.location.href, email });
    }

    const showModal = () => {
        modal.current.classList.add(styles.active);
    }

    const closeModal = () => {
        modal.current.classList.remove(styles.active);
    }

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    const changeLanguage = async (lang: string) => {
        if (session.status === 'authenticated') {
            await axios.post('/api/user/lang', {
                id: session?.data?.user?.id,
                language: lang
            }).then((res: any) => {
                i18next.changeLanguage(lang)
                reloadSession();
            }).catch(err => {
                console.error(err.message);
            })
        } else {
            i18next.changeLanguage(lang)
        }
    }

    useEffect(() => {
        if (session.status === 'authenticated') {
            i18next.changeLanguage(session?.data?.user?.language)
            setLanguage(session?.data?.user?.language);
        } else {
            setLanguage(i18next.language);
        }
    }, [session])

    return (
        <>
            <nav className={styles.navigation}>
                <div>
                    {session.status === 'authenticated' ? (<>
                        <a href="">{session?.data?.user?.name}</a>
                        <button onClick={() => signOut()}>
                            {t('Sign out')}
                        </button>
                    </>) : (<>
                        <button onClick={showModal} disabled={session.status === 'loading'}>
                            {t('Login')}
                        </button>
                    </>)}
                    {session.status !== 'loading' && language !== '' && locales && (
                        <select defaultValue={language} onChange={e => changeLanguage(e.target.value)}>
                            {
                                locales?.map((l: any, i: any) => {
                                    return (
                                        <option key={i} value={l.code}>
                                            {l.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    )}
                </div>
            </nav>
            {session.status !== 'authenticated' && (<>
                <div ref={modal} className={styles.modal}>
                    <div onClick={closeModal} className={styles.modal_overlay}></div>
                    <div className={styles.modal_inner}>
                        <form action='' onSubmit={loginViaEmail}>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            <button type="submit">Send login link</button>
                        </form>
                        <button onClick={() => signIn('google', { callbackUrl: window.location.href })}>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default Navbar
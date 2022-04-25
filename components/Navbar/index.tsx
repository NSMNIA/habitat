import { signIn, signOut, useSession } from "next-auth/react";
import { NextPage } from "next/types"
import { useRef, useState } from "react";
import styles from '../../styles/Navbar.module.scss'

type Props = {}

const Navbar: NextPage = (props: Props) => {
    const session = useSession();
    const [email, setEmail] = useState<string>('');
    const modal = useRef<any>(null);

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

    return (
        <>
            <nav className={styles.navigation}>
                <div>
                    {session.status === 'authenticated' ? (<>
                        <a href="">{session?.data?.user?.name}</a>
                        <button onClick={() => signOut()}>
                            Sign out
                        </button>
                    </>) : (<>
                        <button onClick={showModal}>Log in</button>
                    </>)}
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
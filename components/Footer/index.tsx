import { NextPage } from "next/types";
import styles from '../../styles/Footer.module.scss';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: NextPage = () => {

    return (
        <>
            <div className={styles['footer']}>
                <div className={styles['footer_top-row']}>
                    <div className={styles['footer_top-row--column']}>
                        <h3>Company</h3>
                        <a target="_blank" rel="noopener noreferrer" href='https://www.google.nl/maps/place/Conjunto+Habitat+Gu%C3%A1pulo/@-0.2024557,-78.4812383,17z/data=!3m1!4b1!4m5!3m4!1s0x91d59baf4905e96f:0x106f0e999251996!8m2!3d-0.2024611!4d-78.4790496'>Habitat 5049 CW, Quito, Ecuador</a>
                        <a href="mailto: contact@habitat.com">Contact@habitat.com</a>
                        <a href="tel: +593 4 123 4567">+593 4 123 4567</a>
                        <div className={styles['footer_top-row--column__icons']}>
                            <Instagram size={24} />
                            <Twitter size={24} />
                            <Linkedin size={24} />
                        </div>
                    </div>
                    <div className={styles['footer_top-row--column']}>
                        <h3>Features</h3>
                        <Link href={'/properties'} >Tours</Link>
                        <Link href={'/account/subscription-plan'} >Subscription Plan</Link>
                    </div>
                    <div className={styles['footer_top-row--column']}>
                        <h3>About</h3>
                        <Link href={'/about'} >Promoters</Link>
                        <Link href={'/about'} >Properties</Link>
                        <Link href={'/about'} >Payments</Link>
                    </div>
                </div>
                <div className={styles['footer_bottom-row']}>
                    <p>Copyright © 2021 Habitat B.V. All rights reserved</p>
                    <p>Created with ❤ by FKAKO</p>
                </div>
            </div>
        </>
    )
}

export default Footer
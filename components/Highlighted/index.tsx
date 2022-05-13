import { ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from "react"
import styles from '../../styles/Highlighted.module.scss'
import PropertyCard from '../../components/PropertyCard'
import { useTranslation } from 'react-i18next'

interface Props {
    properties: any
}

const Highlighted: FC<Props> = ({ properties }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles['highlighted']}>
                <div className={styles['highlighted--title']}>
                    <p className='title-top'>{t('Highlighted')}</p>
                    <div className="title">
                        <h2 className="title--left">{t('Also ')}<span>{t('interesting ')}</span>{t('to look at')}</h2>
                    </div>
                </div>
                <div className={styles['highlighted--properties']}>
                    <PropertyCard properties={properties?.slice(0, 3)} />
                </div>
            </div>
        </>
    )
}

export default Highlighted
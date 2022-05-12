import { NextPage } from "next/types";
import styles from '../../styles/PropertyCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'react-i18next'
import { FC } from "react";
import { MapPin } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface Props {
    properties: any
}

const PropertyCard: FC<Props> = ({ properties }) => {
    return (
        <>
            {properties?.map((property: any, i: number) => {
                return (
                    <div className={styles['property-card']} key={property.propertyId}>
                        <Link href={`/property/${property.propertyId}`} >
                            <div>
                                <div className={styles['property-card--image']}>
                                    <Image src={'/assets/images/house-' + i + '.jpg'} blurDataURL='/assets/images/house-1.jpg' alt="property-card" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                                </div>
                                <div className={styles['property-card--title']}>
                                    <ArrowRight className={styles['property-card--title-arrow']} size={15} ></ArrowRight>
                                    <a className={styles['property-card--title-text']}><MapPin className={styles['property-card--title-icon']} size={15} ></MapPin>{property.type + ' in ' + property.addressTitle}</a>
                                    <p className={styles['property-card--title-price']}>&#x24;{property.price}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default PropertyCard
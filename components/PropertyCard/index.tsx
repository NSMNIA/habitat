import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from "react";
import styles from '../../styles/PropertyCard.module.scss';

interface Props {
    properties: any
}

const PropertyCard: FC<Props> = ({ properties }) => {
    return (
        <>
            {properties?.map((property: any, i: number) => {
                return (
                    <div className={styles['property-card']} key={property.propertyId}>
                        <div className={styles['property-card--image']}>
                            {property?.PropertyFiles?.length > 0 ?
                                <Image src={`/assets/uploads/${property?.PropertyFiles?.[0]?.fileName}`} blurDataURL={`/assets/uploads/${property?.PropertyFiles?.[0]?.fileName}`} alt="property-card" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                                : <>
                                    <Image src={`/assets/images/placeholder.webp`} blurDataURL={`/assets/images/placeholder.webp`} alt="property-card" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                                </>
                            }
                        </div>
                        <Link passHref={true} href={`/property/${property.propertyId}`} >
                            <div className={styles['property-card--title']}>
                                <ArrowRight className={styles['property-card--title-arrow']} size={15} ></ArrowRight>
                                <a className={styles['property-card--title-text']}><MapPin className={styles['property-card--title-icon']} size={15} ></MapPin>{property?.type === 'new' ? 'New project' : `For ${property?.type}`} in {property.addressTitle}</a>
                                <p className={styles['property-card--title-price']}>&#x24;{property?.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default PropertyCard
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Footer from '../../components/Footer'
import Highlighted from '../../components/Highlighted'
import Navbar from '../../components/Navbar'
import PropertyFeatures from '../../components/PropertyFeatures'
import PropertyFloorPlan from '../../components/PropertyFloorPlan'
import PropertyMap from '../../components/PropertyMap'
import styles from '../../styles/property.module.scss'

type Props = {
    property: any,
    properties: any,
}


const Property = ({ property, properties }: Props) => {
    const images2d = property?.PropertyFiles?.filter((file: any) => file.fileType === '2d').length;
    let grid = { "--col": `1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
    const [show, setShow] = useState<boolean>(false);
    const features = useRef<HTMLDivElement>(null);
    const map = useRef<HTMLDivElement>(null);
    const floorPlan = useRef<HTMLDivElement>(null);


    if (images2d === 1) {
        grid = { "--col": `1fr`, "--row": 'auto' } as React.CSSProperties;
    } else if (images2d === 2) {
        grid = { "--col": `1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
    } else if (images2d === 3) {
        grid = { "--col": `1fr 1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
    } else if (images2d === 4) {
        grid = { "--col": `1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
    } else {
        grid = { "--col": `1fr 1fr 1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
    }

    return (
        <>
            <Navbar />
            <main className={styles['property']}>
                <section className={styles['property_teaser-section']}>
                    <Image src={`/assets/uploads/${property?.PropertyFiles?.[0]?.fileName}`} blurDataURL={`/assets/uploads/${property?.PropertyFiles?.[0]?.fileName}`} alt="teaser" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                </section>
                <section className={styles['property_preview-section']}>
                    <div className={styles['property_preview-section--title']}>
                        <h1>Property {property?.addressTitle}</h1>
                        <p>Property for {property?.type} &#x24;{property?.price.toLocaleString('en-EN', { minimumFractionDigits: 0 })} </p>
                    </div>
                    <div className='hb-images'>
                        {property?.PropertyFiles?.filter((file: any) => file.fileType === '360')?.map((file: any, i: number) => {
                            return (<div key={i} className={styles['image-360']}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                        })}
                    </div>
                    <div className={styles['hb-images--grid']} style={grid}>
                        {property?.PropertyFiles?.filter((file: any) => file.fileType === '2d')?.map((file: any, i: number) => {
                            return (<div key={i} className={i === 0 && (images2d === 3 || images2d >= 5) ? styles['first-image'] : ''}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                        })}
                    </div>
                </section>
                <section className={styles['property_information-section']}>
                    <div className={styles['property_information-section--tab']}>
                        <button onClick={() => setShow(!show)} className="tablink tablink-active">Features</button>
                        <button onClick={() => setShow(!show)} className="tablink">Map</button>
                        <button onClick={() => setShow(!show)} className="tablink">Floor Plan</button>
                    </div>
                    <div ref={features} className={`tab-content ${show ? "show" : ""}`}>
                        <PropertyFeatures property={property} />
                    </div>
                    <div ref={map} className={`tab-content ${show ? "show" : ""}`}>
                        <PropertyMap property={property} />
                    </div>
                    <div ref={floorPlan} className={`tab-content ${show ? "show" : ""}`}>
                        <PropertyFloorPlan property={property} />
                    </div>
                </section>
                <section className={styles['property_highlighted-section']}>
                    <Highlighted properties={properties?.slice(0, 3)} />
                </section>
            </main>
            <Footer />



            {/* <h1>
                Property {property?.addressTitle}
            </h1>
            <div className='hb-images'>
                {property?.PropertyFiles?.filter((file: any) => file.fileType === '360')?.map((file: any, i: number) => {
                    return (<div key={i} className={style['image-360']}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                })}

            </div>
            <div className={style['hb-images--grid']} style={grid}>
                {property?.PropertyFiles?.filter((file: any) => file.fileType === '2d')?.map((file: any, i: number) => {
                    return (<div key={i} className={i === 0 && (images2d === 3 || images2d >= 5) ? style['first-image'] : ''}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                })}
            </div>
            Show all pictures
            <p>
                {property?.type}
            </p>
            <ShowMap address={property?.address} />
            <p>
                {property?.city}
            </p> */}
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { property } = context.query;
    if (!property?.[0]) {
        return {
            redirect: {
                destination: '/properties',
                permanent: false,
            },
            props: {}
        }
    }

    const h = await axios.post(`${process.env.NEXTAUTH_URL}/api/home/`).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });

    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/find`, {
        id: property[0]
    }).then(found => {
        return found.data
    }).catch(err => {
        return {
            redirect: {
                destination: '/properties',
                permanent: false,
            },
            props: {},
        }
    });

    if (p.success === 1) {
        return {
            props: {
                property: p.data,
                properties: h?.properties || null,
            }
        }
    }

    return {
        notFound: true,
        props: {},
    }
}

export default Property
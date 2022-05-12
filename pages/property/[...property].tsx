import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import ShowMap from '../../components/Google/ShowMap';
import Navbar from '../../components/Navbar';
import STYLE from '../../styles/property.module.scss';

type Props = {
    property: any;
}


const Property = ({ property }: Props) => {
    const images2d = property?.PropertyFiles?.filter((file: any) => file.fileType === '2d').length;
    let grid = { "--col": `1fr 1fr`, "--row": 'auto' } as React.CSSProperties;
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
            <h1>
                Property {property?.addressTitle}
            </h1>
            <div className='hb-images'>
                {property?.PropertyFiles?.filter((file: any) => file.fileType === '360')?.map((file: any, i: number) => {
                    return (<div key={i} className={STYLE['image-360']}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                })}

            </div>
            <div className={STYLE['hb-images--grid']} style={grid}>
                {property?.PropertyFiles?.filter((file: any) => file.fileType === '2d')?.map((file: any, i: number) => {
                    return (<div key={i} className={i === 0 && (images2d === 3 || images2d >= 5) ? STYLE['first-image'] : ''}><Image placeholder={'blur'} blurDataURL={`/assets/uploads/${file.fileName}`} src={`/assets/uploads/${file.fileName}`} alt={file.fileTitle} layout="fill" /></div>)
                })}
            </div>
            Show all pictures
            <p>
                {property?.type}
            </p>
            <ShowMap address={property?.address} />
            <p>
                {property?.city}
            </p>
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
                property: p.data
            }
        }
    }

    return {
        notFound: true,
        props: {},
    }
}

export default Property
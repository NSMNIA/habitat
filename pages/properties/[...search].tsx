import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

type Props = {
    search: any;
}

const Search = ({ search }: Props) => {
    return (
        <div>
            {search?.map((property: any) => {
                return (
                    <div key={property.propertyId}>
                        <Link href={`/property/${property.propertyId}`} >
                            {property.addressTitle}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { search } = context.query;

    const s = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/search`, {
        search
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

    if (s.success === 1 && s.data.length > 0) {
        return {
            props: {
                search: s.data
            }
        }
    }

    return {
        notFound: true,
        props: {},
    }
}

export default Search
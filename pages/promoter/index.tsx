import Link from 'next/link'
import Navbar from '../../components/Navbar'

type Props = {}

const PromoterIndex = (props: Props) => {
    return (
        <>
            <Navbar />
            <h1>Promoter</h1>
            <Link href={'/promoter/properties/add'}>Add property</Link>
        </>
    )
}

export default PromoterIndex
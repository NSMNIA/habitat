import Link from 'next/link'

type Props = {}

const PromoterIndex = (props: Props) => {
    return (
        <>
            <h1>Promoter</h1>
            <Link href={'/promoter/properties/add'}>Add property</Link>
        </>
    )
}

export default PromoterIndex
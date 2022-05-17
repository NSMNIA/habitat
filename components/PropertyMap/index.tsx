import Image from 'next/image'
import Link from 'next/link'
import { FC } from "react"
import styles from '../../styles/PropertyMap.module.scss'

interface Props {
    property: any
}

const PropertyMap: FC<Props> = ({ property }) => {

    return (
        <>
            Map
        </>
    )
}

export default PropertyMap
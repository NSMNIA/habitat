import Image from 'next/image'
import Link from 'next/link'
import { FC } from "react"
import styles from '../../styles/PropertyFeatures.module.scss'

interface Props {
    property: any
}

const PropertyFeatures: FC<Props> = ({ property }) => {

    return (
        <>
            Features
        </>
    )
}

export default PropertyFeatures
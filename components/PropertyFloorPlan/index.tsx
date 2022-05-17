import Image from 'next/image'
import Link from 'next/link'
import { FC } from "react"
import styles from '../../styles/PropertyFloorPlan.module.scss'

interface Props {
    property: any
}

const PropertyFloorPlan: FC<Props> = ({ property }) => {

    return (
        <>
            Floor Plan
        </>
    )
}

export default PropertyFloorPlan
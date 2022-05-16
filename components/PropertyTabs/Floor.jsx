import Image from "next/image";

const Floor = () => {
	return (
		<div style={{
			position: "relative",
			width: "100%",
			aspectRatio: 1/1
		}}>
			<Image
				src="/img/floor-plan.jpg"
				alt="property-card"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	)
}

export default Floor
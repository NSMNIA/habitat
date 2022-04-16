import { useEffect } from "react";
import { useSpaceViewer } from "../../context/SpaceViewerContext";
import { usePano } from "../../context/PanoContext";
import styles from "./SpaceViewerAside.module.scss";

const SpaceViewerAside = ({children}) => {
  const spaceViewer = useSpaceViewer();
  // const pano = usePano();
	// console.log(pano);
	
	return (
		<div className={styles.root}>
			{/* <p>{JSON.stringify(spaceViewer)}</p> */}
			<ul>
				{spaceViewer && spaceViewer.map((space, i) => (
					<li key={i}>
						<span>{space.name}</span>
					</li>
				))}
			</ul>
			<div>{children}</div>
		</div>
	)
}

export default SpaceViewerAside
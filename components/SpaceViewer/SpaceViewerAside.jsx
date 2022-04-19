import styles from "./SpaceViewerAside.module.scss";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import { usePano, useUpdatePano } from "../../context/PanoContext";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import Image from "next/image";

const SpaceViewerAside = ({children}) => {
  const spaceViewer = useSpaceViewer();
	const updateSpaceViewer = useUpdateSpaceViewer();
  
	const pano = usePano();
	const updatePano = useUpdatePano();

	const handleClick = (id) => {
		const newList = spaceViewer.filter(x => x.id != id)
		const m = pano.viewer.getPlugin(MarkersPlugin);
		m.removeMarker(m.markers["#" + id])
		updateSpaceViewer(newList)
	}
	
	return (
		<div className={styles.root}>
			<ul>
				{spaceViewer && spaceViewer.map((space, i) => (
					<li key={i} onClick={() => handleClick(space.id)}>
						<Image
							src={space.image}
							blur="true"
							blurDataURL={`${space.image}&blur=200`}
							width={"200px"}
							height={"100px"}
							alt={space.name}
						/>
						<span>id: {space.id}</span> | <span>name: {space.name}</span>
					</li>
				))}
			</ul>
			<div>{children}</div>
		</div>
	)
}

export default SpaceViewerAside
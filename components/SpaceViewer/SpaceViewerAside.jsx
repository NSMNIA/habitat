import styles from "./SpaceViewerAside.module.scss";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import { usePano, useUpdatePano } from "../../context/PanoContext";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";

const SpaceViewerAside = ({children}) => {
  const spaceViewer = useSpaceViewer();
	const updateSpaceViewer = useUpdateSpaceViewer();
  
	const pano = usePano();
	const updatePano = useUpdatePano();

	const handleClick = (id) => {
		const newList = spaceViewer.filter(x => x.id != id)
		const markers = pano.m.markers
		// const newObj = delete markers[id]
		// const selected = markers.filter(x => x.id != id)
		// updatePano(selected)
		
		// const selected = markers["#" + id]
		// markers.removeMarker(selected)
		// console.log(markers);

		const m = pano.viewer.getPlugin(MarkersPlugin);
		m.removeMarker(m.markers["#" + id])
		// console.log(m);
		
		updateSpaceViewer(newList)
	}
	
	return (
		<div className={styles.root}>
			<ul>
				{spaceViewer && spaceViewer.map((space, i) => (
					<li key={i} onClick={() => handleClick(space.id)}>
						<span>id: {space.id}</span> | <span>name: {space.name}</span>
					</li>
				))}
			</ul>
			<div>{children}</div>
		</div>
	)
}

export default SpaceViewerAside
import styles from "./SpaceViewerAside.module.scss";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";

const SpaceViewerAside = ({children}) => {
  const spaceViewer = useSpaceViewer();
	const updateSpaceViewer = useUpdateSpaceViewer();

	const handleClick = (id) => {
		const newList = spaceViewer.filter(x => x.id != id)
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
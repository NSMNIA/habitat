import { useState } from "react";
import { useSpaceViewer, useUpdateSpaceViewer } from "../context/SpaceVIewerContext";
import styles from "./SpaceViewerAside.module.scss";

const SpaceViewerAside = ({children}) => {
	// const [title, setTitle] = useState("")
  const spaceViewer = useSpaceViewer();
	
	return (
		<div className={styles.root}>
			<div>{JSON.stringify(spaceViewer)}</div>
			<div>{children}</div>
		</div>
	)
}

export default SpaceViewerAside
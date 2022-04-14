import { useState } from "react";
import { useSpaceViewer, useUpdateSpaceViewer } from "../context/SpaceVIewerContext";
import styles from "./SpaceViewerModal.module.scss"

const Modal = ({ viewer, handleClose, children }) => {
	// let markers = viewer.plugins.markers.markers
	// let markersList = markers?.map(x => x.config.tooltip.content)
	// console.log(markers);
	const [title, setTitle] = useState("")

	const updateSpaceViewer = useUpdateSpaceViewer();
  const spaceViewer = useSpaceViewer();

	const [newSpace, setNewSpace] = useState(spaceViewer);

	const onUpdateSpaceViewer = () => {
    updateSpaceViewer(newSpace)
		handleClose()
	}
	
	const handleChange = (e) => {
    setTitle(e.target.value)
		setNewSpace({...newSpace, name: e.target.value})
  };

  return (
		<div className={styles.root}>
			<div className={styles.bg} onClick={handleClose}></div>
			<div className={styles.box}>
				<div className={styles.header}>
					<h2>Title</h2>
				</div>
				<div className={styles.body}>
					<h3>{children}</h3>
					<input
						type="text"
						value={title}
						onChange={handleChange}
					/>
					<p>{JSON.stringify(newSpace)}</p>
				</div>
				<div className={styles.footer}>
					<button onClick={handleClose}>Close</button>
					<button onClick={onUpdateSpaceViewer}>Add</button>
				</div>
			</div>
		</div>
  );
};

export default Modal;
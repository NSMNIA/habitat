import { useEffect, useState, useRef } from "react";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import styles from "./SpaceViewerModal.module.scss"

const Modal = ({ markersData, markers, title, onTitleChange, onClose, children, coordinates }) => {
	// console.log(viewer.plugins)
	// console.log(markers)
	// console.log(markersData)
	
	const [image, setImage] = useState(null)

	const uploadInput = useRef(null);

	const updateSpaceViewer = useUpdateSpaceViewer();
  const spaceViewer = useSpaceViewer();

	const onUpdateSpaceViewer = () => {
		const space = [...spaceViewer, {
			name: title,
			image: image,
			coordinates: coordinates
		}]
    updateSpaceViewer(space)
		onTitleChange("")

		if (!markersData.rightclick) {
			const markerOptions = {
				id: '#' + spaceViewer.length,
				longitude: markersData.longitude,
				latitude: markersData.latitude,
				image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
				width: 32,
				height: 32,
				anchor: 'bottom center',
				tooltip: title,
				data: {
					generated: true,
					deletable: true
				}
			}
			markers.addMarker(markerOptions);
		}

		// console.log(spaceViewer.length);
		onClose()
	}
	
	const handleChange = (e) => {
    onTitleChange(e.target.value)
  };

	useEffect(() => {
		const upload = uploadInput.current
		upload.onchange = () => {
			const reader = new FileReader();
			reader.readAsDataURL(upload.files[0]);
			reader.onload = () => setImage(reader.result);
			reader.onerror = error => console.log(error);
		};
	}, [])

  return (
		<div className={styles.root}>
			<div className={styles.bg} onClick={onClose}></div>
			<div className={styles.box}>
				<div className={styles.header}>
					<h2>Add a title</h2>
				</div>
				<div className={styles.body}>
					<h3>{children}</h3>
					<input ref={uploadInput} type="file" accept="image/jpg" name="myFiles" />
					<input
						type="text"
						value={title}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.footer}>
					<button onClick={onClose}>Close</button>
					<button onClick={onUpdateSpaceViewer}>Add</button>
				</div>
			</div>
		</div>
  );
};

export default Modal;
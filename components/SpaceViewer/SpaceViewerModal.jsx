import { useEffect, useState, useRef } from "react";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import styles from "./SpaceViewerModal.module.scss"

const Modal = ({ handleClose, children, coordinates }) => {
	const [title, setTitle] = useState("")
	const [image, setImage] = useState(null)

	const uploadInput = useRef(null);

	const updateSpaceViewer = useUpdateSpaceViewer();
  const spaceViewer = useSpaceViewer();

	const onUpdateSpaceViewer = () => {
		const n = [...spaceViewer, {
			name: title,
			image: image,
			coordinates: coordinates
		}]
    updateSpaceViewer(n)
		handleClose()
	}
	
	const handleChange = (e) => {
    setTitle(e.target.value)
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
			<div className={styles.bg} onClick={handleClose}></div>
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
					{/* <ul>
						{ newSpace.map((space) => {
							<li key={space.age}>{space.name}</li>
						})}
					</ul> */}
					{/* <p>{JSON.stringify(coordinates)}</p> */}
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
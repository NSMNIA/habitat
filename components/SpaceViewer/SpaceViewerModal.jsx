import { useRef, useState } from "react";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import styles from "./SpaceViewerModal.module.scss";

import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import { usePano } from "../../context/PanoContext";

const Modal = ({ title, coordinates, onTitleChange, onClose, children }) => {
    const updateSpaceViewer = useUpdateSpaceViewer();
    const spaceViewer = useSpaceViewer();
    const [image, setImage] = useState(null)
    const uploadInput = useRef(null);

    const pano = usePano();
    const markers = pano.viewer.getPlugin(MarkersPlugin);

    const onUpdateSpaceViewer = () => {
        const space = [...spaceViewer, {
            id: spaceViewer.length,
            name: title,
            image: image,
            coordinates: coordinates
        }]
        updateSpaceViewer(space)

        const markerOptions = {
            id: `${spaceViewer.length}`,
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
            image: '../img/pin-red.png',
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
        onTitleChange("")
        onClose()
    }

    const handleChange = (e) => onTitleChange(e.target.value)

    const handleUpload = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setImage(reader.result);
        reader.onerror = error => console.log(error);
    };

    return (
        <div className={styles.root}>
            <div className={styles.bg} onClick={onClose}></div>
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2>Add a title</h2>
                </div>
                <div className={styles.body}>
                    <h3>{children}</h3>
                    <input ref={uploadInput} onChange={handleUpload} type="file" accept="image/jpg" />
                    <input type="text" value={title} onChange={handleChange} />
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
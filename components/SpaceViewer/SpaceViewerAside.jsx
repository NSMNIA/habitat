import Image from "next/image";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import { usePano } from "../../context/PanoContext";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import styles from "./SpaceViewerAside.module.scss";

const SpaceViewerAside = ({ children }) => {
    const spaceViewer = useSpaceViewer();
    const updateSpaceViewer = useUpdateSpaceViewer();

    const pano = usePano();

    const handleClick = (id) => {
        const newList = spaceViewer.filter(x => x.id != id)
        const m = pano.viewer.getPlugin(MarkersPlugin);
        m.removeMarker(m.markers[id])
        updateSpaceViewer(newList)
    }

    return (
        <div className={styles.root}>
            <ul>
                {spaceViewer && spaceViewer.map((space, i) => (
                    <li key={i} onClick={() => handleClick(space.id)}>
                        {space.image &&
                            <Image
                                src={space.image}
                                blur="true"
                                blurDataURL={`${space.image}&blur=200`}
                                width={"200px"}
                                height={"100px"}
                                alt={space.name}
                            />
                        }
                        <div>
                            {space.id && <span>id: {space.id}</span>} |
                            {space.name && <span>name: {space.name}</span>}
                        </div>
                    </li>
                ))}
            </ul>
            <div>{children}</div>
        </div>
    )
}

export default SpaceViewerAside
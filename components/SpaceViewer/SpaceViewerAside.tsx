import Image from "next/image";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import { usePano } from "../../context/PanoContext";
import { useSpaceViewer, useUpdateSpaceViewer } from "../../context/SpaceViewerContext";
import styles from "./SpaceViewerAside.module.scss";

const SpaceViewerAside = ({ children }: any) => {
    const spaceViewer = useSpaceViewer() as any;
    const updateSpaceViewer = useUpdateSpaceViewer() as any;

    const pano = usePano();

    const handleClick = (id: any) => {
        const newList = spaceViewer.filter((x: any) => x.id != id)
        const m = pano.viewer.getPlugin(MarkersPlugin);
        m.removeMarker(m.markers[id])
        updateSpaceViewer(newList)
    }

    return (
        <div className={styles.root}>
            <ul>
                {spaceViewer && spaceViewer.map((space: any, i: number) => (
                    <li key={i} onClick={() => handleClick(space.id)}>
                        {space.image &&
                            <Image
                                src={space.image}
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
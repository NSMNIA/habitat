import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import SpaceViewerModal from "./SpaceViewer/SpaceViewerModal";
import { usePano, useUpdatePano } from "../context/PanoContext";

function PanoView() {
	const [view, setView] = useState(null);
	const [markers, setMarkers] = useState(null);
	const [markerData, setMarkerData] = useState(null);
	const [markersData, setMarkersData] = useState(null);
	
	const [title, setTitle] = useState("");
	const [coordinates, setCoordinates] = useState(false);
	
	const [modalOpen, setModalOpen] = useState(false);
	const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

	const updatePano = useUpdatePano();

	const viewerContainer = useRef(null);
	
	useEffect(() => {

		const options = {
			panorama: "../img/pano-1.jpg",
			container: viewerContainer.current,
			caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
			defaultLat: 0.3,
			touchmoveTwoFingers: true,
			navbar: false,
			plugins: [MarkersPlugin],
			mousewheel: false
		};

		window.onload = () => {
			const handleClick = (data) => {
				setCoordinates({longitude: data.longitude, latitude: data.latitude})
				openModal()
				// setMarkersData(data)
			}

			const viewer = new Viewer(options);
			const m = viewer.getPlugin(MarkersPlugin);
			setView(viewer)
			setMarkers(m)
			
			viewer.on('click', (e, data) => handleClick(data))
			updatePano({viewer, m})
		}
		
  }, [title, markers,updatePano]);

	return (
		<>
			{modalOpen &&
				<SpaceViewerModal
					title={title}
					onTitleChange={setTitle}
					coordinates={coordinates}
					modalOpen={modalOpen}
					onClose={closeModal}
					viewer={view}
					// markers={markers}
					// markerData={markerData}
					// markersData={markersData}
				>
				</SpaceViewerModal>
			}
			<div
				style={{ width: "100%", height: "100vh" }}
				ref={viewerContainer}
			></div>
		</>
	)
}

export default PanoView
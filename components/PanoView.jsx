import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import SpaceViewerModal from "./SpaceViewer/SpaceViewerModal";
import { useSpaceViewer } from "../context/SpaceViewerContext";

function PanoView() {
	const [view, setView] = useState(null);
	const [markers, setMarkers] = useState(null);
	const [markersData, setMarkersData] = useState(null);
	
	const [title, setTitle] = useState("");
	const [coordinates, setCoordinates] = useState(false);
	
	const [modalOpen, setModalOpen] = useState(false);
	const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

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

			const handleSelect = (e, marker, data) => {
				console.log('select', marker.id);
				if (marker.data && marker.data.deletable) {
					if (data.dblclick) {
						markers.removeMarker(marker);
					}
					else if (data.rightclick) {
						markers.updateMarker({
							id   : marker.id,
							image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
						});
					}
				}
			}

			const handleClick = (data) => {
				setCoordinates({longitude: data.longitude, latitude: data.latitude})
				openModal()
				setMarkersData(data)
				// if (!data.rightclick) {
				// 	const markerOptions = {
				// 		id: '#' + Math.random(),
				// 		longitude: data.longitude,
				// 		latitude: data.latitude,
				// 		image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
				// 		width: 32,
				// 		height: 32,
				// 		anchor: 'bottom center',
				// 		tooltip: title,
				// 		data: {
				// 			generated: true,
				// 			deletable: true
				// 		}
				// 	}
				// 	markers.addMarker(markerOptions);
				// }
			}

			const viewer = new Viewer(options);
			// const markers = viewer.getPlugin(MarkersPlugin);
			setView(viewer)
			setMarkers(viewer.getPlugin(MarkersPlugin))
			viewer.on('click', (e, data) => handleClick(data))
			// markers.on('select-marker', (e, marker, data) => handleSelect(e, marker, data))
		}
		
  }, [title, markers]);

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
					markers={markers}
					markersData={markersData}
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
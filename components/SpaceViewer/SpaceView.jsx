import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import navbar from "./navbar";
import SpaceViewerModal from "./SpaceViewerModal";

function SpaceView() {
	const [modalOpen, setModalOpen] = useState(false);
	const [coordinates, setCoordinates] = useState(false);
	const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

	const viewerContainer = useRef(null);
  
	useEffect(() => {
		
		const handleClick = (data) => {
			if (!data.rightclick) {

				setCoordinates({
					longitude: data.longitude,
					latitude: data.latitude,
				})

				openModal()
				// let tooltip = prompt("Add a title");
				// if (tooltip) {
				// 	markers.addMarker({
				// 		id: '#' + Math.random(),
				// 		longitude: data.longitude,
				// 		latitude: data.latitude,
				// 		image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
				// 		width: 32,
				// 		height: 32,
				// 		anchor: 'bottom center',
				// 		tooltip: {
				// 			content : tooltip,
				// 			position: 'top center'
				// 		},
				// 		data: {
				// 			generated: true,
				// 			deletable: true
				// 		}
				// 	});
				// }
			}
		}

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
		
		const viewer = new Viewer(options);
		const markers = viewer.getPlugin(MarkersPlugin);

		viewer.on('click', (e, data) => handleClick(data))
		markers.on('select-marker', (e, marker, data) => handleSelect(e, marker, data))
		
  }, []);

	return (
		<>
			{modalOpen &&
				<SpaceViewerModal
					coordinates={coordinates}
					modalOpen={modalOpen}
					handleClose={closeModal}
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

export default SpaceView
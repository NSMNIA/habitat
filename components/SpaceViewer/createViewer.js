import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import navbar from "./navbar";

const createViewer = (container) => {
	
	const options = {
		panorama: "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
		container: container,
		caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
		// loadingImg: "https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif",
		defaultLat: 0.3,
		touchmoveTwoFingers: true,
		navbar: navbar,
		plugins: [MarkersPlugin],
		mousewheel: false
	};
	
	const viewer = new Viewer(options);
	const markers = viewer.getPlugin(MarkersPlugin);

	viewer.on('click', (e, data) => {
		if (!data.rightclick) {
			let tooltip = prompt("Add a title");
			if (tooltip) {
				markers.addMarker({
					id: '#' + Math.random(),
					longitude: data.longitude,
					latitude: data.latitude,
					image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
					width: 32,
					height: 32,
					anchor: 'bottom center',
					tooltip: tooltip,
					data: {
						generated: true,
						deletable: true
					}
				});
			}
		}
	});

	markers.on('select-marker', (e, marker, data) => {
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
	});

	return viewer
}

export default createViewer
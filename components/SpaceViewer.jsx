import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import React, { useEffect, useRef, useState } from "react";


function SpaceViewer() {
	const navbar = [
		{
			id: "my-button",
			content: `<input type="file" accept="image/*" name="myFiles" />`,
			title: "Hello world",
			className: "custom-button",
			// onClick: () => {},
		},
		"autorotate",
		"zoom",
		// 'move',
		// 'download',
		"markers",
		"markersList",
		"description",
		"caption",
		"fullscreen",
	];
  const sphereElementRef = useRef(null);
  const [isLoaded, setLoaded] = useState(false);

	const container = sphereElementRef.current;
  
	const initMarkers = [
    {
      id: "circle",
      circle: 20,
      longitude: 0,
      latitude: 0,
      tooltip: "A circle marker",
    },
  ];

	const options = {
		panorama: "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
		container: container,
		caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
		loadingImg: "https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif",
		defaultLat: 0.3,
		touchmoveTwoFingers: true,
		navbar: navbar,
		plugins: [[MarkersPlugin, { markers: initMarkers }]],
	};

	const createViewer = () => {
		const shperePlayerInstance = new Viewer(options);
		const markers = shperePlayerInstance.getPlugin(MarkersPlugin);
		markers.on("select-marker", (e, marker, data) => {
			console.log("select", marker.id);

			if (marker.data && marker.data.deletable) {
				if (data.dblclick) {
					markers.removeMarker(marker);
				} else if (data.rightclick) {
					markers.updateMarker({
						id: marker.id,
						image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
					});
				}
			}
		});

		return () => {
			shperePlayerInstance.destroy();
		};
	}
	
  useEffect(() => {
		window.onload = () => { setLoaded(true) }
		isLoaded && createViewer()
  }, [isLoaded]);

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={sphereElementRef}
      ></div>
    </>
  );
}

export default SpaceViewer;

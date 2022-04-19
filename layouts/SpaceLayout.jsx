import Head from "next/head";
import styles from "./SpaceLayout.module.scss";
import { SpaceViewerProvider } from "../context/SpaceViewerContext";
import { PanoProvider } from "../context/PanoContext";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import { useEffect, useState } from "react";

const SpaceLayout = ({ children }) => {

	const [pano, setPano] = useState()
	// const [markers, setMarkers] = useState()

	// useEffect(() => {
	// 	const options = {
	// 		panorama: "../img/pano-1.jpg",
	// 		container: "container",
	// 		caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
	// 		defaultLat: 0.3,
	// 		touchmoveTwoFingers: true,
	// 		navbar: false,
	// 		plugins: [MarkersPlugin],
	// 		mousewheel: false
	// 	};
	// 	window.onload = () => {
	// 		const viewer = new Viewer(options)
	// 		setViewer(viewer)
	// 	}
	// }, [])
	
	
	// const markers = viewer.getPlugin(MarkersPlugin);
	return (
    <SpaceViewerProvider value={[]}>
			<PanoProvider value={pano}>
				<Head>
					<title>Space Entry</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<main id="main">
					<div id="container"></div>
					{children}
				</main>
			</PanoProvider>
		</SpaceViewerProvider>
  );
};

export default SpaceLayout;

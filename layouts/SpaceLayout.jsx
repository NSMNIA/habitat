import Head from "next/head";
import styles from "./SpaceLayout.module.scss";
import { SpaceViewerProvider } from "../context/SpaceViewerContext";
import { PanoProvider } from "../context/PanoContext";
import { useState } from "react";

const SpaceLayout = ({ children }) => {
	const [pano, setPano] = useState()

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

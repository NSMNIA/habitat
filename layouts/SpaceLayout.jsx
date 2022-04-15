import Head from "next/head";
import styles from "./SpaceLayout.module.scss";
import { SpaceViewerProvider } from "../context/SpaceViewerContext";

const SpaceLayout = ({ children }) => {
	return (
    <SpaceViewerProvider value={[]}>
      <Head>
        <title>Space Entry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main id="main">
        {children}
      </main>
		</SpaceViewerProvider>
  );
};

export default SpaceLayout;

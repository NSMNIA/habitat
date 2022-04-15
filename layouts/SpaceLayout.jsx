import Head from "next/head";
import styles from "./SpaceLayout.module.scss";
import { SpaceViewerProvider } from "../components/context/SpaceViewerContext";

const SpaceLayout = ({ children }) => {
	const markers = [
		// { name: "JC", age: 26 },
		// { name: "Paula",  }
	]

  return (
    <SpaceViewerProvider value={markers}>
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

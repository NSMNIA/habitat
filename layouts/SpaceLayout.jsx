import Link from "next/link";
import Head from "next/head";
import styles from "./SpaceLayout.module.scss";
import { SpaceViewerProvider } from "../components/context/SpaceVIewerContext";

const SpaceLayout = ({ children }) => {
  return (
    <SpaceViewerProvider value={{
			name: "JC",
			age: 26
		}}>
      <Head>
        <title>Space Entry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main id="main">
        {/* <nav className={styles.root}>
          <ul>
            <li><Link href="/" passHref><a>Home</a></Link></li>
            <li><Link href="/about" passHref><a>About Us</a></Link></li>
            <li><Link href="/blog" passHref><a>Blog Post</a></Link></li>
          </ul>
        </nav> */}
        {children}
      </main>
		</SpaceViewerProvider>
  );
};

export default SpaceLayout;

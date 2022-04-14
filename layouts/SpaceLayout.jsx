import Head from "next/head";

const SpaceLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Space Entry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <main id="main"> */}
				{children}
			{/* </main> */}
    </>
  );
};

export default SpaceLayout;

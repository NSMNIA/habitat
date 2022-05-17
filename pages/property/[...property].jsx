import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "photo-sphere-viewer";
import Image from "next/image";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Highlighted from "../../components/Highlighted";
import PropertyTabs from "../../components/PropertyTabs";
import ContactCard from "../../components/ContactCard";

import styles from "./pano/pano.module.scss";

const Property = ({ property, properties }) => {
	const title = property?.addressTitle
	const type = property?.type
	const price = property?.price.toLocaleString("en-EN", {minimumFractionDigits: 0})
	
	const panoImagesList = property?.PropertyFiles?.filter((file) => file.fileType === "360");
  const normalImagesList = property?.PropertyFiles?.filter((file) => file.fileType === "2d");
	const panoImagesListFiltered = panoImagesList.map(image => ({ name: image.fileTitle, image: `/assets/uploads/${image.fileName}` }))
	const normalImagesListFiltered = normalImagesList.map(image => ({ name: image.fileTitle, image: `/assets/uploads/${image.fileName}` }))
	
	const [selectedImg, setSelectedImg] = useState(0)
	const [panoImage, setPanoImage] = useState(panoImagesListFiltered[0].image)

	const viewerContainer = useRef(null);
	const [panoViewer, setPanoViewer] = useState(null)

	console.log(property);

  useEffect(() => {
    const options = {
      panorama: panoImage,
      container: viewerContainer.current,
      defaultLat: 0.3,
      touchmoveTwoFingers: true,
      navbar: false,
      mousewheel: false,
    };

    window.onload = () => {
			setPanoViewer(new Viewer(options))
    };
  }, [panoImage]);

	const handlePanoListClick = (index) => {
		panoViewer.setPanorama(panoImagesListFiltered[index].image)
		setSelectedImg(index)
	}

  return (
    <>
      <Navbar />
			<div className={styles.root}>
				<div ref={viewerContainer} className={styles.viewer}>
					<ul>
						{panoImagesListFiltered.map((i, index) =>
							<li
								key={index}
								className={ index == selectedImg ? 'active' : null }
								onClick={() => handlePanoListClick(index)}>
								{panoImagesListFiltered[index].name}
							</li>
						)}
					</ul>
				</div>
				
				<div className={styles.row}>
          <div className={styles.header}>
            <h1>{title}</h1>
            <span>Property for {type} &#x24;{price}</span>
          </div>
        </div>

				<div className={styles.row}>
          <div className={styles.grid_images}>
            {normalImagesListFiltered.map((i, index) => {
              return (
                <div key={index} className={styles.grid_image}>
                  <Image
                    src={i.image}
                    alt="property-card"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

				<div className={styles.row}>
          <div className={styles.col_2}>
            <div className={styles.tabs}>
              <PropertyTabs />
            </div>
          </div>

          <div className={styles.col_1}>
            <ContactCard />
          </div>
        </div>

			</div>
      
			{/* <Highlighted properties={properties?.slice(0, 3)} /> */}
      <Footer />
		</>
  );
};

export async function getServerSideProps(context) {
  const { property } = context.query;
  if (!property?.[0]) {
    return {
      redirect: {
        destination: "/properties",
        permanent: false,
      },
      props: {},
    };
  }

  const h = await axios
    .post(`${process.env.NEXTAUTH_URL}/api/home/`)
    .then((found) => {
      return found.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const p = await axios
    .post(`${process.env.NEXTAUTH_URL}/api/properties/find`, {
      id: property[0],
    })
    .then((found) => {
      return found.data;
    })
    .catch((err) => {
      return {
        redirect: {
          destination: "/properties",
          permanent: false,
        },
        props: {},
      };
    });

  if (p.success === 1) {
    return {
      props: {
        property: p.data,
        properties: h?.properties || null,
      },
    };
  }

  return {
    notFound: true,
    props: {},
  };
}

export default Property;

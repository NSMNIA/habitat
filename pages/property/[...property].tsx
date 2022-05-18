import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Viewer } from "photo-sphere-viewer";
import { FC, useEffect, useRef, useState } from "react";
import ContactCard from "../../components/ContactCard";
import Footer from "../../components/Footer";
import Navbar from '../../components/Navbar';
import PropertyTabs from "../../components/PropertyTabs";
import styles from "./pano/pano.module.scss";

interface Props {
  property: any,
  properties: any,
}

interface ImageProps {
  fileName: string,
  fileOrder: number,
  fileTitle: string,
  fileType: string,
  proptertyFileId: string,
}

const Property: FC<Props> = ({ property, properties }) => {
  const { type, addressTitle, price } = property;
  const panoImagesList = property?.PropertyFiles?.filter((file: ImageProps) => file.fileType === "360");
  const normalImagesList = property?.PropertyFiles?.filter((file: ImageProps) => file.fileType === "2d");
  const panoImagesListFiltered = panoImagesList.map((image: ImageProps) => ({
    name: image.fileTitle,
    image: `/assets/uploads/${image.fileName}`,
  }));
  const normalImagesListFiltered = normalImagesList.map((image: ImageProps) => ({
    name: image.fileTitle,
    image: `/assets/uploads/${image.fileName}`,
  }));

  const [selectedImg, setSelectedImg] = useState(0);
  const [panoImage, setPanoImage] = useState(panoImagesListFiltered?.[0]?.image);

  const viewerContainer = useRef(null);
  const [panoViewer, setPanoViewer] = useState(null);

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
      setPanoViewer(new Viewer(options as any));
    };
  }, [panoImage]);

  const handlePanoListClick = (index) => {
    panoViewer?.setPanorama(panoImagesListFiltered[index]?.image);
    setSelectedImg(index);
  };

  return (
    <>
      <Navbar />
      <div className={styles.root}>
        <div ref={viewerContainer} className={styles.viewer}>
          <ul>
            {panoImagesListFiltered.map((i: any, index: number) => (
              <li
                key={index}
                className={index == selectedImg ? "active" : null}
                onClick={() => handlePanoListClick(index)}
              >
                {panoImagesListFiltered[index].name}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.row}>
          <div className={styles.header}>
            <h1>{addressTitle}</h1>
            <span>
              Property for {type} &#x24;{price.toLocaleString('en-EN', { minimumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.grid_images}>
            {normalImagesListFiltered.map((i: any, index: number) => {
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
              <PropertyTabs property={property} />
            </div>
          </div>

          <div className={styles.col_1}>
            <ContactCard user={property?.user} />
          </div>
        </div>
      </div>

      {/* <Highlighted properties={properties?.slice(0, 3)} /> */}
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

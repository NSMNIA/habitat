/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Viewer } from "photo-sphere-viewer";

import Navbar from "../../../components/Navbar";
import PropertyTabs from "../../../components/PropertyTabs";
import styles from "./pano.module.scss";
import ContactCard from "../../../components/ContactCard";

const panoImages = [
	{
		name: "Living room",
		image: "../img/pano/suite-1.jpg"
	},
	{
		name: "Hallway",
		image: "../img/pano/suite-2.jpg"
	},
	{
		name: "Kitchen",
		image: "../img/pano/suite-3.jpg"
	}
]

const Pano = () => {
  const viewerContainer = useRef(null);
	const [v, setV] = useState(null)
	const [selectedImg, setSelectedImg] = useState(0)
	const [panoImage, setPanoImage] = useState(panoImages[0].image)

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
			setV(new Viewer(options))
    };
  }, [panoImage]);

  return (
    <div>
      <Navbar />
      <div className={styles.root}>
        <div ref={viewerContainer} className={styles.viewer}>
					<ul>
						{panoImages.map((i, index) =>
							<li
								key={index}
								className={ index == selectedImg ? 'active' : null }
								onClick={() => {
									v.setPanorama(panoImages[index].image)
									setSelectedImg(index)
								}}>
									{panoImages[index].name}
							</li>
						)}
					</ul>
				</div>

        <div className={styles.row}>
          <div className={styles.header}>
            <h1>Ocean-Front Haven, Crucita, Manabí Province</h1>
            <span>For Sale $430,000</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.grid_images}>
            {[0, 1, 2, 3, 4].map((i, index) => {
              return (
                <div key={index} className={styles.grid_image}>
                  <Image
                    src={`/img/suite-imgs/${i}.jpg`}
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

        {/* <section className={styles['home_highlighted-section']}></section> */}
      </div>
    </div>
  );
};

export default Pano;

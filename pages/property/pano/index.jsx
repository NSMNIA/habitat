/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";

import Navbar from "../../../components/Navbar";
import PropertyTabs from "../../../components/PropertyTabs";
import styles from "./pano.module.scss";

const pano = () => {
  const viewerContainer = useRef(null);

  useEffect(() => {
    const options = {
      panorama: "../img/suite-large.jpg",
      container: viewerContainer.current,
      caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
      defaultLat: 0.3,
      touchmoveTwoFingers: true,
      navbar: false,
      plugins: [MarkersPlugin],
      mousewheel: false,
    };

    window.onload = () => {
      const viewer = new Viewer(options);
      const m = viewer.getPlugin(MarkersPlugin);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.root}>
        <div ref={viewerContainer} className={styles.viewer}></div>

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
            <div className={styles.card_contact}>card contact</div>
          </div>
        </div>

        {/* <section className={styles['home_highlighted-section']}></section> */}
      </div>
    </div>
  );
};

export default pano;

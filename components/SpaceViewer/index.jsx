import React, { useEffect, useRef, useState } from "react";
import createViewer from "./createViewer";
import SpaceViewerModal from "./SpaceViewerModal";
import SpaceViewerAside from "./SpaceViewerAside";

function SpaceViewer() {
  const [isLoaded, setLoaded] = useState(false);
	const [newViewer, setNewViewer] = useState(null)
  
	const sphereElementRef = useRef(null);
	const container = sphereElementRef.current;
	
	const [modalOpen, setModalOpen] = useState(false);
  const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

  useEffect((viewer) => {
		window.onload = () => setLoaded(true)
		if (isLoaded) {
			viewer = createViewer(container)
			setNewViewer(viewer)
			return () => viewer.destroy()
		}
  }, [isLoaded, container]);

  return (
    <>
			{modalOpen &&
				<SpaceViewerModal viewer={newViewer} modalOpen={modalOpen} handleClose={closeModal}>
					<p>Hello</p>
				</SpaceViewerModal>
			}
			<SpaceViewerAside>
				<button onClick={() => openModal()}>Show Modal</button>
			</SpaceViewerAside>
      <div
        style={{ width: "100%", height: "100vh" }}
        ref={sphereElementRef}
      ></div>
    </>
  );
}


export default SpaceViewer;

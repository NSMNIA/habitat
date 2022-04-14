import { useEffect, useRef, useState } from "react";
import createViewer from "./createViewer";
import SpaceViewerModal from "./SpaceViewerModal";

function SpaceViewer() {
  const [isLoaded, setLoaded] = useState(false);
  
	const sphereElementRef = useRef(null);
	const container = sphereElementRef.current;
	
	const [modalOpen, setModalOpen] = useState(false);
  const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

  useEffect((viewer) => {
		window.onload = () => setLoaded(true)
		if (isLoaded) {
			viewer = createViewer(container)
			return () => viewer.destroy()
		}
  }, [isLoaded, container]);

  return (
    <>
			{modalOpen &&
				<SpaceViewerModal modalOpen={modalOpen} handleClose={closeModal}>
					<p>Hello</p>
				</SpaceViewerModal>
			}
			<button onClick={() => openModal()}>Show Modal</button>
      <div
        style={{ width: "100%", height: "100vh" }}
        ref={sphereElementRef}
      ></div>
    </>
  );
}


export default SpaceViewer;

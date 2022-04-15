import React, { useEffect, useRef, useState } from "react";
// import createViewer from "./createViewer";
import SpaceViewerModal from "./SpaceViewerModal";
import SpaceViewerAside from "./SpaceViewerAside";
import SpaceView from "./SpaceView";

function SpaceViewer() {
	const [modalOpen, setModalOpen] = useState(false);
  const openModal		= () => { setModalOpen(true) };
  const closeModal	= () => { setModalOpen(false) };

  return (
    <>
			{modalOpen &&
				<SpaceViewerModal
					modalOpen={modalOpen}
					handleClose={closeModal}
				>
					<p>Hello</p>
				</SpaceViewerModal>
			}
			<SpaceViewerAside>
				<button onClick={() => openModal()}>Show Modal</button>
			</SpaceViewerAside>
      <SpaceView />
    </>
  );
}


export default SpaceViewer;

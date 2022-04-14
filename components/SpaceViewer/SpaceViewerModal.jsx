import styles from "./SpaceViewerModal.module.scss"

const Modal = ({ handleClose, children }) => {
  return (
		<div className={styles.root}>
			<div className={styles.bg} onClick={handleClose}></div>
			<div className={styles.box}>
				<div className={styles.header}>
					<h4>Title</h4>
				</div>
				<div className={styles.body}>
					{children}
				</div>
				<div className={styles.footer}>
					<button onClick={handleClose}>Close</button>
				</div>
				{/* <button onClick={handleClose}>Close</button>
				<section>This is a modal</section> */}
			</div>
		</div>
  );
};

export default Modal;
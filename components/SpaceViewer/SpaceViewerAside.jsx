import styles from "./SpaceViewerAside.module.scss"

const SpaceViewerAside = ({children}) => {
	return (
		<div className={styles.root}>{children}</div>
	)
}

export default SpaceViewerAside
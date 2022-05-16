import Image from "next/image";
import styles from "./ContactCard.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons'
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

const ContactCard = () => {
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.image}>
					<Image
						src={`/img/contact-card.jpg`}
						alt="property-card"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className={styles.person}>
					<h3>John Doe</h3>
					<span>Promoter</span>
				</div>
			</div>
			<ul className={styles.details}>
				<li><FontAwesomeIcon icon={faEnvelope} /><span>Johndoe@habitat.com</span></li>
				<li><FontAwesomeIcon icon={faPhone} /><span>+593 1 234 4567</span></li>
				<li><FontAwesomeIcon icon={faCalendar} /><span>Availability</span></li>
				<br />
				<li><button style={{flex:1}} className="cta-button">Contact promoter</button></li>
			</ul>
		</div>
	)
}

export default ContactCard
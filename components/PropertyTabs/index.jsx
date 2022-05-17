import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Features from "./Features";
import ShowMap from '../../components/Google/ShowMap';
import Floor from "./Floor";

const PropertyTabs = ({property}) => {
	// const [features, setFeatures] = useState(null)
	
	const handleSelect = (e) => {
		// const selected = document.querySelector(".react-tabs__tab--selected")
	}

	const CustomTab = ({ children, ...otherProps }) => (
		<Tab {...otherProps} selectedClassName="react-tabs__tab--selected">{children}</Tab>
	);

	CustomTab.tabsRole = 'Tab'; // Required field to use your custom Tab

	return (
		<Tabs onSelect={(index) => handleSelect()}>
			<TabList>
				<CustomTab>Features</CustomTab>
				<CustomTab>Map</CustomTab>
				<CustomTab>Floor Plan</CustomTab>
			</TabList>
			<TabPanel><Features property={property} /></TabPanel>
			<TabPanel><ShowMap address={"Altar 454, Sangolquí 171103, Ecuador"} /></TabPanel>
			<TabPanel><Floor /></TabPanel>
		</Tabs>
	)
}

export default PropertyTabs

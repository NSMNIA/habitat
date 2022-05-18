import { FC } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ShowMap from '../../components/Google/ShowMap';
import Features from "./Features";
import Floor from "./Floor";

interface Props {
	property: any
}

const PropertyTabs: FC<Props> = ({ property }) => {
	const CustomTab = ({ children, ...otherProps }: any) => (
		<Tab {...otherProps} selectedClassName="react-tabs__tab--selected">{children}</Tab>
	);
	CustomTab.tabsRole = 'Tab';
	return (
		<Tabs >
			<TabList>
				<CustomTab>Features</CustomTab>
				<CustomTab>Map</CustomTab>
				<CustomTab>Floor Plan</CustomTab>
			</TabList>
			<TabPanel><Features property={property} /></TabPanel>
			<TabPanel><ShowMap address={property?.address} /></TabPanel>
			<TabPanel><Floor /></TabPanel>
		</Tabs>
	)
}

export default PropertyTabs

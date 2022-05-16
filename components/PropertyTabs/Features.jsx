import React from 'react'

const f = {
	layout: {
		type: "New",
		numberRooms: "8 rooms (4 bedrooms)",
		numberBathrooms: "2 bathrooms",
		bathroomFacilities: "Bathtub, shower and toilet",
		numberFloors: "3 floors",
		facilities: "Solar panels",
		parkingLot: "Yes"
	},
	area:{
		living: 104,
		otherIndoorSpace: 16,
		externalStorageRoom: 11,
		totalSquareMetres: 282
	},
	energy: {
		energyLabel: "a",
		insulation: "Roof insulation and mostly double glazing ",
		heating: "Boiler",
		hotWater: "Boiler",
		boiler: "HR-combi (gas fired combi boiler from 2010, property)",
	},
	activity: {
		seen: 300,
		saved: 21,
		since: "15-03-2022"
	}
}

const CustomTable = ({list, title}) => (
	<div>
		<h2>{title}</h2>
		<table>
			<tbody>
				{list.map((i, index) => {
					return (
						<tr key={index}>
							<td>{i[0]}</td>
							<td>{i[1]}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</div>
)

const Features = () => {
	return (
		<div>
			<div>
				<h3>Description</h3>
				<p>This home is a must see. Beatiful craftsmanship troughout. The marble floored entrance leads to the large prisitine formal living room. Kitchen constructed of Amish cabinets and island with new stainless steel fridge. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
			{f.layout && <CustomTable title={"Layout"} list={Object.entries(f.layout)} />}
			{f.area && <CustomTable title={"Area"} list={Object.entries(f.area)} />}
			{f.energy && <CustomTable title={"Energy"} list={Object.entries(f.energy)} />}
		</div>
	)
}

export default Features
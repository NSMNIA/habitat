import { FC } from "react";
interface Props {
  property: {
    type: string;
    surface: number;
    rooms: number;
    bathrooms: number;
    livingrooms: number;
    otherIndoorSpaces: number;
    externalStorage: number;
    totalSurface: number;
    extras: string;
    constructionYear: number;
  }
}

interface CustomTableProps {
  list: any,
  title: string
}

const CustomTable: FC<CustomTableProps> = ({ list, title }) => (
  <div>
    <h2>{title}</h2>
    <table style={{ width: "100%" }}>
      <tbody>
        {list?.map((i: any, index: number) => {
          return (
            <tr key={index} style={{ textTransform: "capitalize" }}>
              <td style={{ width: "40%" }}>{i[0]}:</td>
              <td style={{ width: "60%" }}>{i[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const Features: FC<Props> = ({ property }) => {
  const { type, surface, rooms, bathrooms, livingrooms, otherIndoorSpaces, externalStorage, totalSurface, extras, constructionYear } = property;
  const l = {
    "Type": type,
    "Construction year": constructionYear,
    "Rooms": rooms,
    "Bathrooms": bathrooms
  };

  const a = {
    "Livingrooms": livingrooms,
    "Other indoor spaces": otherIndoorSpaces,
    "External storage": externalStorage,
    "Surface": `${surface}m²`,
    "Total surface": `${totalSurface}m²`,
  }
  // const energy = [
  //   energy label: "a",
  //   insulation: "Roof insulation and mostly double glazing ",
  //   heating: "Boiler",
  //   hotWater: "Boiler",
  //   boiler: "HR-combi (gas fired combi boiler from 2010, property)",
  // ]

  return (
    <div>
      <div>
        <h3>Description</h3>
        {extras}
      </div>
      {l && <CustomTable title={"Layout"} list={Object.entries(l)} />}
      {a && <CustomTable title={"Area"} list={Object.entries(a)} />}
      {/* {f.energy && (
        <CustomTable title={"Energy"} list={Object.entries(f.energy)} />
      )} */}
    </div>
  );
};

export default Features;

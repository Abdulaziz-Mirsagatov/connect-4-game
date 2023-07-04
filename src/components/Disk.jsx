import React from "react";
import diskRed from "../assets/images/counter-red-small.svg";
import diskYellow from "../assets/images/counter-yellow-small.svg";

const Disk = ({ coordinate, color }) => {
  const left = (13 + 69.7 * coordinate[0]) / 16;
  const top = (13 + 69.7 * coordinate[1]) / 16;

  return (
    <img
      src={color === "yellow" ? diskYellow : diskRed}
      alt="disk"
      className="disk"
      style={{
        "--top": top.toString() + "rem",
        "--left": left.toString() + "rem",
      }}
    />
  );
};

export default Disk;

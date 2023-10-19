import React from "react";

export default function SelectImages(props) {
  const options1 = props.options1;
  const options2 = props.options2;
  setTimeout(() => {
    options1.map((val, ind) => {
      console.log(ind + " " + val);
    });
    console.log();
  }, 1000);
  return (
    <div>
      <label>Select Field 1:</label>
      <select>
        {options1.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>

      <label>Select Field 2:</label>
      <select>
        {options2.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}

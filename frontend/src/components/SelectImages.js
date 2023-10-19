import React, { useState, useSyncExternalStore } from "react";
import "../index.css";
export default function SelectImages(props) {
  const options1 = props.options1;
  const options2 = props.options2;
  // setTimeout(() => {
  //   options1.map((val, ind) => {
  //     console.log(ind + " " + val);
  //   });
  //   console.log();
  // }, 1000);
  return (
    <div className="options-container">
      <div className="selectField">
        <label className="selectField-label">Select Field 1:</label>
        <select className="selectField-select">
          {options1.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div className="selectField">
        <label className="selectField-label">Select Field 2:</label>
        <select className="selectField-select">
          {options2.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

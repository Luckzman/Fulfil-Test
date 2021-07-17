import React from "react";

const Checkbox = ({ id, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      type="checkbox"
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;

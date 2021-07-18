import React from "react"
import PropTypes from "prop-types"

const Checkbox = ({ id, handleClick, isChecked }) => {
  return (
    <input id={id} type="checkbox" onChange={handleClick} checked={isChecked} />
  )
}

Checkbox.propTypes = {
  id: PropTypes.number,
  handleClick: PropTypes.func,
  isChecked: PropTypes.bool,
}

export default Checkbox

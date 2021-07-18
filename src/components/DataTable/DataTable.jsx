import React, { useState, useEffect, useRef } from "react"
import Checkbox from "../Checkbox/Checkbox"
import PropTypes from "prop-types"
import "./DataTable.scss"

export const DataTable = ({
  columns,
  rightAlignID,
  rows,
  loadMoreData,
  onRowClick,
  onSelectionChange,
}) => {
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const ref = useRef(null)

  /**
   * @name handleScroll
   * @description this function triggers infinite scrolling on datatable
   */
  const handleScroll = () => {
    const scrollY = window.scrollY
    const offsetHeight = ref.current.offsetHeight
    const threshold = 1000
    if (offsetHeight - scrollY - threshold < 0) loadMoreData()
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    //return this event listener to prevent memory leak
    return () => document.removeEventListener("scroll", handleScroll)
  })

  /**
   * @name handleScroll
   * @description It checks and uncheck all checkboxes when this function runs
   */
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(rows.map((li) => li.id))
    if (isCheckAll) {
      setIsCheck([])
    }
  }

  /**
   * @description this function runs when a row is clicked on
   * @param {number} id
   */
  const handleRowClick = (id) => {
    onRowClick(id)
  }

  /**
   * @name handleSingleSelect
   * @description It checks and uncheck individual checkbox
   * @param {object} e
   */
  const handleSingleSelect = (e) => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, Number(id)])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== Number(id)))
    }
  }

  useEffect(() => {
    onSelectionChange(isCheck)
  }, [isCheck])

  return (
    <table width="100%">
      <thead>
        <tr>
          <th data-testid="select-all">
            <Checkbox
              id="selectAll"
              handleClick={handleSelectAll}
              isChecked={isCheckAll}
            />
          </th>
          {columns.map((item) => (
            <th
              key={item.id}
              style={{ textAlign: `${item.numeric ? "right" : "left"}` }}
              width={item.width}
              data-testid="columnHeader"
            >
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody ref={ref}>
        {rows.map(({ id, thumbnailUrl, title }) => (
          <tr key={id} data-testid="rows" className="cursor-pointer">
            <td data-testid={`single-checkbox-${id}`}>
              <Checkbox
                id={id}
                handleClick={handleSingleSelect}
                isChecked={isCheck.includes(id)}
              />
            </td>
            <td
              data-testid={`id-row-${id}`}
              style={{ textAlign: `${rightAlignID ? "right" : "left"}` }}
              onClick={() => handleRowClick(id)}
            >
              {id}
            </td>
            <td
              data-testid={`thumbnail-row-${id}`}
              onClick={() => handleRowClick(id)}
            >
              <img
                src={thumbnailUrl}
                style={{ borderRadius: "50%" }}
                width="15px"
                alt=""
              />
            </td>
            <td
              data-testid={`title-row-${id}`}
              onClick={() => handleRowClick(id)}
            >
              {title}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      numeric: PropTypes.bool,
      width: PropTypes.string,
    })
  ),
  rows: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      thumbnailUrl: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  rightAlignID: PropTypes.bool,
  loadMoreData: PropTypes.func,
}

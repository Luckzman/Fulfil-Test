import React, { useEffect, useState } from "react"
import axios from "axios"
import { DataTable } from "./components/DataTable/DataTable"
import { Alert } from "./components/Alert/Alert"
import { API_URL, columns } from "./utils/constants"
import { pageData } from "./utils/utils"
import "./styles/index.css"
import "./App.css"

function App() {
  const [results, setResults] = useState([])
  const [showAlert, setShowAlert] = useState({ show: false, data: [] })
  const [data, setData] = useState({
    data: [],
    loading: false,
    page: 1,
  })

  /**
   * @name fetchData
   * @description This method make an async call
   */
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL)
      const { data } = response
      if (data) {
        setResults(data)
        setData({
          data: pageData({ data }),
          loading: false,
          page: 1,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  /**
   * @name loadMoreData
   * @description this function loads more data when infinite scroll function is called
   */
  const loadMoreData = () => {
    if (data.loading) return
    setData((prev) => ({
      ...prev,
      loading: true,
    }))

    setData((prev) => ({
      data: [...prev.data, ...pageData({ data: results, page: prev.page + 1 })],
      loading: false,
      page: prev.page + 1,
    }))
  }

  /**
   * @name onRowClick
   * @description This function run when a table body row is clicked on
   * @param {array} rowIndex
   */
  const onRowClick = (rowIndex) => {
    alert(`You just clicked on row ${rowIndex}`)
  }

  /**
   * @name onSelectionChange
   * @description The function displays alert component when checkbox is clicked
   * @param {array} checkedItems
   */
  const onSelectionChange = (checkedItems) => {
    if (checkedItems.length > 0) {
      return setShowAlert((prev) => ({
        ...prev,
        show: true,
        data: checkedItems,
      }))
    }
    return setShowAlert((prev) => ({ ...prev, show: false, data: [] }))
  }

  /**
   * @name onCloseAlert
   * @description closes Alert component when close button is clicked
   */
  const onCloseAlert = () => {
    setShowAlert((prev) => ({ ...prev, show: false, data: [] }))
  }

  return (
    <div className="App">
      <div className="container d-flex justify-center">
        <h2 className="header m-0">DataTable</h2>
      </div>
      <hr />
      <div className="container">
        {showAlert.show && (
          <div className="w-100 d-flex justify-center">
            <Alert onClose={onCloseAlert}>{`${showAlert.data.length} item${
              showAlert.data.length === 1 ? "" : "s"
            } selected`}</Alert>
          </div>
        )}
        {data && (
          <DataTable
            columns={columns}
            rows={data?.data}
            loadMoreData={loadMoreData}
            onRowClick={onRowClick}
            onSelectionChange={onSelectionChange}
            rightAlignID={true}
          />
        )}
      </div>
    </div>
  )
}

export default App

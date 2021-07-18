/* eslint-disable no-undef */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DataTable } from "../DataTable"
import { columns, rows } from "./fixtures"

const mockedRowClickHandler = jest.fn()
const mockedSelectionChange = jest.fn()

describe("DataTable Component", () => {
  it("should render DataTable component", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableElement = screen.getByRole("table")
    expect(tableElement).toBeInTheDocument()
  })
  it("should render the number of passed in columns", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableHeaderElements = screen.getAllByTestId("columnHeader")
    expect(tableHeaderElements.length).toBe(columns.length)
  })
  it("should render the number of passed in rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableRowsElements = screen.getAllByTestId("rows")
    expect(tableRowsElements.length).toBe(rows.length)
  })
  it("should change the check state when checkbox in the table row is clicked", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const checkboxRowElement = screen.getByTestId("single-checkbox-1")
    fireEvent.change(checkboxRowElement)
    expect(mockedSelectionChange).toBeCalled()
  })
  it("should check all checkboxes when seleect all checkbox in the table header row is clicked", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const selectAllCheckboxElement = screen.getByTestId("select-all")
    fireEvent.change(selectAllCheckboxElement)
    expect(mockedSelectionChange).toBeCalled()
  })
  it("should fire an event when datatable id row is clicked", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableRowElement = screen.getByTestId("id-row-1")
    fireEvent.click(tableRowElement)
    expect(mockedRowClickHandler).toBeCalled()
  })
  it("should fire an event when datatable thumbnail body cell is clicked", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableBodyThumbnailCellElement = screen.getByTestId("thumbnail-row-1")
    fireEvent.click(tableBodyThumbnailCellElement)
    expect(mockedRowClickHandler).toBeCalled()
  })
  it("should fire an event when datatable id row is clicked", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        loadMoreData={jest.fn()}
        onRowClick={mockedRowClickHandler}
        onSelectionChange={mockedSelectionChange}
      />
    )
    const tableBodyTitleCellElement = screen.getByTestId("title-row-1")
    fireEvent.click(tableBodyTitleCellElement)
    expect(mockedRowClickHandler).toBeCalled()
  })
})

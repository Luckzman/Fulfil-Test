import { render, screen } from '@testing-library/react';
import { DataTable } from '../DataTable';
import {columns, rows} from './fixtures'

describe('DataTable Component', () => {
  it('should render DataTable component', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeInTheDocument();
  });
  it('should render the number of passed in columns', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
    const tableHeaderElements = screen.getAllByTestId('columnHeader')
    expect(tableHeaderElements.length).toBe(columns.length);
  });
  it('should render the number of passed in rows', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
    const tableRowsElements = screen.getAllByTestId('rows')
    expect(tableRowsElements.length).toBe(rows.length);
  });
  it('should change the check state when checkbox in the table row is clicked', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
    
  });
  it('should check all checkboxes when seleect all checkbox in the table header row is clicked', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
  });
  it('should fire an event when datatable row is clicked', () => {
    render(<DataTable 
      columns={columns} 
      rows={rows}
      loadMoreData={jest.fn()} 
      onRowClick={jest.fn()} 
      onSelectionChange={jest.fn()} 
    />);
  });
})

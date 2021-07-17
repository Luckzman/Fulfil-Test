import React, { useState, useEffect, useRef } from 'react'
import Checkbox from '../Checkbox'
import './DataTable.scss'

export const DataTable = ({columns, rows, loadMoreData, onRowClick, onSelectionChange}) => {
	const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
	const ref = useRef(null)

	const handleScroll = () => {
		const cY = window.scrollY;
		const tbh = ref.current.offsetHeight;
		const thresh = 1000;
		if (tbh - cY - thresh < 0) loadMoreData()
	}

	useEffect (() => {
		document.addEventListener('scroll', handleScroll);
		return () => document.removeEventListener('scroll', handleScroll)
	})

	const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(rows.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

	const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, Number(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== Number(id)));
    }
  };

	return (

		<table width="100%">
			<thead>
				<tr>
					<th>
						<Checkbox
							id="selectAll"
							handleClick={handleSelectAll}
							isChecked={isCheckAll}
						/>
					</th>
					{columns.map((item => 
						<th key={item.id}>{item.label}</th>
						))}
				</tr>
			</thead>
			<tbody ref={ref}>
				{rows.map(({id, thumbnailUrl, title}) => 
					<tr key={id} onClick={() => onRowClick(id)}>
						<td>
							<Checkbox
								id={id}
								handleClick={handleClick}
								isChecked={isCheck.includes(id)}
							/>
						</td>
						<td>{id}</td>
						<td><img src={thumbnailUrl} style={{borderRadius: '50%'}} width="15px" alt="" /></td>
						<td>{title}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

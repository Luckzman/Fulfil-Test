import React, { useState, useEffect, useRef } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import './DataTable.scss'

export const DataTable = ({columns, rightAlignID, rows, loadMoreData, onRowClick, onSelectionChange}) => {
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

	const handleRowClick = (id) => {
		onRowClick(id)
	}

	const handleSingleSelect = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, Number(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== Number(id)));
    }
  };
	
	useEffect(() => {
		onSelectionChange(isCheck);
	}, [isCheck])
	console.log(isCheck, 'isCheck')
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
					{columns.map((item => 
						<th key={item.id} style={{textAlign: `${item.numeric ? 'right': 'left'}`}} width={item.width} data-testid="columnHeader" >{item.label}</th>
						))}
				</tr>
			</thead>
			<tbody ref={ref}>
				{rows.map(({id, thumbnailUrl, title}) => 
					<tr data-testid='rows' className="cursor-pointer" key={id}>
						<td data-testid={`single-checkbox-${id}`}>
							<Checkbox
								id={id}
								handleClick={handleSingleSelect}
								isChecked={isCheck.includes(id)}
							/>
						</td>
						<td data-testid={`id-row-${id}`} style={{textAlign: `${rightAlignID ? 'right' : 'left'}`}} onClick={() => handleRowClick(id)}>{id}</td>
						<td data-testid={`thumbnail-row-${id}`} onClick={() => handleRowClick(id)}><img src={thumbnailUrl} style={{borderRadius: '50%'}} width="15px" alt="" /></td>
						<td data-testid={`title-row-${id}`} onClick={() => handleRowClick(id)}>{title}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

import { useEffect, useState } from 'react';
import { DataTable } from './components/DataTable/DataTable'
import axios from 'axios';
import { API_URL  } from './constants';
import './App.css'

const fetchData = async () => {
	try {
		const response = await axios.get(API_URL);
		if(response.data){
			return response.data;
		}
	} catch (error) {
		console.log(error)
	}
}

const pageData = ({  data, per = 50, page = 1}) => {
	return data.slice(per * (page - 1), per * page);
}

function App() {
	const [results, setResults] = useState([]);
	const [data, setData] = useState({
		data: [],
		loading: false,
		page: 1
	});
	
	const columns = [
		{id: 'ID', label: 'ID', numeric: true, width: '10px'},
		{id: 'image', label: '', numeric: false, width: '10px'},		
		{id: 'title', label: 'TITLE', numeric: false, width: '10px'},		
	]

	const getData = async() => {
		const result = await fetchData();
		setResults(result)
		setData({
			data: pageData({data: result}),
			loading: false,
			page: 1
		})
	}

	useEffect(() => {
		getData()
	}, [])
	
	const loadMoreData = () => {
		if(data.loading) return;
		setData((prev) => ({
			...prev,
			loading: true
		}))

		setData((prev) => {
			// console.log(prev, 'prev')
			return({
			data: [
				...prev.data,
				...pageData({ data: results, page: prev.page + 1})
			],
			loading: false,
			page: prev.page + 1
		})})
		// console.log(data, 'data')
	}

	const onRowClick = (rowData, rowIndex) => {
		// console.log(rowIndex, rowData)
	}

	const onSelectionChange = (value) => {
		// console.log(value)
	}

	return (
		<div className='App'>
			<div className='container'>
				<h6>All</h6>
			</div>
			<hr />
			<div className='container'>
				{data && <DataTable
					columns={columns}
					rows={data?.data}
					loadMoreData={loadMoreData}
					onRowClick={onRowClick}
					onSelectionChange={onSelectionChange}
				/>}
			</div>
		</div>
	)
}

export default App

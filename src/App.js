import { useEffect, useState } from 'react';
import { DataTable } from './components/DataTable/DataTable'
import axios from 'axios';
import { API_URL, columns } from './utils/constants';
import { pageData} from './utils/utils';
import './App.css'

function App() {
	const [results, setResults] = useState([]);
	const [data, setData] = useState({
		data: [],
		loading: false,
		page: 1
	});
	
	const fetchData = async() => {
		try {
			const response = await axios.get(API_URL);
			const { data } = response;
			if(data){
				setResults(data)
				setData({
					data: pageData({ data }),
					loading: false,
					page: 1
				});
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
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

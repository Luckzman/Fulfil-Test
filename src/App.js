import { DataTable } from './components/DataTable'
import './App.css'

function App() {
	return (
		<div className='App'>
			<div className='container'>
				<h6>All</h6>
			</div>
			<hr />
			<div className='container'>
				<DataTable />
			</div>
		</div>
	)
}

export default App

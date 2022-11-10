import { FC, useEffect, useState } from 'react'
import { fetchData, Jobs } from './api_functions/fetchData'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsPage from './pages/JobsPage';

const App: FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([])
  useEffect(()=>{
      fetchData().then(res => {
      setJobs(res)
    })
  },[])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JobsPage jobs={jobs}/>}/>
      </Routes>
    </BrowserRouter>
    // <div className="font-bold">DAsdsadas</div>
  )
}

export default App

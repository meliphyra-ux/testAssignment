import { FC, useEffect, useState } from "react";
import { fetchData, Job } from "./api_functions/fetchData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import JobInfoPage from "./pages/JobInfoPage";

const App: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetchData().then((res) => {
      setJobs(res);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsPage jobs={jobs} />} />
        <Route path="/:id" element={<JobInfoPage jobs={jobs} />} />
      </Routes>
    </BrowserRouter>
    // <div className="font-bold">DAsdsadas</div>
  );
};

export default App;

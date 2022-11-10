import { FC, useEffect, useState } from "react";
import { Jobs } from "../api_functions/fetchData";
import JobBlock from "../components/JobBlock";

interface JobsPageProps {
  jobs: Jobs[];
}

const JobsPage: FC<JobsPageProps> = ({ jobs }) => {
  const [page, setPage] = useState<number>(1);
  const [pageCounter, setPageCounter] = useState<number[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    const startDisplayedItems = (page - 1) * 15
    const endDisplayedItems = (page - 1) * 15 + 15
    setDisplayedJobs([...jobs.slice(startDisplayedItems, endDisplayedItems)]);
  }, [page, jobs]);

  useEffect(() => {
    let pageCounterCalculation = Math.ceil(jobs.length / 15);
    for (let i = 1; i < pageCounterCalculation + 1; i++) {
      setPageCounter((prevState) => [...prevState, i]);
    }
  }, [jobs]);

  return (
    <div className="w-full flex items-center flex-col bg-[#F5F5F5]">
      {displayedJobs.map((job) => (
        <JobBlock
          key={job.id}
          pictrure={job.pictures[0]}
          title={job.title}
          name={job.name}
          address={job.address}
          createdAt={job.createdAt}
        />
      ))}
      <div className="flex flex-row justify-center">
        {pageCounter.map((pageButton) => (
          <p className={`p-2 ${page === pageButton ? 'border-b-2 border-blue-500' : ' ' }`} key={pageButton} onClick={() => setPage(pageButton)}>
            {pageButton}
          </p>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;

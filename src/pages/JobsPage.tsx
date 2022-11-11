import { FC, useEffect, useState } from "react";
import { Job } from "../api_functions/fetchData";
import JobBlock from "../components/JobBlock";

export interface JobPagesProps {
  jobs: Job[];
}

const JobsPage: FC<JobPagesProps> = ({ jobs }) => {
  const [page, setPage] = useState<number>(1);
  const [pageCounter, setPageCounter] = useState<number[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const startDisplayedItems = (page - 1) * 15;
    const endDisplayedItems = (page - 1) * 15 + 15;
    setDisplayedJobs([...jobs.slice(startDisplayedItems, endDisplayedItems)]);
  }, [page, jobs]);

  useEffect(() => {
    let pageCounterCalculation = Math.ceil(jobs.length / 15);
    for (let i = 1; i < pageCounterCalculation + 1; i++) {
      setPageCounter((prevState) => [...prevState, i]);
    }
  }, [jobs]);

  return (
    <main className="w-full flex items-center flex-col bg-[#F5F5F5] min-h-screen">
      {displayedJobs.map((job) => (
        <JobBlock
          key={job.id}
          id={job.id}
          pictrure={job.pictures[0]}
          title={job.title}
          name={job.name}
          address={job.address}
          createdAt={job.createdAt}
        />
      ))}
      <div className="flex flex-row justify-center">
        {pageCounter.map((pageButton) => (
          <p
            className={`p-2 ${
              page === pageButton ? "border-b-2 border-blue-500" : " "
            }`}
            key={pageButton}
            onClick={() => {
              setPage(pageButton)
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }}
          >
            {pageButton}
          </p>
        ))}
      </div>
    </main>
  );
};

export default JobsPage;

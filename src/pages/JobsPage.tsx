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
  const previousPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    page !== 1 ? setPage(page - 1) : null;
  };
  const nextPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    page !== pageCounter[pageCounter.length - 1] ? setPage(page + 1) : null;
  };
  const moveToPage = (pageButton: number) => {
    setPage(pageButton);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  return (
    <main className="w-full flex items-center flex-col bg-[#F5F5F5] min-h-screen xl:p-6 py-3">
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
      <div
        className="flex flex-row justify-center items-center bg-white px-2 rounded-lg text-[#7D859C]"
        style={{
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <p
          className="border-r-2 pl-2 pr-4 mr-2 "
          onClick={() => previousPage()}
        >
          {"<"}
        </p>
        {pageCounter.map((pageButton) => (
          <p
            className={`py-2 px-4 text-[20px] font-bold align-middle  border-b-2 ${
              page === pageButton
                ? " border-blue-500 text-blue-500"
                : "border-white"
            }`}
            key={pageButton}
            onClick={() => moveToPage(pageButton)}
          >
            {pageButton}
          </p>
        ))}
        <p className="border-l-2 pl-4 pr-2 ml-2" onClick={() => nextPage()}>
          {">"}
        </p>
      </div>
    </main>
  );
};

export default JobsPage;

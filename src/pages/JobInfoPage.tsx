import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Job } from "../api_functions/fetchData";
import { JobPagesProps } from "./JobsPage";

const JobInfoPage: FC<JobPagesProps> = ({ jobs }) => {
  const { id } = useParams();
  let [jobInfo, setJobInfo] = useState<Job | null>(null);
  useEffect(() => setJobInfo(jobs.filter((job) => job.id === id)[0]), [jobs]);
  return (
      <main>JobInfoPage 
        <h2>{jobInfo?.title}</h2>
        <h3>Responsopilities</h3>
        <p>{jobInfo?.description}</p>
      </main>

  )
};

export default JobInfoPage;

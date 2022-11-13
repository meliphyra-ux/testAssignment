import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Job } from "../api_functions/fetchData";
import AdditionInfoBlocks from "../components/AdditionInfoBlocks";
import { calculateDaysAfterCreation } from "../time_functions/timeFunction";
import { JobPagesProps } from "./JobsPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LocationAndContacts from "../components/LocationAndContacts";

const JobInfoPage: FC<JobPagesProps> = ({ jobs }) => {
  const { id } = useParams();
  const [jobInfo, setJobInfo] = useState<Job | null>(null);
  const [createdDaysAgo, setCreatedDaysAgo] = useState<number>(0);
  const applyButtonStyling =
    "px-[30px] py-[18px] text-white bg-[#384564] rounded-lg text-center";
  const sectionHeader = "font-bold text-2xl";
  useEffect(() => {
    setJobInfo(jobs.filter((job) => job.id === id)[0]);
    console.log(jobs.filter((job) => job.id === id)[0]);
    return () => setJobInfo(null);
  }, [jobs]);
  useEffect(() => {
    if (jobInfo !== null) {
      setCreatedDaysAgo(calculateDaysAfterCreation(jobInfo?.createdAt));
    }
    return () => {
      setCreatedDaysAgo(0);
    };
  }, [jobInfo]);
  return (
    <div
      className="
    justify-center
    flex xl:flex-row xl:pt-[56px] xl:px-[5%] xl:items-start
    flex-col pt-6 px-4 items-center
    "
    >
      <div
        className="
      xl:mr-[82px] 
      text-[#3A4562] max-w-[774px] w-full
      "
      >
        <header className="border-b-[1px] flex justify-between items-center">
          <h2 className="font-bold text-[28px]">Job details</h2>
          <div className="flex justify-between">
            <button className="mr-8">Save to my list</button>
            <button>Share</button>
          </div>
        </header>
        <main
          className="mt-10
        xl:block
        w-full
        "
        >
          <button
            className={`
          xl:block
          ${applyButtonStyling} mb-8 hidden
          `}
          >
            Apply now
          </button>
          <div className="flex flex-row justify-between relative">
            <h3 className={`${sectionHeader} max-w-[500px]`}>
              {jobInfo?.title}
            </h3>
            <div
              className="
            xl:static
            absolute bottom-[-57px] right-0 
            "
            >
              <h3 className="font-bold">€{jobInfo?.salary}</h3>
              <p>Brutto, per year</p>
            </div>
          </div>
          <p
            className="
          xl:my-[7px] 
          my-[23px] text-[#878D9D] "
          >
            {"Created " +
              `${
                createdDaysAgo < 365
                  ? `${createdDaysAgo} days ago`
                  : `${Math.floor(createdDaysAgo / 365)} years ago`
              }`}
          </p>
          <p>{jobInfo?.description}</p>
          <div className="xl:block flex justify-center">
            <button className={`${applyButtonStyling} mt-[24px] mb-[104px]`}>
              Apply now
            </button>
          </div>
          <h2 className={`${sectionHeader} border-b-[1px]`}>Additional info</h2>
          {jobInfo !== null ? (
            <>
              <AdditionInfoBlocks
                array={jobInfo?.employment_type}
                title="Employement type"
                bgColor="rgba(161, 177, 219, 0.317343)"
                textColor="#55699E"
                borderColor="rgba(85, 105, 158, 0.3)"
              />
              <AdditionInfoBlocks
                array={jobInfo?.benefits}
                title="Benefits"
                bgColor="rgba(255, 207, 0, 0.15)"
                textColor="rgba(152, 139, 73, 1)"
                borderColor="rgba(255, 207, 0, 1)"
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
          <h2 className={`${sectionHeader} mt-[87px] border-b-[1px]`}>
            Attached Images
          </h2>
          <div className="
          max-w-full mt-[12px]
          xl:overflow-visible
          overflow-scroll
          mb-[30px]
          flex flex-row
          ">
            {jobInfo?.pictures.map((picture, index) => (
              <LazyLoadImage
                key={picture + index}
                width={210}
                effect="blur"
                wrapperClassName="mr-2 flex-none"
                className="
                aspect-video rounded-lg object-cover object-center
                "
                src={picture}
                alt="Attached images"
              />
            ))}
          </div>
        </main>
      </div>
      {jobInfo !== null ? (
        <LocationAndContacts
          location={jobInfo?.location}
          name={jobInfo?.name}
          address={jobInfo?.address}
          phone={jobInfo?.phone}
          email={jobInfo?.email}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobInfoPage;

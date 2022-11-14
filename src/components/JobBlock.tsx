import { FC, useEffect, useState } from "react";
import Bookmark from "../assets/bookmark.svg";
import { useNavigate } from "react-router-dom";
import { calculateDaysAfterCreation } from "../time_functions/timeFunction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface JobBlockProps {
  id: string;
  pictrure: string;
  title: string;
  name: string;
  createdAt: string;
  address: string;
}
const JobBlock: FC<JobBlockProps> = ({
  id,
  pictrure,
  title,
  name,
  createdAt,
  address,
}) => {
  const [createdDaysAgo, setCreatedDaysAgo] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    let calculation = calculateDaysAfterCreation(createdAt);
    setCreatedDaysAgo(calculation);
  });
  return (
    <figure
      className="flex flex-row items-center w-[95%] max-w-[1400px] h-full xl:bg-[white] bg-[#EFF0F5] px-4 py-6 mb-2 rounded-lg relative"
      onClick={() => navigate(`/${id}`)}
      style={{
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <LazyLoadImage
        className="aspect-square rounded-full min-w-[66px]"
        wrapperClassName="mr-[26px]"
        width={85}
        src={pictrure}
        effect="blur"
        alt=""
      />
      <div className="xl:my-0 my-6 w-3/4">
        <h3 className="font-bold text-base w-full xl:block hidden">{title}</h3>
        <h3 className="text-base w-full xl:hidden block">
          {title.split(" ", 8).join(" ") + "..."}
        </h3>
        <p className="text-[#878D9D] my-2">{name}</p>
        <p className="text-[#878D9D] my-2">{address}</p>
      </div>
      <div className="flex flex-col min-h-[100px] w-fit items-end ml-auto text-base justify-between absolute top-4 right-4 xl:static">
        <img className="xl:block hidden" src={Bookmark} alt="" />
        <p className="text-[#878D9D] ">
          {"Created " +
            `${
              createdDaysAgo < 365
                ? `${createdDaysAgo} days ago`
                : `${Math.floor(createdDaysAgo / 365)} years ago`
            }`}
        </p>
      </div>
    </figure>
  );
};

export default JobBlock;

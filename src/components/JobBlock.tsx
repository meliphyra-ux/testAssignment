import { FC, useEffect, useState } from "react";
import Bookmark from "../assets/bookmark.svg"
import { useNavigate } from "react-router-dom";
import { calculateDaysAfterCreation } from "../time_functions/timeFunction";

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
  const navigate = useNavigate()
  useEffect(() => {
    let calculation = calculateDaysAfterCreation(createdAt)
    setCreatedDaysAgo(calculation);
  });
  return (
    <figure className="flex flex-row items-center w-4/5 h-full bg-white px-4 py-6 mb-2 rounded-lg"
    >
      <img className="aspect-square rounded-full mr-[26px]" width={85} src={pictrure} alt="" />
      <div>
        <h3 className="font-bold text-base max-w-[712px]"
        onClick={()=>navigate(`/${id}`)}  
        >{title}</h3>
        <p className="text-[#878D9D]">{name}</p>
        <p className="text-[#878D9D]">{address}</p>
      </div>
      <div className="flex flex-col min-h-[100px] w-fit items-end ml-auto text-base justify-between">
        <img src={Bookmark} alt="" />
        <p className="text-[#878D9D]">{'Created ' + `${createdDaysAgo < 365 ? `${createdDaysAgo} days ago` : `${Math.floor(createdDaysAgo / 365)} years ago` }`}</p>
      </div>
    </figure>
  );
};

export default JobBlock;

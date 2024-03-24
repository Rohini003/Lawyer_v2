import React from "react";

import { lawyer } from "./../../assets/data/lawyer";
import LawyerCard from "./LawyerCard";
const LawyerList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {lawyer.map((lawyer) => (
        <LawyerCard key={lawyer.id} lawyer={lawyer} />
      ))}
    </div>
  );
};

export default LawyerList;

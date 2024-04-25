import React from "react";
import { formateDate } from "../../component/utils/formateDate";
const LawyerAbout = ({name, about , qualifications, experiences}) => {

  return (
    <div>
      <div>
        <h3 className=" text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">
         {about ? (<p>about</p>):(<p>No Information about the lawyer {name}.</p>)}
        </p>
      </div>

      <div className="mt-12">
        <h3 className=" text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Education
        </h3>
        {qualifications?.length !== 0 ? (     <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("09-13-2014")} - {formateDate("09-13-2014")}
              </span>
              <p className="text-[15px] leading-5 font-medium text-textColor ">
                LLM in Criminal Law
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Mumbai
            </p>
          </li>

          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("07-04-2010")}
              </span>
              <p className="text-[14px] leading-5 font-medium text-textColor ">
                LLM in Criminal Law
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Mumbai
            </p>
          </li>
        </ul>):(<>No Qualification info about the lawyer {name}.</>)}

   
      </div>
      <div className="mt-12">
        <h3 className=" text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        {experiences?.length ? (
  <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
    <li className="p-4 rounded bg-[#fff9ea]">
      <span className="text-yellowColor text-[15px] leading-6 font-semibold">
        {formatDate("09-13-2014")} - {formatDate("09-13-2014")}
      </span>
      <p className="text-[14px] leading-5 font-medium text-textColor ">
        Criminal Lawyer
      </p>
      <p className="text-[14px] leading-5 font-medium text-textColor ">
        Bombay High Court
      </p>
    </li>
    <li className="p-4 rounded bg-[#fff9ea]">
      <span className="text-yellowColor text-[15px] leading-6 font-semibold">
        {formatDate("09-13-2014")} - {formatDate("09-13-2014")}
      </span>
      <p className="text-[14px] leading-5 font-medium text-textColor ">
        Criminal Lawyer
      </p>
      <p className="text-[14px] leading-5 font-medium text-textColor ">
        Bombay High Court
      </p>
    </li>
  </ul>
) : (
  <p>No experience provided for lawyer {name}</p>
)}

       
      </div>
    </div>
  );
};

export default LawyerAbout;

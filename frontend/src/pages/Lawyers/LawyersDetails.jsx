import React, { useState } from "react";
import startIcon from "../../assets/images/Star.png";
import LawyerAbout from "./LawyerAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loader from "../../component/loader/Loading";
import Error from "../../component/Error/Error";
import { useParams } from "react-router-dom";
import lawyerimg from "../../assets/images/lawyer44.jpg"


const LawyersDetails = () => {
  const [tab, setTab] = useState("about");

  const { id } = useParams();

  const {
    data: lawyer,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/lawyers/${id}`);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <Error />;
  // }

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    consultancyFee,
    photo,
  } = lawyer;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={lawyerimg} alt="" className="w-full" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex item-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={startIcon} alt="" /> {averageRating}
                    </span>

                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={` ${
                    tab === "about" && "border-b border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-textColor font-semibold`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={` ${
                    tab === "feedback" && "border-b border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-textColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && <LawyerAbout name={name} about={about} qualifications={qualifications} experiences={experiences}/>}
                {tab === "feedback" && <Feedback reviews={reviews} totalRating={totalRating} />}
              </div>
            </div>
            <div>
              <SidePanel />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LawyersDetails;

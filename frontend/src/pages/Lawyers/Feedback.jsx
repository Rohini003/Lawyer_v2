import React, { useContext, useEffect, useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../component/utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import { authContext } from "../../context/AuthContext";

const Feedback = () => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [reviews, setReviews] = useState([]);
   
    const { data, loading, error } = useFetchData(`${BASE_URL}/reviews/`);

    if (loading) {
        return <>Loading</>;
    }

    if (error) {
        return <>Error</>;
    }

    console.log(data);

    // useEffect(() => {
    //     const getAllFeedbacks = async () => {
    //         const data = await axios.get(
    //             "http://localhost:5000/api/v1/reviews/"
    //         );
    //         console.log("Inside effect");
    //         console.log(data);
    //         const resp = await data.json();
    //         setReviews(resp);
    //     };
    // }, []);

    const names = ["Sheetal Bisht" , "Rohini Parase" , "Divya Gupta" , "Omkar Kawale" , "Akansha Gundi" , "Sanket Villian" , "Nikshe Hero"]


    return (
        <div>
            <div className="mb-[50px]">
                <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
                    All Reviews ({data.length})
                </h4>
                {data.map((data) => {
                    return (
                        <div className="flex justify-between gap-10 mb-[30px]">
                            <div className="flex gap-3">
                                <figure className="w-10 h-10 rounded-full">
                                    <img
                                        className="w-full"
                                        src={avatar}
                                        alt=""
                                    />
                                </figure>
                                <div>
                                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                                       Sahil
                  
                                    </h5>
                                    <p className="text-[14px] leading-6 text-textColor">
                                        {formateDate("02-12-2023")}
                                    </p>
                                    <p className="text_para mt-3 font-medium text-[15px]">
                                        {data.reviewText}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(data.rating).keys()].map(
                                    (_, index) => (
                                        <AiFillStar
                                            key={index}
                                            style={{ color: "#0067FF" }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {!showFeedbackForm && (
                <div className="text-center">
                    <button
                        className="btn"
                        onClick={() => setShowFeedbackForm(true)}
                    >
                        Give Feedback
                    </button>
                </div>
            )}
            {showFeedbackForm && <FeedbackForm />}
        </div>
    );
};

export default Feedback;

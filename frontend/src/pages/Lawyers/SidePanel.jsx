import React, { useContext } from "react";
import { BASE_URL } from "../../../config";
import { authContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const SidePanel = ({ lawyerId, lawyerFees, timeSlots }) => {
    const { token } = useContext(authContext);
    console.log(token);
    const bookingHandler = async () => {
        try {
            const res = await fetch(
                `${BASE_URL}/bookings/checkout-session/${lawyerId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(`${data.message}. Please try again`);
            }

            if (data.session.url) {
                window.location.href = data.session.url;
            }
        } catch (err) {
            // toast.error(err.message);
            console.log(err.message);
        }
    };

    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text_para mt-0 font-semibold">lawyer Fees</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    500 Rs
                </span>
            </div>
            <div className="mt-[30px]">
                <p className="text_para mt-0 font-semibold text-headingColor">
                    Available Time Slots:
                </p>
                <ul className="mt-3">
                    <li className="flex items-center justify-between mb-2">
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            Sunday
                        </p>
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                    <li className="flex items-center justify-between mb-2">
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            Tuesday
                        </p>
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                    <li className="flex items-center justify-between mb-2">
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            Wednesday
                        </p>
                        <p className="text-[15px] leading-6  text-textColor font-semibold">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                </ul>
            </div>
            <Link to={"/checkout-success"}>
                <button className="btn px-2 w-full rounded-md">
                    Book Appointment
                </button>
            </Link>
        </div>
    );
};

export default SidePanel;

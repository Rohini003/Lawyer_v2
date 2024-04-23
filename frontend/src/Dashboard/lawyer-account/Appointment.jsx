import React, { useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import moment from "moment/moment";
const Appointments = ({ appointments }) => {
    const names = [];
    appointments.map((item) => {
        names.push(useFetchData(`${BASE_URL}/users/${item.user}`));
    });

    const formatDate = (date) => {
        // Implement your date formatting logic here
    };

    return (
        <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Booked on
                    </th>
                </tr>
            </thead>
            <tbody>
                {appointments?.map((item, i) => (
                    <tr key={item._id}>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                            {/* <img
                src={item.user.photo}
                className="w-10 h-10 rounded-full"
                alt=""
              /> */}
                            <div className="pl-3">
                                <div className="text-base font-semibold">
                                    {names[i].data.name}
                                </div>
                                <div className="text-normal text-gray-500">
                                    {names[i].data.email}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">{names[i].data.gender}</td>
                        <td className="px-6 py-4">
                            {item.isPaid ? "Paid" : "Unpaid"}
                        </td>
                        <td className="px-6 py-4">{item.ticketPrice}</td>
                        <td className="px-6 py-4">
                            {moment(item.createdAt).format("MM/DD/YYYY")}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Appointments;

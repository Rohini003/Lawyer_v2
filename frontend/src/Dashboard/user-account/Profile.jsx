import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    consultancyFee: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [],
    timeslots: [{ day: "", startingTime: "", endingTime: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addItems = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/lawyers/${lawyerData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItems("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualification", index, event);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItems("timeSlots", { day: "Sunday", startingTime: "10.00", endingTime: "4.30" });
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label mb-[5px]">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input w-[500px] h-[40px] pl-[20px] border border-gray-300"
          />
        </div>
        <div className="mb-5">
          <p className="form__label mb-[5px]">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input w-[500px] h-[40px] pl-[20px] border border-gray-300"

          />
        </div>
        <div className="mb-5">
          <p className="form__label mb-[5px]">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input w-[500px] h-[40px] pl-[20px] border border-gray-300"
          />
        </div>
        <div className="mb-5">
          <p className="form__label mb-[5px]">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input w-[200px] h-[40px] pl-[20px] border border-gray-300"
            maxLength={100}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 ">
              <div>
                <p className="form__label mt-[10px]">Gender*</p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form__input w-[200px] h-[40px] pl-[20px] border border-gray-300"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 mb-[30px]">
              <div>
                <p className="form__label mt-[10px]">Specialization*</p>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="form__input w-[200px] h-[40px] pl-[20px] border border-gray-300"
                >
                  <option value="">Select</option>
                  <option value="family lawyer">Family Lawyer</option>
                  <option value="corporate lawyer">Corporate Lawyer</option>
                  <option value="criminal lawyer">Criminal Lawyer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="form__label mb-[10px] ">Consultancy Fees*</p>
            <input
              type="number"
              placeholder="100"
              name="consultancyFee"
              value={formData.consultancyFee}
              onChange={handleInputChange}
              className="form__input w-[200px] h-[40px] pl-[20px] border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label mb-3">Qualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form__label mb-[20px]">Starting Date</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form__input w-[300px] h-[40px] pl-[20px] border border-gray-300"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form__label mb-[20px]">Ending Date</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    className="form__input w-[300px] h-[40px] pl-[20px] border border-gray-300"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>

                <div>
                  <p className="form__label mb-[20px]">Degree</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    className="form__input w-[300px] h-[40px] pl-[20px] border border-gray-300"
                    placeholder="Degree"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form__label mb-[20px]">University</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    className="form__input w-[300px] h-[40px] pl-[20px] border border-gray-300"
                    placeholder="University"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer w-[35px]">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label mb-3">Time Slots</p>
          {formData.timeslots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2  md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form__label mb-[10px]">Day*</p>
                  <select
                    name="day"
                    value={item.day}
                    className="form__input w-[130px] h-[40px] pl-[20px]  border border-gray-300"
                  >
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <p className="form__label mb-[10px]">Starting Time*</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    className="form__input w-[130px] h-[40px] pl-[20px] pr-[10px] border border-gray-300"
                  />
                </div>

                <div>
                  <p className="form__label mb-[10px]">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    className="form__input w-[130px] h-[40px] pl-[20px] pr-[10px] border border-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer" onClick={addTimeSlot}>
            Add Time Slots
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label mb-[5px]">About*</p>
          <textarea
            name="about"
            cols="30"
            rows="10"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Write Something About You"
            className="form__input w-[500px] h-[40px] pl-[20px] border border-gray-300 pt-[10px]"
          ></textarea>
        </div>

        <button
          type="submit"
          onClick={updateProfileHandler}
          className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;

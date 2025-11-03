import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../component/utils/uploadCloudinary";
import { BASE_URL, getToken } from "../../../config";
import { toast } from "react-toastify";
const Profile = ({ lawyerData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:"",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    consultancyFee: 0,
    qualifications: [],
    experiences: [],
    timeslots: [],
    about: "",
    photo: null,
  });

  useEffect(()=>{
    setFormData({
      name: lawyerData?.name,
      email: lawyerData?.email,
      phone: lawyerData?.phone,
      bio: lawyerData?.bio,
      gender:lawyerData?.gender,
      specialization: lawyerData?.specialization,
      consultancyFee: lawyerData?.consultancyFee,
      qualifications: lawyerData?.qualifications,
      experiences:lawyerData?.experiences,
      timeslots:lawyerData?.timeslots,
      about: lawyerData?.about,
      photo: lawyerData?.photo,

    })
  },[lawyerData])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken(); // Get the authentication token
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      const res = await fetch(`${BASE_URL}/lawyers/${lawyerData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  const addItem = (key, item) => {
    setFormData((prevFormData) => {
      // Check if prevFormData[key] is an array, if not, initialize it as an empty array
      const newArray = Array.isArray(prevFormData[key]) ? [...prevFormData[key]] : [];
      // Add the new item to the array
      newArray.push(item);
      // Return the updated state
      return {
        ...prevFormData,
        [key]: newArray,
      };
    });
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

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualifications = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "fsfdfsfs",
      university: "dkda",
    });
  };

  const handleQualificationsChange = (index, event) => {
    handleReusableInputChangeFunc("qualifications", index, event);
    const { name, value } = event.target;
    const newQualifications = [...formData.qualifications];
    newQualifications[index][name] = value;
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const deleteQualifications = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Crimial lawyer",
      hospital: "Bombay high court",
    });
  };

  const handleExperienceChange = (index, event) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem("timeslots", {
      day: "sunday",
      endingTime: "10:00",
      startingTime: "04:40",
    });
  };

  const handleTimeSlotChange = (index, event) => {
    handleReusableInputChangeFunc("timeslots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeslots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form onSubmit={updateProfileHandler}>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="family lawyer">Family Lawyer</option>
                <option value="corporate lawyer">Corporate Lawyer</option>
                <option value="criminal lawyer">Criminal Lawyer</option>
              </select>
            </div>

            <div>
              <p className="form__label">Consultancy Fees*</p>
              <input
                type="number"
                placeholder="100"
                name="consultancyFee"
                value={formData.consultancyFee}
                onChange={handleInputChange}
                className="form__input"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label mb-3">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationsChange(index, e)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationsChange(index, e)}
                      className="form__input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={(e) => handleQualificationsChange(index, e)}
                      placeholder="Degree"
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">University</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      onChange={(e) => handleQualificationsChange(index, e)}
                      placeholder="University"
                      className="form__input"
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualifications(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            type="button"
            onClick={addQualifications}
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label mb-3">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="form__input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Position"
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Court</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Court"
                      className="form__input"
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            type="button"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeslots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form__label">Days*</p>

                    <select
                      name="day"
                      value={item.day}
                      className="form__input py-3.5"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thusday">Thusday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      onChange={(e) => handleTimeSlotChange(index, e)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      onChange={(e) => handleTimeSlotChange(index, e)}
                      className="form__input"
                    />
                  </div>
                  <div
                    onClick={(e) => deleteTimeSlot(e, index)}
                    className="flex items-center"
                  >
                    <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            type="button"
          >
            Add TimeSlot
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>
        <div className="mb-5" flex items-center gap-3>
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full bottom-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
          ;
        </div>
      </form>
    </div>
  );
};

export default Profile;

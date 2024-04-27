import React, { useState } from "react";
import { BASE_URL } from "../../../config";
import{AiOutlineDelete} from "react-icons/ai"
import { toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    consultancyFee: 0,
    qualifications: [{ startingDate: "", endingDate: "",degree:"",university:"" }],
    experiences: [{ startingDate: "", endingDate: "",position:"",hospital:"" }],
    timeslots: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/updateProfile`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle response
    } catch (err) {
      // Handle error
    }
  };

  const handleQualificationsChange = (index, e) => {
    const { name, value } = e.target;
    const newQualifications = [...formData.qualifications];
    newQualifications[index][name] = value;
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { startingDate: "", endingDate: "" },
      ],
    });
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
              <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete/></button>
            </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer" type="button" onClick={addQualification}>
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
                  <p className="form__label">Position*</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleQualificationsChange(index, e)}
                    placeholder="Position"
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">Court</p>
                  <input
                    type="text"
                    name="court"
                    value={item.hospital}
                    onChange={(e) => handleQualificationsChange(index, e)}
                    placeholder="Court"
                    className="form__input"
                  />
                </div>
              </div>
              <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete/></button>
            </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer" type="button" onClick={addQualification}>
            Add Experience
          </button>
        </div>

        </form>
        </div>
  );
};

export default Profile;
   
        
        <button type="submit">Update Profile</button>
     


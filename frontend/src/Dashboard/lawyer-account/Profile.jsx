import React, { useState } from "react";
import { BASE_URL } from "../../../config";
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
    qualifications: [{ startingDate: "", endingDate: "" }],
    experiences: [],
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
      <h2 className="text-headingcolor font-bold text-[24px] leading-9 mb-10">
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
            disabled={true}
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
            <p className="form__label">Gender</p>
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
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
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
        </div>
        <div className="mb-5">
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
        <div className="mb-5">
          <p className="form__label">Qualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
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
            </div>
          ))}
          <button type="button" onClick={addQualification}>
            Add Qualification
          </button>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL,getToken } from "../../../config";
import Hashloader from "react-spinners/HashLoader";


const Profile = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    about:"",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      bio: user?.bio,
      gender: user?.gender,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the update process starts
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // Call getToken function to get the token
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false); // Set loading to false after successful update
      toast.success("Profile updated successfully!");
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false); // Set loading to false if there is an error
    }
};


  return (
    <div className="mt-10">
      <form onSubmit={updateProfileHandler}>
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
            aria-readonly
            readOnly
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
          {loading ? (
            <Hashloader color={"#ffffff"} size={20} />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;

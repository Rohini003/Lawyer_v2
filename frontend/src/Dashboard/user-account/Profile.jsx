import React, { useEffect, useState } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom'; // Added useNavigate import
import { BASE_URL,token } from '../../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Profile = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
    });

    const navigate = useNavigate();

    useEffect(()=> {
        setFormData({name: user.name, email:user.email, gender:user.gender})
    },[user]);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'put',
                headers: {
                    'content-Type': 'application/json',
                    Authorization:`Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const { message } = await res.json();

            if (!res.ok) {
                throw new Error(message);
            }

            setLoading(false);
            toast.success(message);
            navigate('/users/profile/me');
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                />
            </div>
            <div className="mb-5">
                <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                />
            </div>
            <div className="mb-5">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                />
            </div>
            <div className="mb-5 flex items-center justify-between">
  
                <label className="text-headingColor font-bold text-[16px] leading-7">
                    Gender:
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            </div>
            <div className="mt-7">
                <button
                    disabled={loading && true}
                    type="submit"
                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                    {loading ? (
                        <HashLoader size={35} color="#ffffff" />
                    ) : (
                        'Update'
                    )}
                </button>
            </div>
        </form>
    );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaGlobe, FaFileImage } from 'react-icons/fa';
import { FaClipboardUser } from "react-icons/fa6";
import { userService } from "../../services/userService";

const ProfileField = ({ label, value, icon }) => (
    <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-gray-600 font-medium capitalize">{label}</span>
        </div>
        <span className="text-gray-800 font-semibold truncate max-w-[50%]">{value}</span>
    </div>
);

const EditField = ({ name, value, onChange, icon }) => (
    <div className="flex justify-between gap-4">
        <div className="w-1/8 flex items-center">
            <label htmlFor={name} className="text-gray-700 font-medium capitalize">
                {icon}
            </label>
        </div>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="flex-1 px-4 py-2 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
    </div>
);

export default function ProfileHeader() {
    const icons = {
        name: <FaUser size={20} className="text-gray-500" />,
        email: <FaEnvelope size={20} className="text-gray-500" />,
        birthday: <FaCalendarAlt size={20} className="text-gray-500" />,
        gender: <FaVenusMars size={20} className="text-gray-500" />,
        region: <FaGlobe size={20} className="text-gray-500" />,
        role: <FaClipboardUser size={20} className="text-gray-500" />,
        avatar: <FaFileImage size={20} className="text-gray-500" />,
    };

    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                const data = await userService.getUserProfile(token);
                if (data) {
                    setProfile(data);
                    setEditProfile(data);
                }
            }
        };
        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const updatedProfile = await userService.updateUserProfile(token, editProfile);
            if (updatedProfile) {
                setProfile(updatedProfile);
                setIsEditing(false);
                alert("Update successfully");
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while saving the profile. Please try again later.");
        }
    };

    if (!profile) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-between items-center">
                    <div class="w-1/4 overflow-hidden flex justify-center items-center">
                        <img src={profile["avatar"]} alt="User Avatar" />
                    </div>
                    <div className="w-3/4 p-6 lg:grid lg:grid-cols-2 lg:gap-5">
                        {Object.keys(profile).map((key) =>
                            key !== "id" && key !== "avatar" && (
                                <ProfileField
                                    key={key}
                                    label={key}
                                    value={profile[key]}
                                    icon={icons[key]}
                                />
                            )
                        )}
                    </div>
                </div>
                <div className="px-6 py-4 flex justify-end">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center px-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6">
                        <h3 className="text-2xl font-semibold text-center text-gray-800">Edit Profile</h3>
                        <div className="space-y-4">
                            {Object.keys(editProfile).map(
                                (key) =>
                                    key !== "role" &&
                                    key !== "id" &&
                                    key !== "email" && (
                                        <EditField
                                            key={key}
                                            name={key}
                                            value={editProfile[key]}
                                            onChange={handleChange}
                                            icon={icons[key]}
                                        />
                                    )
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

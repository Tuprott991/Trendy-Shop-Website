import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaGlobe } from 'react-icons/fa';

export default function ProfileHeader() {
    const icon = {
        name: <FaUser size={24} />,
        email: <FaEnvelope size={24} />,
        dob: <FaCalendarAlt size={24} />,
        gender: <FaVenusMars size={24} />,
        region: <FaGlobe size={24} />,
    };

    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Adminstrator",
        dob: "01/01/1990",
        gender: "Male",
        region: "New York, USA"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSave = () => {
        setProfile(editProfile);
        setIsEditing(false);
    };

    return (
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <div className="text-center text-white mb-6">
                <h2 className="text-3xl font-bold">Profile Information</h2>
                <p className="text-lg">Manage your personal details</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                {Object.keys(profile).map((key) => (
                    <div
                        className="flex justify-between py-3 border-b last:border-b-0 "
                        key={key}
                    >
                        <span className="text-gray-500 font-medium capitalize">{key}</span>
                        <span className="text-gray-900 font-semibold">{profile[key]}</span>
                    </div>
                ))}

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-center mb-5">Edit Profile</h3>
                        {Object.keys(editProfile).map((key) => (
                            key !== "role" && (
                                <div className="mb-5 flex items-center" key={key}>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        <span className="text-gray-700 font-medium capitalize" style={{ minWidth: "40px" }}>
                                            {icon[key]}
                                        </span>
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={editProfile[key]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                            style={{ height: "40px" }}
                                        />
                                    </div>
                                </div>
                            )
                        ))}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
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

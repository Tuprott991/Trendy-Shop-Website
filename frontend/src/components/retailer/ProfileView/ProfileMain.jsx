import React from "react";

export default function ProfileHeader() {
    // Define the profile data as an object
    const profile = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Retailer",
        dob: "01/01/1990",
        gender: "Male",
        region: "New York, USA"
    };

    return (
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <div className="text-center text-white mb-6">
                <h2 className="text-3xl font-bold">Profile Information</h2>
                <p className="text-lg">Manage your personal details</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Dynamic rendering of profile data */}
                {Object.keys(profile).map((key) => (
                    <div
                        className="flex justify-between py-3 border-b last:border-b-0"
                        key={key}
                    >
                        <span className="text-gray-500 font-medium capitalize">{key}</span>
                        <span className="text-gray-900 font-semibold">{profile[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

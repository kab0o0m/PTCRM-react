import React from "react";
import Navbar from "../Navbar/Navbar";
import getTutors from "./getTutors.jsx";
import { useState, useEffect } from "react";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTutors();
        setTutors(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchData();
  }, []);

  const UTCtoSGT = (date) => {
    const utcDate = new Date(date);
    const sgtDateTime = utcDate.toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return sgtDateTime;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Tutors</h2>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Profile Picture</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Review</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-left">Applications</th>
                <th className="py-3 px-6 text-left">Remarks</th>
                <th className="py-3 px-6 text-left">Profiles</th>
                <th className="py-3 px-6 text-left">Created Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {tutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    <img
                      src={tutor.profile_picture}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    {tutor.first_name} {tutor.last_name}
                  </td>
                  <td className="py-3 px-6 text-left">{tutor.email}</td>
                  <td className="py-3 px-6 text-left">Review</td>
                  <td className="py-3 px-6 text-left">{tutor.phone_number}</td>
                  <td className="py-3 px-6 text-left">Applications</td>
                  <td className="py-3 px-6 text-left">{tutor.remarks}</td>
                  <td className="py-3 px-6 text-left"></td>
                  <td className="py-3 px-6 text-left">
                    {UTCtoSGT(tutor.created_date)}
                  </td>

                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tutors;

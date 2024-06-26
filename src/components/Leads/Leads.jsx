import React, { useState, useEffect } from "react";
import getLeads from "./getLeads.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import axios from "axios";

const Leads = () => {
  const [leads, setLeads] = useState([]); //All leads
  const [isLead, setIsLead] = useState(false); //To open individual leads and edit
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📄");
  const [isApplications, setIsApplications] = useState(false);
  const [displayedLead, setDisplayedLead] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  //Change status of lead
  const handleChangeStatus = async (leadId, newStatus) => {
    try {
      const form = {
        status: newStatus,
      };

      const response = await axios.put(
        `https://kab0o0m.pythonanywhere.com/leads/${leadId}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`, //
          },
        }
      );
      //console.log(response);
      const updatedLeads = leads.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            status: newStatus,
          };
        }
        return lead;
      });

      const updatedDisplayLead = () => {
        displayedLead.status = newStatus
        return displayedLead
      }
       setLeads(updatedLeads);
      setDisplayedLead(updatedDisplayLead);
    } catch (error) {
      console.log(error);
    }
  };

  //Open up the lead using lead code, can edit the lead
  const seeLead = (leadDescription) => {
    setDescription(leadDescription);
    setIsLead(true);
  };

  //Open to see applications
  const openApplications = (lead) => {
    setDisplayedLead(lead);
    setIsApplications(true);
    //console.log(displayedLead)
  };

  //convert UTC to SGT time
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

  //Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };


  const countApplications = (applications) => {
    console.log(applications);
    const total = applications.length;
    let newCount = 0;
    let sent = 0;
    let pending = 0;
    
    for (let tutor of applications) {
        if (tutor.apply_status === "new") {
            newCount++;
        } else if (tutor.apply_status === "sent") {
            sent++;
        } else if (tutor.apply_status === "pending") {
            pending++;
        }
    }

    return (
      <div>
        <div className="">
          <span>{total} Applications</span>
        </div>
        <span className="text-orange-500">{"("}{newCount} New,</span>
        <span className="text-blue-500">{" "} {sent} Sent,</span>
        <br />
        <span className="text-red-500">{" "} {pending} Pending{")"}</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Assignments</h2>
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Code
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Client Name
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Client Number
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Status
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Applications
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Remarks
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Many Tutor Link
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Created Date
                </th>
                <th
                  className="py-3 px-6 text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  Last Reviewed Date
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td
                    className="py-3 px-3 text-center hover:underline hover:cursor-pointer"
                    onClick={() => seeLead(lead.description)}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {lead.code}
                  </td>
                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>{lead.client_name}</td>
                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>{lead.client_number}</td>
                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleChangeStatus(lead.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <option value="new_case">New Case</option>
                      <option value="tutors_sent">Tutors Sent</option>
                      <option value="tutors_needed">Tutors Needed</option>
                      <option value="closed">Closed</option>
                      <option value="activate_tuition_centres">
                        Activate Tuition Centres
                      </option>
                      <option value="premium_education">
                        Premium Education
                      </option>
                      <option value="issue_cases">Issue Cases</option>
                      <option value="follow_up_to_close">
                        Follow Up to Close
                      </option>
                      <option value="group_chats_created">
                        Group Chats Created
                      </option>
                      <option value="awaiting_confirmation">
                        Awaiting Confirmation
                      </option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </td>
                  <td
                    className="py-3 px-3 text-center hover:underline hover:cursor-pointer"
                    onClick={() => {
                      openApplications(lead);
                    }}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {countApplications(lead.tutors)}
                  </td>
                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>
                    {lead.many_tutor_link}
                  </td>

                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>{lead.remarks}</td>

                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>
                    {UTCtoSGT(lead.created_date)}
                  </td>
                  <td className="py-3 px-3 text-center" style={{ fontSize: "0.7rem" }}>
                    {UTCtoSGT(lead.last_reviewed_date)}
                  </td>

                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isLead && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Assignment Details</h1>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsLead(false);
                  setIcon("📄");
                }}
              >
                X
              </button>
            </div>
            <div className="mb-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={() => {
                  copyToClipboard();
                  setIcon("✔️");
                }}
              >
                {icon}
              </button>
            </div>
            <div className="mb-4">
              <textarea
                className="w-full h-96 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm text-gray-500"
                value={description}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md shadow-md hover:bg-blue-600">
                Edit Assignment
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
                onClick={() => {
                  setIsLead(false);
                  setIcon("📄");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isApplications && (
        <div className=" fixed z-10 inset-0 overflow-y-auto bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="m-10 bg-white p-6 rounded-lg" style={{ marginTop: '200px', 'width':'80rem' }}>
            <div className="bg-white text-lg font-bold py-4 px-6 rounded-t-lg w-full flex justify-between items-center border-b-2">
              <h1 className="text-2xl font-bold ml-2">Applications</h1>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsApplications(false);
                }}
              >
                X
              </button>
            </div>
            
            <div className="bg-white p-6 flex flex-col items-start">
              <textarea
                className="w-full h-96 p-2 text-sm text-gray-700"
                value={displayedLead.description}
              ></textarea>
              <p className="text-gray-700 text-sm mb-2 ml-2">
                Client Name: {displayedLead.client_name}
              </p>
              <p className="text-gray-700 text-sm mb-2 ml-2">
                Client Phone: {displayedLead.client_number}
              </p>
              <p className="text-gray-700 text-sm ml-2">
                Internal Remarks: {displayedLead.remarks}
              </p>
            </div>
            <table className="w-full mt-4 mb-4 text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm">
                  <th
                    className="py-2 px-4 text-center "
                    style={{ fontSize: "0.7rem" }}
                  >
                    NAME
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    PHONE NUMBER
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    RATES
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    REMARKS
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    TIMINGS
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    CURRENT OCCUPATION
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    STATUS
                  </th>
                  <th
                    className="py-2 px-4 text-center"
                    style={{ fontSize: "0.7rem" }}
                  >
                    PROFILES
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {displayedLead.tutors.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>
                      {tutor.tutor.first_name} {tutor.tutor.last_name}
                    </td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>{tutor.tutor.phone_number}</td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>{tutor.preferred_rate}</td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>{tutor.remarks}</td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>{tutor.timings}</td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>{tutor.tutor.current_occupation}</td>
                    <td className="py-3 px-1 text-center" style={{ fontSize: "0.7rem" }}>
                      <select
                        value={tutor.status}
                        
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="sent_profile">Sent Profile</option>
                        <option value="cmi">CMI</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-center" style={{ fontSize: "0.7rem" }}>Profiles</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              
              <button className="bg-green-400 text-white px-4 py-2 mr-2 rounded-md shadow-md hover:bg-green-600">
                Assignment Reviewed
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md shadow-md hover:bg-blue-600">
                Edit Assignment
              </button>
              <select
                value={displayedLead.status}
                onChange={(e) =>
                        handleChangeStatus(displayedLead.id, e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                 style={{ fontSize: "0.7rem" }}
              >
                <option value="new_case">New Case</option>
                <option value="tutors_sent">Tutors Sent</option>
                <option value="tutors_needed">Tutors Needed</option>
                <option value="closed">Closed</option>
                <option value="activate_tuition_centres">                    
                  Activate Tuition Centres
                  </option>
                <option value="premium_education">
                    Premium Education
                  </option>
                <option value="issue_cases">Issue Cases</option>
                <option value="follow_up_to_close">
                        Follow Up to Close
                  </option>
                <option value="group_chats_created">
                        Group Chats Created
                  </option>
                <option value="awaiting_confirmation">
                        Awaiting Confirmation
                  </option>
                <option value="incomplete">Incomplete</option>
              </select>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
                onClick={() => {
                  setIsApplications(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;

import React, { useState } from "react";
import axios from "axios";

const CreateLead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    client_name: "",
    client_number: "",
    remarks: "",
    many_tutor_link: "",
    description: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kab0o0m.pythonanywhere.com/leads/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`, // Include JWT token in the Authorization header
          },
        }
      );
      console.log("Lead Created", response);
      window.location.reload();
    } catch (error) {
      console.log("Error creating lead", error);
    }
    setIsOpen(false);
  };

  return (
    <div className="mb-5">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Create Assignment
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full flex">
                    <div className="mt-3 flex-grow text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Create New Lead
                      </h3>
                      <div className="mt-2">
                        <div className="mb-4">
                          <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Code
                          </label>
                          <input
                            type="text"
                            name="code"
                            id="code"
                            autoComplete="off"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-solid border-black-700 rounded-md h-12"
                            value={formData.code}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="client_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Client Name
                          </label>
                          <input
                            type="text"
                            name="client_name"
                            id="client_name"
                            autoComplete="off"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12"
                            value={formData.client_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="client_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Whatsapp Number
                          </label>
                          <input
                            type="text"
                            name="client_number"
                            id="client_number"
                            autoComplete="off"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12"
                            value={formData.client_number}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="remarks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Internal Remarks
                          </label>
                          <textarea
                            name="remarks"
                            id="remarks"
                            rows="3"
                            autoComplete="off"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={formData.remarks}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="many_tutor_link"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Many Tutor Link
                          </label>
                          <input
                            type="text"
                            name="many_tutor_link"
                            id="many_tutor_link"
                            autoComplete="off"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12"
                            value={formData.many_tutor_link}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows="3"
                            autoComplete="off"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLead;

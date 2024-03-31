import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("login") && !localStorage.getItem("exp")) {
      navigate("/");
    } else {
      const exp = localStorage.getItem("exp");
      console.log("current: ", Date.now() - new Date(exp).getTime());
      console.log("Expiry: ", new Date(exp).getTime());

      if (Date.now() - new Date(exp).getTime() > 0) {
        console.log("Token expired");
        localStorage.removeItem("login");
        localStorage.removeItem("exp");
        navigate("/");
      } else {
        setIsLogin(true);
      }
    }
  }, [navigate]);

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
    <div>
      <Navbar />
      {isLogin && (
        <form onSubmit={handleSubmit} className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Create New Assignment
        </h3>
        <div className="grid grid-cols-1 gap-y-6 mb-5">
          <div>
            <label htmlFor="description" className="block text-sm text-left font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              autoComplete="off"
              className="mt-1 p-4 h-96 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="remarks" className="mt-3 block text-left text-sm font-medium text-gray-700">Internal Remarks:</label>
            <textarea
              name="remarks"
              id="remarks"
              rows="3"
              autoComplete="off"
              required
              className="mt-1 p-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              value={formData.remarks}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="many_tutor_link" className="mt-3 block text-left text-sm font-medium text-gray-700">Many Tutor Link</label>
            <input
              type="text"
              name="many_tutor_link"
              id="many_tutor_link"
              autoComplete="off"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-12"
              value={formData.many_tutor_link}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="code" className="mt-3 block text-left text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              name="code"
              id="code"
              autoComplete="off"
              required
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-12"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="client_name" className="mt-3 block text-left  text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              name="client_name"
              id="client_name"
              autoComplete="off"
              required
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-12"
              value={formData.client_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="client_number" className="mt-3 block text-left  text-sm font-medium text-gray-700">Whatsapp Number</label>
            <input
              type="text"
              name="client_number"
              id="client_number"
              autoComplete="off"
              required
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-12"
              value={formData.client_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-5 sm:flex sm:flex-row">
          <button
            type="submit"
            className="w-full mt-5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create
          </button>
        </div>
      </form>
      
      )}
    </div>
  );
};

export default Homepage;

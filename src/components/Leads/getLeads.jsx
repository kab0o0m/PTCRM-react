import axios from "axios";

const getLeads = async () => {
  try {
    const response = await axios.get(
      "https://kab0o0m.pythonanywhere.com/leads/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`, // Include JWT token in the Authorization header
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching leads");
  }
};

export default getLeads;

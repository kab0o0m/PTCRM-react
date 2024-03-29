import axios from "axios";

const getLeads = async () => {
  try {
    const response = await axios.get(
      "https://kab0o0m.pythonanywhere.com/tutors/"
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching leads");
  }
};

export default getLeads;

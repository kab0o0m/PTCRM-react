import "./App.css";
import Homepage from "./components/Homepage/Homepage.jsx";
import Tutors from "./components/Tutors/Tutors.jsx";
import Leads from "./components/Leads/Leads.jsx";
import Login from "./components/Account/Login.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/tutors/" element={<Tutors />} />
          <Route path="/leads/" element={<Leads />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

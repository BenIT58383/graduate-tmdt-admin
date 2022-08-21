import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginFrom from "./components/login/login";
import ListFrom from "./components/view/ui";
import AddUser from "./components/view/user/service_cu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<ListFrom />} />
        <Route path="/" element={<LoginFrom />} />
        <Route path="/dashboard/user/add" element={<AddUser />} />
        <Route path="/dashboard/user/update/:id" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

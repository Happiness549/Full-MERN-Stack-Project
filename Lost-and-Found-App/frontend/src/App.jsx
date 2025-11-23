import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyItems from "./pages/MyItems";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes"; // new import
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/my-items" 
          element={
            <PrivateRoutes>
              <MyItems />
            </PrivateRoutes>
          } 
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyItems from "./pages/MyItems";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute"; // new import
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/my-items" 
          element={
            <PrivateRoute>
              <MyItems />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

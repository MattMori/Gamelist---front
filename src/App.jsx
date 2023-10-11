import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import './index.scss';
import GameDetail from "./pages/GameDetail/GameDetail";
 function App() {
  const [searchValue, setSearchValue] = useState("");

  
  return (
    <div className="App">
      <Header onSubmit={(inputValue) => setSearchValue(inputValue)} />
       <Routes>
        <Route path="/" element={<Home searchValueProp={searchValue} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/game/:id" element={<GameDetail />} />
              </Routes>
    </div>
  );
}

export default App;
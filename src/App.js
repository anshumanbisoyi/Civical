import { useState}from "react";
import './App.css';
import "./style.scss";
import "./media-query.css";
import Home from './pages/Home';
import Detail from "./pages/Detail";
import AddEdit from "./pages/AddEdit";
import { Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from './pages/About';
import NotFound from "./pages/NotFound";
import Header from './components/Header';


function App() {
  const [active, setActive]=useState("home");
  return (
    <div className="App">
    <Header setActive={setActive} active={active}/>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

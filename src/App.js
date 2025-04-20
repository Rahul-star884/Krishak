
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import SellingDetail from './pages/SellingDetail';
import MandiDetail from './pages/MandiDetail';
import WeatherDetail from './pages/WeatherDetail';
import ToolsDetail from './pages/ToolsDetail';
import SchemesDetail from './pages/SchemesDetail';
import AdviceDetail from './pages/AdviceDetail';
import CoursesDetail from './pages/CoursesDetail';
import TransportDetail from './pages/TransportDetail';


function App() {
  return (
    <Router> {/* Only here */}
      <Navbar />
      <Routes>
      <Route path="/services/selling" element={<SellingDetail />} />
        <Route path="/services/mandi" element={<MandiDetail />} />
        <Route path="/services/weather" element={<WeatherDetail />} />
        <Route path="/services/tools" element={<ToolsDetail />} />
        <Route path="/services/schemes" element={<SchemesDetail />} />
        <Route path="/services/advice" element={<AdviceDetail />} />
        <Route path="/services/courses" element={<CoursesDetail />} />
        <Route path="/services/transport" element={<TransportDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;




import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { NavBar } from './components/NavBar'; // Importing NavBar
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AddProject } from './components/addproject'; // Ensure this matches your file name

function App() {
  return (
    <Router> {/* Only one Router here */}
      <div className="App">
        {/* NavBar included without additional links */}
        <Routes>
          <Route path="/" element={
            <>
            <NavBar /> 
              <Banner />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/add-project" element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

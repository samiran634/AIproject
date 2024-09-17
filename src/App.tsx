import React from 'react';
import HomePage from './containers/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/index';
import Protectedpage from './components/navbar/pages/home';
import About from './components/navbar/pages/about';
import SignIn from './components/navbar/pages/signin';
import SignUp from './components/navbar/pages/signup';
import "./App.css"
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/home' element ={<Protectedpage/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

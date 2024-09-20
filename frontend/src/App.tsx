import React,{useState,useEffect} from 'react';
import Spinner from './containers/spinner';
import HomePage from './containers/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/index';
import Protectedpage from './components/navbar/pages/home';
import About from './components/navbar/pages/about';
import SignIn from './components/navbar/pages/signin';
import SignUp from './components/navbar/pages/signup';
import "./App.css"
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay to show the spinner
        setTimeout(() => {
            setLoading(false);
        }, 4000); // Adjust the delay as needed
    }, []);

    if (loading) {
        return <Spinner />;
    }
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

import React, { useState, useEffect } from 'react';

import Spinner from './containers/spinner';
import HomePage from './containers/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/index';
import Protectedpage from './components/navbar/pages/home';
import About from './components/navbar/pages/about';
import SignIn from './components/navbar/pages/signin';
import SignUp from './components/navbar/pages/signup';
const text = `Enhanced Accessibility: Automated scheduling and online counseling sessions can make counseling more accessible, especially for students who may hesitate to seek help. Automated notifications and reminders also help students remember appointments, reducing no-shows.
Data-Driven Personalization: By analyzing students’ academic performance, behavioral patterns, and feedback, counselors can gain a deeper understanding of each student's needs. Automation can provide counselors with real-time data insights, allowing for personalized advice and interventions, increasing the effectiveness of each session.

Administrative Efficiency: Automated systems can manage records, track student progress, and provide counselors with a unified view of each student's history. This saves counselors from time-consuming tasks, enabling them to focus more on meaningful interactions.

24/7 Resource Access: Through automated digital platforms, students can access resources like mental health materials, career guidance articles, or academic planning tools at any time. This encourages proactive help-seeking behavior, as students don’t have to wait for scheduled sessions to get answers or resources.

Early Intervention & Monitoring: Automated alerts can notify counselors about students at risk of issues like academic struggles, absenteeism, or mental health challenges. This proactive approach allows for early interventions that can make a critical difference in students' well-being and academic success.

Improved Follow-Up & Consistency: Automation helps counselors follow up on students more effectively, sending reminders or suggestions for continued progress. This consistency in support can help students feel more connected to their goals and progress.`
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
        <Route path="/" element={<HomePage/> } />
        <Route path='/home' element ={<Protectedpage/>}/>
        <Route path="/about" element={<About text={text}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

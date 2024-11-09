import React, { useState, useEffect } from 'react';

import Spinner from './containers/spinner';
import HomePage from './containers/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/index';
import UnProtectedPage from './components/navbar/pages/home';
import About from './components/navbar/pages/about';
import SignIn from './components/navbar/pages/signin';
import SignUp from './components/navbar/pages/signup';
const text = `Enhanced accessibility is one of the key benefits of automation in counseling, as automated scheduling and online counseling sessions can make services more reachable, particularly for students who may be hesitant to seek help. Automated notifications and reminders also play a significant role in helping students remember appointments, which reduces no-shows and ensures they receive the support they need.

With data-driven personalization, automation allows counselors to analyze students' academic performance, behavioral patterns, and feedback. This provides a deeper understanding of each student's needs and offers counselors real-time data insights for more tailored advice and interventions, enhancing the effectiveness of each session.

Administrative efficiency is greatly improved with automated systems that manage records, track student progress, and provide a unified view of each student’s history. This reduces the time counselors spend on administrative tasks and enables them to focus more on meaningful interactions with students.

Additionally, 24/7 access to resources is made possible through digital platforms, allowing students to access mental health materials, career guidance, or academic planning tools whenever they need. This encourages proactive help-seeking behavior, as students do not have to wait for scheduled sessions to obtain valuable information or resources.

Automation also supports early intervention and monitoring, with automated alerts notifying counselors about students who may be at risk for issues like academic struggles, absenteeism, or mental health challenges. This proactive approach allows for timely interventions that can make a critical difference in students’ well-being and academic success.

Finally, improved follow-up and consistency are facilitated by automation, which helps counselors keep in touch with students more effectively by sending reminders or suggestions to support continued progress. This consistent support fosters a stronger connection to their goals and promotes long-term progress for students.`
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
        <Route path="/home" element={<HomePage/> } />
        <Route path='/' element={<UnProtectedPage />} />
        <Route path="/about" element={<About text={text}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

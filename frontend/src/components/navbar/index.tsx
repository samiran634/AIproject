import { Link } from 'react-router-dom';
import { useUser,UserButton } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react'
import React from 'react';

const Navbar: React.FC = () => {
  const {  isSignedIn } = useAuth()
  console.log(useUser);
  if(!isSignedIn){
    return (
      <header className="heading d-flex align-center fixed top-0 left-0" style={{ background: 'linear-gradient(to right, #add8e6, #ffffff)' }}>
        <div className="heading-title-icon d-flex align-center">
          <h1 className="heading-title">
            <Link className="link" to="/">mr-counselor</Link>
          </h1>
        </div>
       
        <nav className="navigation">
          <ul className="list-non-bullet">
            <li className="list-item-inline">
              <Link to="/about" className="link cursor"> 
                About
              </Link>
            </li>
           
            <li className="list-item-inline">
              <Link to="/signUp" className="link cursor"> 
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  else {
  return (
    <header className="heading d-flex align-center fixed top-0 left-0" style={{ background: 'linear-gradient(to right, #add8e6, #ffffff)' }}>
      <div className="heading-title-icon d-flex align-center">
        <h1 className="heading-title">
          <Link className="link" to="/">mr-counselor</Link>
        </h1>
      </div>
     
      <nav className="navigation">
        <ul className="list-non-bullet">
  
         
       
          <li className="list-item-inline">
             <UserButton/>
          </li>
          <li className="list-item-inline">
            <Link to="/about" className="link cursor"> 
                About
              </Link>
          </li>
          <li className="list-item-inline">
            <Link to="/home" className="link cursor"> 
                Home
              </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
}

export default Navbar;

 
import Top from "../../../containers/homepage/topsecton";
import {   useUser, RedirectToSignIn } from '@clerk/clerk-react';

const ProtectedPage = () => {
  const { user } = useUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    
  <Top>
        <h1 className="product-container">This page was protected</h1>
      </Top>
 
  );
};

export default ProtectedPage;

import React, { ReactNode } from 'react';

interface HomePageProps {
  collegecard: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ collegecard }) => {
  return (
    <div>
      {collegecard}
    </div>
  );
};

export default HomePage; 
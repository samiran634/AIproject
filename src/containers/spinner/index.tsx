// Spinner.tsx
import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="loading"
            />
        </div>
    );
};

export default Spinner;

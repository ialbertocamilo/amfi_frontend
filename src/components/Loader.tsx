import React from 'react';
import './Loader.css';

interface LoaderProps {
    loading: boolean;
    children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
    if (loading) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        );
    }

    return <>{children}</>;
};

export default Loader;
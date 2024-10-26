import React from 'react';

interface ErrorProps {
    statusCode: number;
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
    return (
        <div>
            <h1>{statusCode}</h1>
            <p>Ocurrió un error en el servidor.</p>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
import React from 'react';

interface DividerProps {
    color?: string;
    thickness?: string;
    margin?: string;
}

const Divider: React.FC<DividerProps> = ({ color = 'gray', thickness = '0.3px', margin = '16px 0' }) => {
    return (
        <hr style={{ borderColor: color, borderWidth: thickness, margin }} />
    );
};

export default Divider;
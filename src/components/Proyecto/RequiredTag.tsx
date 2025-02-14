import React from 'react';
import { Tooltip } from 'react-tooltip';

const RequiredTag = () => {
  return (
    <>
      <span 
        className="text-red-500 cursor-help" 
        data-tooltip-id="required-tooltip"
        data-tooltip-content="Este campo es requerido"
      >
        *
      </span>
      <Tooltip id="required-tooltip" />
    </>
  );
};

export default RequiredTag;
// Tag.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TagStatusChecklist = ({ status }) => {
  // Define styles based on status
  const statusStyles = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
    DONE: 'bg-green-100 text-green-800 border-green-300',
  };

  // Ensure status is valid, default to PENDING if invalid
  const validStatus = Object.keys(statusStyles).includes(status) ? status : 'PENDING';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[validStatus]}`}
    >
      {validStatus.replace('_', ' ')}
    </span>
  );
};

TagStatusChecklist.propTypes = {
  status: PropTypes.oneOf(['PENDING', 'IN_PROGRESS', 'DONE']).isRequired,
};

export default TagStatusChecklist;
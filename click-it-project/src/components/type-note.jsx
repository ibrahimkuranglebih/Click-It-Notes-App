// type-note.jsx
import React from 'react';
import { getTaskTypeStyle } from '@/utils/taskTypeStyles';

const NoteType = ({ taskType }) => {
  return (
    <p className={`text-sm px-2 py-1 rounded-xl w-fit ${getTaskTypeStyle(taskType)}`}>
      {taskType}
    </p>
  );
};

export default NoteType;
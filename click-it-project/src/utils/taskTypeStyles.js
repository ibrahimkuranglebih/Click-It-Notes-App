export const getTaskTypeStyle = (taskType) => {
  const typeStyles = {
    WORK: 'bg-green-300 text-green-800',
    STUDY: 'bg-yellow-300 text-yellow-800',
    EVENT: 'bg-cyan-300 text-cyan-800',
    TASK: 'bg-red-300 text-red-800',
    OTHERS: 'bg-blue-300 text-blue-800'
  };

  // Convert taskType to uppercase to match enum keys
  const upperType = taskType?.toUpperCase();
  return typeStyles[upperType] || typeStyles.OTHERS;
};
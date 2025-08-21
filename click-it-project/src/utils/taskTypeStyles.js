export const getTaskTypeStyle = (taskType) => {
  const typeStyles = {
    WORK: 'bg-green-300',
    STUDY: 'bg-yellow-300',
    EVENT: 'bg-cyan-300',
    TASK: 'bg-red-300',
    OTHERS: 'bg-blue-300 '
  };

  // Convert taskType to uppercase to match enum keys
  const upperType = taskType?.toUpperCase();
  return typeStyles[upperType] || typeStyles.OTHERS;
};
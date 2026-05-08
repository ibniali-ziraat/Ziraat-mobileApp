export const generateId = (): string => {
  const timestamp = Date.now().toString(36); // base36 makes it shorter
  const random = Math.floor(Math.random() * 1000000).toString(36);
  return `${timestamp}-${random}`;
};

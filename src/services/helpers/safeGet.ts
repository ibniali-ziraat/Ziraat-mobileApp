export const safeGet = async (promise) => {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return null; // ⬅ IMPORTANT
    }
    throw err; // other errors still matter
  }
};

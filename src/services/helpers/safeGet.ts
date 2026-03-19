// export const safeGet = async (promise) => {
//   try {
//     const res = await promise;
//     return res.data;
//   } catch (err) {
//     if (err.response?.status === 404) {
//       return null; // ⬅ IMPORTANT
//     }
//     throw err; // other errors still matter
//   }
// };
export const safeGet = async (promise) => {
  try {
    const res = await promise;
    // Some APIs return a 200/204 with no body.
    // If res.data doesn't exist, return the whole res or an empty object.
    return res?.data !== undefined ? res.data : res;
  } catch (err) {
    // 404 is common for "Empty List", so returning null/[] is fine
    if (err.response?.status === 404) {
      return null;
    }
    // For 400/500, we THROW so that useMutation knows the call failed
    throw err;
  }
};

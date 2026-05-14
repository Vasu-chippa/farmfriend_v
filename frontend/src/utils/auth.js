import API from "../api";

// Fetch current user from server (reads auth cookie)
export const fetchCurrentUser = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data.user || null;
  } catch (err) {
    return null;
  }
};

// Logout by clearing cookie on server
export const logout = async () => {
  try {
    await API.post("/auth/logout");
    return true;
  } catch (err) {
    return false;
  }
};

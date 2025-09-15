// utils/auth.js

// ✅ Save auth data in localStorage
export const setAuth = (token, user) => {
  localStorage.setItem("ff_token", token);
  localStorage.setItem(
    "ff_user",
    JSON.stringify({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    })
  );
};

// ✅ Get token
export const getToken = () => localStorage.getItem("ff_token");

// ✅ Get user
export const getUser = () => {
  const user = localStorage.getItem("ff_user");
  return user ? JSON.parse(user) : null;
};

// ✅ Get role
export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

// ✅ Check if authenticated
export const isAuthenticated = () => !!getToken();

// ✅ Clear auth (logout)
export const clearAuth = () => {
  localStorage.removeItem("ff_token");
  localStorage.removeItem("ff_user");
};

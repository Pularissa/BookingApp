// Services/authService.js

export const authService = {
  login: async (form) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Backend returns { token: "...", role: "..." }
        if (data.token) {
          localStorage.setItem("token", data.token);   // FIX: was data.jwtToken
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", form.username);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Connection Refused:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    return localStorage.getItem("username");
  },

  getUserRole: () => {
    return localStorage.getItem("role") || "USER";
  }
};
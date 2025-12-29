// src/api.js
import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const API = axios.create({
  baseURL: isLocal 
    ? "http://localhost:5001/api" 
    : (process.env.REACT_APP_API_URL || "https://acvora-07fo.onrender.com") + "/api"
});

export const saveStudent = async (studentData) => {
  try {
    const response = await API.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error saving student:", error);
    throw error;
  }
};

// Update this to fetch from /signup, which maps to your 'signups' collection
export const getStudents = async () => {
  try {
    const response = await API.get("/signup"); // Maps to app.use("/api/signup", signupRoutes)
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};
export const getCounsellings = async () => {
  try {
    const response = await API.get("/counselling");
    /** * FIXED: Your backend sends { success: true, data: [...] }
     * We must access response.data.data
     */
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching counselling:", error);
    return [];
  }
};

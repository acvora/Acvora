// src/api.js
import axios from "axios";

// 1. Correctly define the isLocal check first
const isLocal = window.location.hostname === "localhost";

// 2. Use isLocal to set the baseURL
const API = axios.create({
  // Backend port is 5001 as defined in your index.js
  baseURL: isLocal
    ? "http://localhost:5001/api"
    : (process.env.REACT_APP_API_URL || "https://acvora-07fo.onrender.com") +
      "/api",
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

// Fetch all registered universities
export const getUniversities = async () => {
  try {
    const response = await API.get("/universities");
    return response.data; // Expected { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching universities:", error);
    return { success: false, data: [] };
  }
};

// Update university administrative status (Approve/Hold/Block)
export const updateUniversityStatus = async (id, status) => {
  try {
    const response = await API.patch(`/universities/status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const getStandaloneCourses = async () => {
  try {
    const response = await API.get("/courses"); // Hits router.get("/", getCourses)
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching standalone courses:", error);
    return [];
  }
};

// src/api.js
import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const getBaseURL = () => {
  if (isLocal) return "http://localhost:5001/api"; // Matches index.js port
  
  // Cleanly handle the environment variable to prevent /api/api
  let envURL = process.env.REACT_APP_API_URL || "https://acvora-07fo.onrender.com";
  envURL = envURL.replace(/\/$/, ""); // Remove trailing slash
  
  // If the variable doesn't have /api, add it
  return envURL.endsWith("/api") ? envURL : `${envURL}/api`;
};

const API = axios.create({
  baseURL: getBaseURL()
});

/* --- Updated Fetch Functions --- */

export const getStudents = async () => {
  try {
    const response = await API.get("/signup"); // Hits /api/signup
    // signup.js returns the array directly
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching signups:", error);
    return []; // Returns empty array on 404, causing "0" in dashboard
  }
};
/* --- API Functions --- */

export const saveStudent = async (studentData) => {
  try {
    // Hits /api/students
    const response = await API.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error saving student:", error);
    throw error;
  }
};

export const getCounsellings = async () => {
  try {
    // Hits /api/counselling
    const response = await API.get("/counselling");
    // Access response.data.data per your controller structure
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching counselling:", error);
    return [];
  }
};

export const getUniversities = async () => {
  try {
    // Hits /api/universities
    const response = await API.get("/universities");
    return response.data; // Expected { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching universities:", error);
    return { success: false, data: [] };
  }
};

export const updateUniversityStatus = async (id, status) => {
  try {
    // Hits /api/universities/status/:id
    const response = await API.patch(`/universities/status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const getStandaloneCourses = async () => {
  try {
    // Hits /api/courses
    const response = await API.get("/courses");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching standalone courses:", error);
    return [];
  }
};

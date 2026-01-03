// src/api.js
import axios from "axios";

// 1. Define the environment check
const isLocal = window.location.hostname === "localhost";

// 2. Clean URL construction to avoid double "/api/api"
const getBaseURL = () => {
  if (isLocal) return "http://localhost:5001/api";
  
  // Get the base URL from env or fallback to Render
  const envURL = process.env.REACT_APP_API_URL || "https://acvora-07fo.onrender.com";
  
  // Ensure we don't double up if the env variable already includes /api
  return envURL.endsWith("/api") ? envURL : `${envURL}/api`;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

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

export const getStudents = async () => {
  try {
    const response = await API.get("/signup"); //
    // If the backend returns an array directly, return it.
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
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

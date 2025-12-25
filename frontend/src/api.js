// src/api.js
import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const API = axios.create({
  baseURL: isLocal 
    ? "http://localhost:5001/api" 
    : (process.env.REACT_APP_API_URL || "https://acvora-07fo.onrender.com") + "/api"
});

// Function to save a student
export const saveStudent = async (studentData) => {
  try {
    const response = await API.post("/students", studentData);
    return response.data; // { message: "Student saved successfully!" }
  } catch (error) {
    console.error("Error saving student:", error);
    throw error;
  }
};

// Function to get all students
export const getStudents = async () => {
  try {
    const response = await API.get("/students");
    return response.data; // Array of students
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

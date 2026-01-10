// src/pages/StudentSignup.jsx
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";
import styles from "./StudentSignup.module.css"; // Import CSS module

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    documents: null,
    scholarshipDoc: null,
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setInfo("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Auth Signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2️⃣ Upload files (optional)
      let documentUrl = "";
      let scholarshipUrl = "";

      if (formData.documents) {
        const docRef = ref(
          storage,
          `students/${user.uid}/documents_${Date.now()}`
        );
        await uploadBytes(docRef, formData.documents);
        documentUrl = await getDownloadURL(docRef);
      }

      if (formData.scholarshipDoc) {
        const schRef = ref(
          storage,
          `students/${user.uid}/scholarship_${Date.now()}`
        );
        await uploadBytes(schRef, formData.scholarshipDoc);
        scholarshipUrl = await getDownloadURL(schRef);
      }

      // 3️⃣ Save profile to Firestore
      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        pincode: formData.pincode,
        documentUrl,
        scholarshipUrl,
        createdAt: new Date(),
      });

      // 4️⃣ MongoDB sync
      await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          firebaseId: user.uid,
          address: formData.address,
          pincode: formData.pincode,
        }),
      });

      setInfo("✅ Student signed up successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        pincode: "",
        documents: null,
        scholarshipDoc: null,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      setErr(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.gridContainer}>
          
          {/* Left welcome panel */}
          <div className={styles.leftPanel}>
            <div className={styles.leftGradient} />
            <div className={styles.leftContent}>
              <div className={styles.iconContainer}>
                <svg className={styles.welcomeIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className={styles.welcomeTitle}>Create your student account</h1>
              <p className={styles.welcomeDescription}>
                Sign up to manage your applications, upload documents, and access personalized counselling resources.
              </p>
            </div>
          </div>

          {/* Right form card */}
          <div className={styles.rightCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.formTitle}>Student Signup</h2>
              <p className={styles.formSubtitle}>
                Enter your details to get started. Fields marked with an asterisk (*) are required.
              </p>
            </div>

            {err && (
              <div className={styles.errorAlert}>
                {err}
              </div>
            )}
            {info && (
              <div className={styles.infoAlert}>
                {info}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGrid1}>
                <FormInput label="Full Name *" name="name" value={formData.name} onChange={handleChange} required />
                <FormInput label="Mobile No. *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className={styles.inputGrid2}>
                <FormInput label="Email ID *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <FormInput label="Password *" name="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              <FormInput label="Address *" name="address" value={formData.address} onChange={handleChange} required />
              <FormInput label="Pincode *" name="pincode" value={formData.pincode} onChange={handleChange} required />

              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? "Submitting..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSignup;
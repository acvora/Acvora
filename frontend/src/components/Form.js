import React, { useState } from "react";
import Axios from "axios";
import SelectCountry from "./SelectCountry";
import "./Form.css";

const CompactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    zip: "",
    country: "",
    qualification: "",
    stream: "",
    course: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const sendData = (e) => {
    e.preventDefault();
    Axios.post("https://acvora-07fo.onrender.com/get-more-college-options", formData)
      .then(() => {
        showToast("Form submitted successfully!", "success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          state: "",
          zip: "",
          country: "",
          qualification: "",
          stream: "",
          course: "",
        });
      })
      .catch(() => {
        showToast("Something went wrong. Please try again.", "error");
      });
  };

  return (
    <section className="cf-section">
      <div className="cf-container">
        
        {/* Left Illustration */}
        <div className="cf-left">
          <div className="cf-art">
            <div className="cf-art-text">
              <h3>More college matches for you</h3>
              <p>Enter your details and we'll suggest relevant colleges &amp; courses.</p>
            </div>

            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop&crop=face" 
              alt="College campus illustration for more matches" 
              className="cf-image" 
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="cf-right">
          <form onSubmit={sendData} className="cf-form" noValidate>
            
            {/* Name */}
            <div className="cf-field">
              <label className="cf-label">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Full name"
                required
                className="cf-input"
              />
            </div>

            {/* Email + Contact */}
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@mail.com"
                  required
                  className="cf-input"
                />
              </div>

              <div className="cf-field">
                <label className="cf-label">Contact</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  type="tel"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  required
                  className="cf-input"
                />
              </div>
            </div>

            {/* Qualification + Stream */}
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">Qualification</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  className="cf-select"
                >
                  <option value="">Select</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="cf-field">
                <label className="cf-label">Stream</label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  required
                  className="cf-select"
                >
                  <option value="">Select</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Course */}
            <div className="cf-field">
              <label className="cf-label">Course Preference</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="cf-select"
              >
                <option value="">Select course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="MBBS">MBBS</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Country + ZIP */}
            <div className="cf-row">
              <div className="cf-field cf-country-field">
                <label className="cf-label">Country</label>
                <SelectCountry
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, country: e.target.value }))
                  }
                  className="cf-country-select"
                />
              </div>

              <div className="cf-field">
                <label className="cf-label">ZIP</label>
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  type="text"
                  placeholder="123456"
                  className="cf-input"
                />
              </div>
            </div>

            <button type="submit" className="cf-submit">Get Options</button>
          </form>
        </div>
      </div>

      {/* Toast Message */}
      {toast.show && (
        <div className={`cf-toast ${toast.type === "success" ? "cf-toast-success" : "cf-toast-error"}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
};

export default CompactForm;
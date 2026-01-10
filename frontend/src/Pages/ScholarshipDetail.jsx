// src/Pages/ScholarshipDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ScholarshipDetail.css";

const API_BASE = "https://acvora-07fo.onrender.com/api";

export default function ScholarshipDetail() {
  const { id } = useParams();
  const location = useLocation();
  const passedScholarship = location.state?.scholarship;
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (passedScholarship) {
      setScholarship(passedScholarship);
      setLoading(false);
    } else {
      setError("Scholarship data not found.");
      setLoading(false);
    }
  }, [passedScholarship]);

  if (loading) return <div className="scholar-detail-loading">Loading scholarship details...</div>;
  if (error) return <div className="scholar-detail-error">{error}</div>;
  if (!scholarship) return null;

  const {
    name,
    provider,
    category,
    educationLevel,
    income,
    benefits,
    deadline,
    status,
    description,
    eligibility,
    type,
    region,
    tags,
  } = scholarship;

  return (
    <div className="scholar-detail-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="scholar-detail-container"
      >
        <div className="scholar-detail-header">
          <Link to="/scholarship" className="scholar-back-link">
            Back to Scholarships
          </Link>

          <h1 className="scholar-detail-title">{name}</h1>
          <p className="scholar-detail-subtitle">
            Provided by {provider}
          </p>
        </div>

        <div className="scholar-detail-body">
          <div className="scholar-detail-grid">
            <Info label="Category" value={category} />
            <Info label="Education Level" value={educationLevel} />
            <Info label="Income Limit" value={income} />
            <Info label="Benefits" value={benefits} />
            <Info label="Region" value={region} />
            <Info label="Type" value={type} />
            <Info label="Deadline" value={deadline} />
            <Info label="Status" value={status} />
          </div>

          <Section title="Description" iconColor="#10b981">
            <p>{description || "No description available."}</p>
          </Section>

          <Section title="Eligibility" iconColor="#3b82f6">
            <p>{eligibility || "Eligibility not mentioned."}</p>
          </Section>

          {tags?.length > 0 && (
            <Section title="Tags" iconColor="#f59e0b">
              <div className="scholar-tags">
                {tags.map((t, i) => (
                  <span key={i} className="scholar-tag">{t}</span>
                ))}
              </div>
            </Section>
          )}

          <div className="scholar-detail-actions">
            <button className="scholar-apply-btn">Apply Now</button>
            <button className="scholar-counselling-btn">Get Counselling</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="scholar-detail-item">
      <span className="label">{label}</span>
      <span className="value">{value || "—"}</span>
    </div>
  );
}

function Section({ title, children, iconColor }) {
  return (
    <div className="scholar-detail-section">
      <div className="scholar-detail-section-header">
        <div 
          className="scholar-detail-section-icon" 
          style={{ backgroundColor: iconColor }} 
        />
        <h3>{title}</h3>
      </div>
      <div className="scholar-detail-section-content">
        {children}
      </div>
    </div>
  );
}
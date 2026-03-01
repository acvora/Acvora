import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfileForm.css";

export default function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "https://acvora-07fo.onrender.com";

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  /* ---------------------------------------------------
     FETCH & NORMALIZE UNIVERSITY DATA
  --------------------------------------------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;

        const res = await fetch(`${baseUrl}/api/universities/${id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");

        const json = await res.json();
        const uni = json.data || json;

        setProfile(uni);

        // 🔥 Normalize arrays → strings for inputs
        setFormData({
          ...uni,
          accreditation: uni.accreditations?.join(", ") || "",
          affiliation: uni.affiliations?.join(", ") || "",
          modeOfEducation: uni.modeOfEducation?.join(", ") || "",
          facilities: uni.facilities || [],
          branches: uni.branches || [],
        });
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  /* ---------------------------------------------------
     HANDLE INPUT CHANGE
  --------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------------------------------------------
     UPDATE PROFILE (PUT)
  --------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔁 Convert strings → arrays for backend
      const payload = {
        ...formData,
        accreditations: formData.accreditation
          ? formData.accreditation.split(",").map((a) => a.trim())
          : [],
        affiliations: formData.affiliation
          ? formData.affiliation.split(",").map((a) => a.trim())
          : [],
        modeOfEducation: formData.modeOfEducation
          ? formData.modeOfEducation.split(",").map((m) => m.trim())
          : [],
      };

      delete payload.accreditation;
      delete payload.affiliation;

      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedJson = await res.json();
      const updatedUni = updatedJson.data || updatedJson;

      setProfile(updatedUni);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("❌ Update failed!");
    }
  };

  /* ---------------------------------------------------
     DELETE PROFILE
  --------------------------------------------------- */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this university?")) return;

    try {
      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("🗑 University deleted!");
      navigate("/");
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Delete failed!");
    }
  };

  if (!profile) {
    return <p className="loading-text">Loading profile...</p>;
  }

  /* ---------------------------------------------------
     UI
  --------------------------------------------------- */
  return (
    <div className="profile-container">
      <h2 className="profile-title">University Profile</h2>

      <div className="profile-actions">
        {editing ? (
          <button className="btn save-btn" onClick={handleSubmit}>Save</button>
        ) : (
          <button className="btn edit-btn" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>

        {/* BASIC INFO */}
        <section>
          <h3>Basic Info</h3>
          <input name="instituteName" value={formData.instituteName || ""} onChange={handleChange} disabled={!editing} />
          <input name="type" value={formData.type || ""} onChange={handleChange} disabled={!editing} />
          <input name="year" value={formData.year || ""} onChange={handleChange} disabled={!editing} />
          <input name="ownership" value={formData.ownership || ""} onChange={handleChange} disabled={!editing} />
          <input name="accreditation" value={formData.accreditation || ""} onChange={handleChange} disabled={!editing} />
          <input name="affiliation" value={formData.affiliation || ""} onChange={handleChange} disabled={!editing} />
          <input name="students" value={formData.students || ""} onChange={handleChange} disabled={!editing} />
          <input name="faculty" value={formData.faculty || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* CONTACT */}
        <section>
          <h3>Contact</h3>
          <input name="address" value={formData.address || ""} onChange={handleChange} disabled={!editing} />
          <input name="city" value={formData.city || ""} onChange={handleChange} disabled={!editing} />
          <input name="state" value={formData.state || ""} onChange={handleChange} disabled={!editing} />
          <input name="email" value={formData.email || ""} onChange={handleChange} disabled={!editing} />
          <input name="phone" value={formData.phone || ""} onChange={handleChange} disabled={!editing} />
          <input name="website" value={formData.website || ""} onChange={handleChange} disabled={!editing} />
          <input name="socialMedia" value={formData.socialMedia || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* PLACEMENTS */}
        <section>
          <h3>Placements</h3>
          <input name="placementRate" value={formData.placementRate || ""} onChange={handleChange} disabled={!editing} />
          <input name="highestPackage" value={formData.highestPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="avgPackage" value={formData.avgPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="topRecruiters" value={formData.topRecruiters || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* FACILITIES */}
        <section>
          <h3>Facilities</h3>
          {formData.facilities?.length ? (
            formData.facilities.map((f, i) => (
              <div key={i} className="facility-item">
                <strong>{f.name}</strong>
                {editing ? (
                  <input
                    value={f.description || ""}
                    onChange={(e) => {
                      const updated = [...formData.facilities];
                      updated[i].description = e.target.value;
                      setFormData({ ...formData, facilities: updated });
                    }}
                  />
                ) : (
                  <span>{f.description}</span>
                )}
              </div>
            ))
          ) : (
            <p>No facilities listed</p>
          )}
        </section>

        {/* INTERNATIONAL */}
        <section>
          <h3>International</h3>
          <input name="intlStudentOffice" value={formData.intlStudentOffice || ""} onChange={handleChange} disabled={!editing} />
          <input name="countriesEnrolled" value={formData.countriesEnrolled || ""} onChange={handleChange} disabled={!editing} />
          <input name="foreignMoUs" value={formData.foreignMoUs || ""} onChange={handleChange} disabled={!editing} />
          <input name="languageSupport" value={formData.languageSupport || ""} onChange={handleChange} disabled={!editing} />
          <input name="visaSupport" value={formData.visaSupport || ""} onChange={handleChange} disabled={!editing} />
        </section>

      </form>
    </div>
  );
}

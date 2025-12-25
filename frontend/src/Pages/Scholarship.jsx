// Pages/Scholarship.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Scholarship.css";
import Navbar from "../components/Navbar";

const API_BASE = "https://acvora-07fo.onrender.com/api"; // your Render base URL

/* ---------------- Search Bar ---------------- */
function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="scholar-search-bar">
      <div className="scholar-search-container">
        <div className="scholar-search-brand">🎓 ScholarFind</div>
        <div className="scholar-search-input-group">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
            placeholder="Search scholarship, provider, tags or description..."
            className="scholar-search-input"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onSearch(q)}
            className="scholar-search-button"
          >
            Search
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar Filters ---------------- */
function SidebarFilterLeft({ values, onChange }) {
  return (
    <div className="scholar-filter-sidebar">
      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">State</h4>
        <select
          className="scholar-filter-select"
          value={values.region}
          onChange={(e) => onChange({ region: e.target.value })}
        >
          <option value="">Select State</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Delhi</option>
          <option>Tamil Nadu</option>
        </select>
      </div>

      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Category</h4>
        <select
          className="scholar-filter-select"
          value={values.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>SC/ST</option>
          <option>SC</option>
          <option>ST</option>
          <option>OBC</option>
          <option>General</option>
          <option>Minority</option>
        </select>
      </div>

      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Level</h4>
        <select
          className="scholar-filter-select"
          value={values.educationLevel}
          onChange={(e) => onChange({ educationLevel: e.target.value })}
        >
          <option value="">Select Level</option>
          <option>10th Pass</option>
          <option>12th Pass</option>
          <option>UG</option>
          <option>PG</option>
          <option>PhD</option>
        </select>
      </div>

      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Type</h4>
        <select
          className="scholar-filter-select"
          value={values.type}
          onChange={(e) => onChange({ type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option>Merit</option>
          <option>Need</option>
          <option>Government</option>
          <option>Private</option>
        </select>
      </div>

      <div className="scholar-filter-group">
        <h4 className="scholar-filter-title">Status</h4>
        <select
          className="scholar-filter-select"
          value={values.status}
          onChange={(e) => onChange({ status: e.target.value })}
        >
          <option value="">Any</option>
          <option>Open</option>
          <option>Upcoming</option>
          <option>Closed</option>
        </select>
      </div>
    </div>
  );
}

/* ---------------- Scholarship Card ---------------- */
function ScholarshipCard({ data, user, onToggleSave, savedScholarships }) {
  const {
    _id,
    name,
    provider,
    deadline,
    status,
    universityId,
    category,
    income,
    educationLevel,
    benefits,
    type,
    region,
    generalQuota,
    tags,
  } = data;

  const instituteName =
    (universityId && (universityId.instituteName || universityId.name)) ||
    data.universityName ||
    "Unknown University";

  const location =
    (universityId && (universityId.city || universityId.region)) ||
    region ||
    data.location ||
    "India";

  const logo =
    (universityId && Array.isArray(universityId.logo) ? universityId.logo[0] : undefined) ||
    (Array.isArray(data.logo) ? data.logo[0] : undefined);

  const program = category || data.program || "—";

  const saved = savedScholarships.some((id) => id.toString() === (_id || "").toString());

  const toggleSave = async () => {
    if (!user?.userId) {
      alert("Please log in to save scholarships.");
      return;
    }
    try {
      const method = saved ? "DELETE" : "POST";
      const res = await fetch(`${API_BASE}/savedScholarships/${user.userId}/${_id}`, { method });
      if (!res.ok) throw new Error("Failed to update saved scholarships");
      onToggleSave(_id, !saved);
    } catch (err) {
      console.error(err);
      alert("Error updating saved scholarships.");
    }
  };

  const fmtDate = (d) => {
    if (!d) return "N/A";
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="scholar-card"
    >
      <button className={`scholar-save-btn ${saved ? "saved" : ""}`} onClick={toggleSave} title={saved ? "Remove from Saved" : "Save Scholarship"}>
        {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      </button>

      <div className="scholar-card-uni">
        {logo ? (
          <img src={logo} alt={instituteName} className="scholar-card-uni-logo" />
        ) : (
          <div className="scholar-card-uni-placeholder">🏛️</div>
        )}
        <div className="scholar-card-uni-info">
          <h4 className="scholar-card-uni-name">{instituteName}</h4>
          <p className="scholar-card-uni-location">{location}</p>
        </div>
      </div>

      <div className="scholar-card-content">
        <h3 className="scholar-card-title">{name}</h3>
        <p className="scholar-card-provider"><strong>Provider:</strong> {provider}</p>

        <p className="scholar-card-meta">
          <strong>Deadline:</strong> {fmtDate(deadline)} • <strong>Status:</strong> {status || "Open"}
        </p>

        <p className="scholar-card-small"><strong>Category:</strong> {category || "—"} • <strong>Level:</strong> {educationLevel || "—"}</p>

        <p className="scholar-card-small"><strong>Income:</strong> {income || "—"} • <strong>Benefits:</strong> {benefits || "—"}</p>
      </div>

      <div className="scholar-card-footer">
        <div className={`scholar-status ${status?.toLowerCase()}`}>{status || "Open"}</div>
        <div className="scholar-card-actions">
          <button className="scholar-card-button counselling">Get Counselling</button>
          <Link to={`/scholarship/${_id}`} className="scholar-card-button explore">Explore Now</Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Component ---------------- */
export default function Scholarship() {
  const [scholarships, setScholarships] = useState([]);
  const [savedScholarships, setSavedScholarships] = useState([]); // user saved IDs
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    category: "",
    educationLevel: "",
    type: "",
    mode: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Upcoming");

  const user = {
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  // Fetch both sources and merge
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [uniRes, adminRes] = await Promise.all([
          fetch(`${API_BASE}/scholarships`).catch((e) => null),
          fetch(`${API_BASE}/adminscholar`).catch((e) => null),
        ]);

        const uniData = uniRes && uniRes.ok ? await uniRes.json() : [];
        // uni endpoint may return array directly or { scholarships: [...] }
        const uniList = Array.isArray(uniData) ? uniData : (uniData?.scholarships || uniData?.data || uniData || []);

        const adminDataRaw = adminRes && adminRes.ok ? await adminRes.json() : null;
        const adminList = Array.isArray(adminDataRaw?.data)
          ? adminDataRaw.data
          : [];

        // Normalize entries to consistent shape
        const normalize = (item, source) => {
          if (source === "admin") {
            return {
              _id: item._id,
              name: item.name,
              provider: item.provider,
              category: item.category || "",
              income: item.incomeLimitMax || "",
              educationLevel: item.educationLevel || item.level || "",
              benefits: item.benefits || item.otherBenefits || "",
              deadline: item.deadline || item.endDate || null,
              status: item.status || "Active",
              description: item.description || "",
              eligibility: item.eligibility || "",
              type: Array.isArray(item.type) ? item.type.join(", ") : item.type || "",
              region: item.region || item.state || "",
              generalQuota: item.generalQuota || "",
              tags: Array.isArray(item.tags) ? item.tags : [],
              universityId: null,
              universityName: item.provider || "Admin Scholarship",
              logo: [],
              rawSource: source,
              raw: item,
            };
          } else {
            return {
              _id: item._id || item.id || undefined,
              name: item.name || item.title || item.scholarshipName || "Unnamed",
              provider: item.provider || item.providerName || item.source || "Unknown Provider",
              category: item.category || item.stream || "",
              income: item.income || item.familyIncome || "",
              educationLevel: item.educationLevel || item.level || "",
              benefits: item.benefits || item.amount || "",
              deadline: item.deadline || item.date || item.lastDate || null,
              status: item.status || (item.deadline ? (new Date(item.deadline) > new Date() ? "Open" : "Closed") : "Open"),
              description: item.description || item.desc || "",
              eligibility: item.eligibility || "",
              type: item.type || "",
              region: item.region || item.state || item.location || "",
              generalQuota: item.generalQuota || item.quota || "",
              tags: Array.isArray(item.tags) ? item.tags : (item.tags ? [item.tags] : []),
              universityId: item.universityId || item.university || item.universityObj || null,
              universityName: item.universityName || (item.universityObj && (item.universityObj.instituteName || item.universityObj.name)) || "",
              logo: Array.isArray(item.logo) ? item.logo : (item.logo ? [item.logo] : []),
              rawSource: source,
              raw: item,
            };
          }
        };

        const normUni = (Array.isArray(uniList) ? uniList : []).map((i) => normalize(i, "university"));
        const normAdmin = (Array.isArray(adminList) ? adminList : []).map((i) => normalize(i, "admin"));

        // Merge and deduplicate: prefer real _id from DB else fallback by name+provider
        const map = new Map();
        const getKey = (it) => it._id || `${(it.name||"").toLowerCase()}::${(it.provider||"").toLowerCase()}`;

        [...normUni, ...normAdmin].forEach((it) => {
          const key = getKey(it);
          if (!map.has(key)) map.set(key, it);
          else {
            // merge fields preferring existing values but combine tags and logos
            const prev = map.get(key);
            const merged = {
              ...prev,
              ...it,
              tags: Array.from(new Set([...(prev.tags||[]), ...(it.tags||[])])),
              logo: Array.from(new Set([...(prev.logo||[]), ...(it.logo||[])])),
            };
            map.set(key, merged);
          }
        });

        const mergedList = Array.from(map.values());
        setScholarships(mergedList);
      } catch (err) {
        console.error("fetchAll error:", err);
        setError(err.message || "Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // fetch saved list
  useEffect(() => {
    const fetchSaved = async () => {
      if (!user?.userId) return;
      try {
        const res = await fetch(`${API_BASE}/savedScholarships/${user.userId}`);
        if (!res.ok) throw new Error("Failed to fetch saved scholarships");
        const json = await res.json();
        // endpoint might return { savedScholarships: [...] } or an array
        const arr = json?.savedScholarships || json?.saved || json || [];
        // normalize to array of ids
        const ids = (Array.isArray(arr) ? arr : []).map((s) => (typeof s === "string" ? s : (s._id || s.id)));
        setSavedScholarships(ids);
      } catch (err) {
        console.error("fetchSaved error:", err);
      }
    };
    fetchSaved();
  }, [user?.userId]);

  const handleToggleSave = (scholarshipId, isSaved) => {
    if (isSaved) setSavedScholarships((p) => [...p, scholarshipId]);
    else setSavedScholarships((p) => p.filter((id) => id.toString() !== scholarshipId.toString()));
  };

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return scholarships.filter((s) => {
      const name = (s.name || "").toLowerCase();
      const provider = (s.provider || "").toLowerCase();
      const description = (s.description || "").toLowerCase();
      const tags = (s.tags || []).map((t) => (t || "").toLowerCase());
      const status = (s.status || "").toLowerCase();
      if (q && !(name.includes(q) || provider.includes(q) || description.includes(q) || tags.some((t) => t.includes(q)))) return false;
      if (filters.region && ((s.region || "").toLowerCase() !== filters.region.toLowerCase())) return false;
      if (filters.category && ((s.category || "").toLowerCase() !== filters.category.toLowerCase())) return false;
      if (filters.educationLevel && ((s.educationLevel || "").toLowerCase() !== filters.educationLevel.toLowerCase())) return false;
      if (filters.type && ((s.type || "").toLowerCase() !== filters.type.toLowerCase())) return false;
      if (filters.status && (status !== filters.status.toLowerCase())) return false;

      // tab handling (Upcoming / Ongoing / Closed) - we attempt to map to status
      if (activeTab && activeTab !== "All") {
        const tmap = {
          Upcoming: "draft",
          Ongoing: "active",
          Closed: "closed",
        };
        const want = (tmap[activeTab] || activeTab).toLowerCase();
        if ((s.status || "").toLowerCase() !== want) return false;
      }

      return true;
    });
  }, [scholarships, query, filters, activeTab]);

  return (
    <div className="scholar-main">
      <div className="scholar-navbar-wrapper">
        <Navbar />
      </div>

      <SearchBar onSearch={setQuery} />

      <div className="scholar-content-wrapper">
        <div className="scholar-content">
          <SidebarFilterLeft values={filters} onChange={(next) => setFilters((p) => ({ ...p, ...next }))} />

          <motion.div layout className="scholar-results">
            <div className="scholar-results-header">
              <h2 className="scholar-results-title">University & Admin Scholarships.</h2>
              <div className="scholar-tabs">
                {["Upcoming", "Ongoing", "Closed"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`scholar-tab ${activeTab === tab ? "scholar-tab-active" : ""}`}>{tab}</button>
                ))}
                <button onClick={() => { setActiveTab("All"); }} className={`scholar-tab ${activeTab === "All" ? "scholar-tab-active" : ""}`}>All</button>
              </div>
            </div>

            {loading ? (
              <div className="scholar-loading">Loading scholarships...</div>
            ) : error ? (
              <div className="scholar-error">Error: {error}</div>
            ) : filtered.length === 0 ? (
              <div className="scholar-empty">No scholarships found for your filters.</div>
            ) : (
              <div className="scholar-grid">
                {filtered.map((s) => (
                  <ScholarshipCard key={s._id || s.name + s.provider} data={s} user={user} savedScholarships={savedScholarships} onToggleSave={handleToggleSave} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
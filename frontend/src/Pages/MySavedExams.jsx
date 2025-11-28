// MySavedExams.jsx (updated)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Users, ExternalLink, Award } from "lucide-react";
import Navbar from "../components/Navbar";

const MySavedExams = () => {
  const API_BASE = "https://acvora-07fo.onrender.com";
  const [savedExams, setSavedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const LOCAL_SAVED_KEY = "acvora_saved_exams_v1";

  const loadSavedFromLocal = () => {
    try {
      const raw = localStorage.getItem(LOCAL_SAVED_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  const setSavedToLocal = (arr) => {
    try {
      localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(arr));
    } catch {}
  };

  const normalizeSavedItem = (s) => {
    if (!s) return null;
    const id =
      s.examId ||
      s._id ||
      (s.raw && (s.raw._id || s.raw.examId)) ||
      `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    return {
      examId: id,
      examName:
        s.title || s.examName || (s.raw && (s.raw.title || s.raw.examName)) || "Untitled Exam",
      conductingBody:
        s.description ||
        s.conductingBody ||
        (s.raw && (s.raw.description || s.raw.conductingBody)) ||
        "Not Provided",
      nextEvent:
        (s.meta && (s.meta.nextEvent || s.meta.nextEventLabel)) ||
        s.nextEvent ||
        (s.raw && s.raw.nextEvent) ||
        "Not provided",
      raw: s.raw || s,
    };
  };

  // ---------- INITIAL LOAD ----------
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      const local = loadSavedFromLocal();
      setSavedExams(local);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE}/api/exams/my-exams/${userId}`)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const normalized = arr.map((s) => normalizeSavedItem(s)).filter(Boolean);
        try {
          setSavedToLocal(normalized);
        } catch {}
        setSavedExams(normalized);
      })
      .catch((err) => {
        // NEW: if backend returns 404, treat as "no exams yet" and use local cache
        if (err?.response?.status === 404) {
          console.warn("Saved exams 404 (user not found) – using local cache instead.");
          const saved = loadSavedFromLocal();
          setSavedExams(saved);
          setError(null);
        } else {
          console.error("Error fetching saved exams:", err);
          setError("Failed to load saved exams. Showing local copy if available.");
          const saved = loadSavedFromLocal();
          setSavedExams(saved);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // ---------- SYNC WHEN EVENT FIRES ----------
  useEffect(() => {
    const handler = (ev) => {
      const detail = ev?.detail;
      const userId = localStorage.getItem("userId");

      // Guest mode: rely only on local + event detail
      if (!userId) {
        if (Array.isArray(detail)) {
          const normalized = detail.map((d) => normalizeSavedItem(d)).filter(Boolean);
          setSavedExams(normalized);
          try {
            setSavedToLocal(normalized);
          } catch {}
          return;
        }

        if (detail?.added || detail?.removed) {
          if (detail.added) {
            const item = normalizeSavedItem(detail.added);
            if (item) {
              setSavedExams((p) => {
                const dedup = [item, ...p.filter((x) => x.examId !== item.examId)];
                try {
                  setSavedToLocal(dedup);
                } catch {}
                return dedup;
              });
            }
          }
          if (detail.removed) {
            setSavedExams((p) => {
              const updated = p.filter((x) => x.examId !== detail.removed);
              try {
                setSavedToLocal(updated);
              } catch {}
              return updated;
            });
          }
          return;
        }

        if (detail && typeof detail === "object") {
          const item = normalizeSavedItem(detail);
          if (item) {
            setSavedExams((p) => {
              const dedup = [item, ...p.filter((x) => x.examId !== item.examId)];
              try {
                setSavedToLocal(dedup);
              } catch {}
              return dedup;
            });
          }
        }
        return;
      }

      // Logged-in: refresh from backend (authoritative)
      axios
        .get(`${API_BASE}/api/exams/my-exams/${userId}`)
        .then((res) => {
          const arr = Array.isArray(res.data) ? res.data : [];
          const normalized = arr.map((s) => normalizeSavedItem(s)).filter(Boolean);
          setSavedExams(normalized);
          try {
            setSavedToLocal(normalized);
          } catch {}
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            console.warn("Refresh saved exams 404 – using local cache.");
            const saved = loadSavedFromLocal();
            setSavedExams(saved);
          } else {
            console.log("Error refreshing saved exams:", err);
          }
        });
    };

    window.addEventListener("saved-exams-changed", handler);
    return () => window.removeEventListener("saved-exams-changed", handler);
  }, []);

  // ---------- UNSAVE ----------
  const handleUnsave = async (examId) => {
    const userId = localStorage.getItem("userId");

    // Guest: only local
    if (!userId) {
      const local = loadSavedFromLocal().filter((s) => s.examId !== examId);
      try {
        localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(local));
      } catch {}
      setSavedExams(local);
      window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: local }));
      return;
    }

    try {
      await axios.delete(`${API_BASE}/api/exams/delete-exam/${userId}/${examId}`);

      // success -> update UI + local
      setSavedExams((prev) => prev.filter((exam) => exam.examId !== examId));
      try {
        const local = loadSavedFromLocal().filter((s) => s.examId !== examId);
        localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(local));
      } catch {}
      window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: { removed: examId } }));
    } catch (err) {
      // If server says exam not found (404) we STILL remove from local so UI stays clean
      if (err?.response?.status === 404) {
        console.warn("Unsave 404 – exam not found on server, cleaning local only.");
        setSavedExams((prev) => prev.filter((exam) => exam.examId !== examId));
        try {
          const local = loadSavedFromLocal().filter((s) => s.examId !== examId);
          localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(local));
        } catch {}
        window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: { removed: examId } }));
        return;
      }

      console.error("Error unsaving exam:", err);
      alert("Could not unsave the exam. Please try again.");
    }
  };

  // ---------- UI RENDERING ----------
  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
      </>
    );

  if (error && !savedExams.length)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-red-50">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </>
    );

  if (!savedExams.length)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-100">
          <Award className="h-24 w-24 text-blue-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900">No Saved Exams Yet</h2>
          <p className="text-gray-600 mt-3 mb-6 text-center max-w-md">
            Start exploring our exams and save the ones that interest you so you can easily access
            them here anytime.
          </p>

          <a
            href="/exams"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow"
          >
            <ExternalLink className="h-5 w-5 inline-block mr-2" />
            Browse Exams
          </a>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-8">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            My Saved Exams ({savedExams.length})
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedExams.map((exam) => (
              <div
                key={exam.examId}
                className="group bg-white border rounded-xl shadow hover:shadow-xl transition relative overflow-hidden"
              >
                <button
                  onClick={() => handleUnsave(exam.examId)}
                  className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label="Remove saved exam"
                >
                  ✕
                </button>

                <div
                  className="p-6 cursor-pointer"
                  onClick={() => navigate(`/exampage/${exam.examId}`)}
                >
                  <h2 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600">
                    {exam.examName}
                  </h2>

                  <div className="text-gray-600 text-sm flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    Conducting Body: {exam.conductingBody}
                  </div>

                  <div className="text-gray-600 text-sm flex items-center mb-4">
                    <Award className="h-4 w-4 mr-2" />
                    Next Event: {exam.nextEvent}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quick Access</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MySavedExams;

// Exams.js (updated)
import React, { useState, useEffect } from "react";
import { ChevronDown, Check, Filter, Search, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import axios from "axios";

/* -------------------- Reusable Dropdown -------------------- */
const CustomDropdown = ({ title, options, selectedValues, setSelectedValues }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter((v) => v !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  return (
    <div className="mb-4 relative w-full">
      <label className="text-yellow-500 font-bold mb-1 block text-sm sm:text-base">{title}</label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border bg-white shadow-sm"
      >
        <span>{selectedValues.length > 0 ? selectedValues.join(", ") : `Select ${title}`}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                  selectedValues.includes(option) ? "bg-yellow-100" : "hover:bg-yellow-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selectedValues.includes(option)
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedValues.includes(option) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------- Exam Card -------------------- */
const ExamCard = ({ exam, isSelected, toggleSelect, isSaved, onToggleSave }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className={`border-2 border-yellow-300 rounded-2xl bg-white shadow-md mb-4 transition-all ${
      isSelected ? "ring-4 ring-yellow-500 border-yellow-500" : "hover:shadow-xl"
    }`}
  >
    <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(exam.examId)}
            className="accent-yellow-500"
          />
          <span className="font-semibold">Select</span>

          <button
            onClick={() => onToggleSave(exam)}
            className="p-1 rounded hover:bg-gray-100 ml-2"
            title={isSaved ? "Unsave" : "Save"}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
          </button>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900">{exam.examName}</h3>
        <p className="text-sm text-gray-700">
          Conducting Body: <span className="font-semibold">{exam.conductingBody}</span>
        </p>
        <p className="text-sm text-gray-700">
          Next Event: <span className="font-semibold text-yellow-600">{exam.nextEvent}</span>
        </p>
        <p className="text-sm text-gray-700">
          Mode & Level: <span className="font-semibold">{exam.modeLevel}</span>
        </p>
      </div>

      {/* BUTTONS (Reduced Height) */}
      <div className="flex flex-wrap gap-2 self-end sm:self-auto">
        <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow font-semibold text-xs">Details</button>
        <button className="bg-gray-900 text-white px-3 py-1 rounded-lg font-semibold text-xs">Apply</button>
        <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg font-semibold text-xs">Set Alert</button>
      </div>
    </div>
  </motion.div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const Examain = () => {
  const API_BASE = "https://acvora-07fo.onrender.com"; // central base URL

  /* FILTERS (unchanged) */
  const allStates = ["Andhra Pradesh", "Bihar", "Karnataka", "Maharashtra", "West Bengal", "Delhi"];
  const filters = {
    stream: ["Engineering", "Medical", "Law", "Commerce"],
    level: ["UG", "PG"],
    examType: ["National", "State", "Scholarship"],
    mode: ["Online", "Offline"],
    dateRange: ["Next 3 months", "Next 6 months"],
  };

  /* Filter states */
  const [selectedStateFilter, setSelectedStateFilter] = useState([]);
  const [selectedStream, setSelectedStream] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  /* Data */
  const [examData, setExamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* Dummy selection states */
  const [compareSelected, setCompareSelected] = useState([]); // stores examId strings
  const [savedExams, setSavedExams] = useState([]); // stores saved examIds

  /* NEW — Tab state */
  const [activeTab, setActiveTab] = useState("Upcoming");

  const [filterOpen, setFilterOpen] = useState(false);

  /* -------------------- HELPERS: local storage fallback -------------------- */
  const LOCAL_SAVED_KEY = "acvora_saved_exams_v1"; // stores array of saved exam objects for guests

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

  /* -------------------- FETCH EXAMS -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/exams`); // keep existing list endpoint

        const formatDate = (dateStr) =>
          new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });

        const mapped = (Array.isArray(res.data) ? res.data : []).map((e) => {
          const stableId =
            e.examId ||
            e._id ||
            `local-${(e.examName || "exam").replace(/\s+/g, "-")}-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 6)}`;
          return {
            examId: stableId,
            _id: e._id || null,
            examName: e.examName || e.resultExamName || "Untitled Exam",
            conductingBody: e.conductingBody || "Not Provided",
            examDate: e.examDate || null,
            applicationDeadline: e.applicationDeadline || null,
            nextEvent:
              e.applicationDeadline
                ? `Registration Open - ${formatDate(e.applicationDeadline)}`
                : e.examDate
                ? `Exam Date - ${formatDate(e.examDate)}`
                : "No Event",
            modeLevel: e.modeLevel || "Not Provided",
            __raw: e,
          };
        });

        setExamData(mapped);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchData();
  }, []);

  /* -------------------- LOAD USER SAVED IDS (backend or local) -------------------- */
  useEffect(() => {
    const loadSaved = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // guest -> local fallback
        const local = loadSavedFromLocal();
        setSavedExams(local.map((s) => s.examId));
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/api/exams/my-exams/${userId}`);
        // success: server returns array of saved subdocs
        const normalized = (Array.isArray(res.data) ? res.data : []).map((s) => ({
          examId: s._id || s.examId || `local-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
          examName: s.title || s.examName || "Untitled Exam",
          conductingBody: s.description || s.conductingBody || "Not Provided",
          nextEvent: (s.meta && (s.meta.nextEvent || s.meta.nextEventLabel)) || s.nextEvent || "Not provided",
          raw: s,
        }));

        // store ids in memory for quick checks
        setSavedExams(normalized.map((n) => n.examId));

        // update local normalized cache so fallback pages use same shape
        try { setSavedToLocal(normalized); } catch {}
      } catch (err) {
        // If server returned 404 -> user not found: quietly fallback to local cache
        if (err?.response?.status === 404) {
          const local = loadSavedFromLocal();
          setSavedExams(local.map((s) => s.examId));
          return;
        }

        // other errors -> fallback but log once for debugging
        console.error("Error loading saved exams from backend:", err);
        const local = loadSavedFromLocal();
        setSavedExams(local.map((s) => s.examId));
      }
    };

    loadSaved();
  }, []);

  /* -------------------- SAVE / UNSAVE HANDLER -------------------- */
  const handleToggleSave = async (exam) => {
    const userId = localStorage.getItem("userId");
    const examId = exam.examId;

    // IF ALREADY SAVED -> UNSAVE
    if (savedExams.includes(examId)) {
      if (!userId) {
        // guest -> remove from localStorage
        const local = loadSavedFromLocal().filter((s) => s.examId !== examId);
        setSavedToLocal(local);
        setSavedExams(local.map((s) => s.examId));
        window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: local }));
        return;
      }

      try {
        // primary attempt: delete by subdoc _id or meta id on backend
        await axios.delete(`${API_BASE}/api/exams/delete-exam/${userId}/${examId}`);
        // success: remove locally
        setSavedExams((prev) => prev.filter((id) => id !== examId));
        try {
          const local = loadSavedFromLocal().filter((s) => s.examId !== examId);
          setSavedToLocal(local);
        } catch {}
        window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: { removed: examId } }));
        return;
      } catch (err) {
        // If backend says 404 (exam not found) — try to find matching saved subdoc in local cache and remove it locally
        console.warn("Error unsaving exam from backend:", err?.response?.status || err?.message);

        // fallback: remove locally so UI remains responsive
        try {
          // Try to remove by meta.examId match too
          const local = loadSavedFromLocal().filter((s) => {
            if (!s) return false;
            if (s.examId === examId) return false;
            // also check meta if present
            if (s.meta && (s.meta.examId === examId || s.meta?.examId?.toString?.() === examId)) return false;
            return true;
          });
          setSavedToLocal(local);
          setSavedExams(local.map((s) => s.examId));
          window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: local }));
        } catch (e) {
          // as last resort, just drop from memory
          setSavedExams((prev) => prev.filter((id) => id !== examId));
          window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: { removed: examId } }));
        }

        return;
      }
    }

    // Not saved yet -> save
    if (!userId) {
      const local = loadSavedFromLocal();
      const payload = {
        examId,
        examName: exam.examName,
        conductingBody: exam.conductingBody,
        nextEvent: exam.nextEvent,
        modeLevel: exam.modeLevel,
        savedAt: new Date().toISOString(),
        raw: exam.__raw || {},
      };
      const updated = [payload, ...local];
      setSavedToLocal(updated);
      setSavedExams(updated.map((s) => s.examId));
      window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: updated }));
      return;
    }

    // Logged-in: try backend then fallback to local storage if it fails
    try {
      const payload = {
        userId,
        title: exam.examName,
        description: exam.conductingBody || "",
        meta: {
          examId,
          nextEvent: exam.nextEvent,
          modeLevel: exam.modeLevel,
        },
        questions: [],
        raw: exam.__raw || {},
      };

      const res = await axios.post(`${API_BASE}/api/exams/save-exam`, payload);

      // prefer server returned subdoc if exists
      const savedFromServer = res?.data?.exam || res?.data || null;
      const savedObj = {
        examId:
          (savedFromServer && (savedFromServer._id || savedFromServer.examId)) ||
          examId ||
          `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        examName: (savedFromServer && (savedFromServer.title || savedFromServer.examName)) || payload.title,
        conductingBody:
          (savedFromServer && (savedFromServer.description || savedFromServer.conductingBody)) || payload.description,
        nextEvent:
          (savedFromServer &&
            (savedFromServer.meta && (savedFromServer.meta.nextEvent || savedFromServer.meta.nextEventLabel))) ||
          payload.meta.nextEvent ||
          exam.nextEvent,
        raw: (savedFromServer && savedFromServer.raw) || payload.raw || exam.__raw || {},
      };

      setSavedExams((prev) => {
        const dedup = [savedObj.examId, ...prev.filter((id) => id !== savedObj.examId)];
        return dedup;
      });

      try {
        const local = loadSavedFromLocal();
        const updatedLocal = [savedObj, ...local.filter((s) => s.examId !== savedObj.examId)];
        setSavedToLocal(updatedLocal);
      } catch (e) {}

      window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: { added: savedObj } }));
    } catch (err) {
      console.error("Error saving exam (backend). Falling back to local. Error:", err);

      const local = loadSavedFromLocal();
      const fallback = {
        examId,
        examName: exam.examName,
        conductingBody: exam.conductingBody,
        nextEvent: exam.nextEvent,
        modeLevel: exam.modeLevel,
        savedAt: new Date().toISOString(),
        raw: exam.__raw || {},
        _backendSaveFailed: true,
      };
      const updated = [fallback, ...local.filter((s) => s.examId !== fallback.examId)];
      try {
        setSavedToLocal(updated);
      } catch {}
      setSavedExams(updated.map((s) => s.examId));
      window.dispatchEvent(new CustomEvent("saved-exams-changed", { detail: updated }));

      alert("Could not save to server. Saved locally — will sync when backend is available.");
    }
  };

  /* -------------------- TAB FILTER LOGIC -------------------- */
  const today = new Date();

  const tabFilteredExams = examData.filter((exam) => {
    // Pick date priority
    const date = exam.examDate || exam.applicationDeadline;

    if (!date) return activeTab === "Upcoming";

    const examDate = new Date(date);

    if (activeTab === "Upcoming") return examDate > today;
    if (activeTab === "Ongoing")
      return examDate.getFullYear() === today.getFullYear() && examDate.getMonth() === today.getMonth();
    if (activeTab === "Past") return examDate < today;

    return true;
  });

  /* -------------------- SEARCH + TAB FINAL FILTER -------------------- */
  const visibleExams = tabFilteredExams.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* -------------------- PAGE UI -------------------- */
  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-100 flex flex-col md:flex-row pb-32">
        {/* Mobile Filter */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md"
          >
            <Filter /> Filters
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`${filterOpen ? "block" : "hidden"} md:block w-full md:w-72 p-4 bg-gray-50 border-r`}>
          <CustomDropdown title="State" options={allStates} selectedValues={selectedStateFilter} setSelectedValues={setSelectedStateFilter} />
          <CustomDropdown title="Stream" options={filters.stream} selectedValues={selectedStream} setSelectedValues={setSelectedStream} />
          <CustomDropdown title="Level" options={filters.level} selectedValues={selectedLevel} setSelectedValues={setSelectedLevel} />
          <CustomDropdown title="Exam Type" options={filters.examType} selectedValues={selectedExamType} setSelectedValues={setSelectedExamType} />
          <CustomDropdown title="Mode" options={filters.mode} selectedValues={selectedMode} setSelectedValues={setSelectedMode} />
          <CustomDropdown title="Date Range" options={filters.dateRange} selectedValues={selectedDateRange} setSelectedValues={setSelectedDateRange} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10">
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Exam by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-md border pr-10"
            />
            <Search className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b pb-3 mb-6">
            {["Upcoming", "Ongoing", "Past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm sm:text-base font-semibold transition ${
                  activeTab === tab ? "text-yellow-600 border-b-4 border-yellow-500" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold mb-6">University Exams Dashboard</h1>

          {visibleExams.length === 0 ? (
            <p className="text-gray-600">No exams found for this category.</p>
          ) : (
            visibleExams.map((exam) => (
              <ExamCard
                key={exam.examId}
                exam={exam}
                isSelected={compareSelected.includes(exam.examId)}
                toggleSelect={(id) =>
                  setCompareSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
                }
                isSaved={savedExams.includes(exam.examId)}
                onToggleSave={handleToggleSave}
              />
            ))
          )}
        </main>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-yellow-500 border-t border-yellow-500 shadow-lg z-50 flex flex-col sm:flex-row items-center justify-center gap-4 py-3 px-4">
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold">Set Alerts</button>

        <button
          disabled={compareSelected.length < 2}
          className={`px-4 py-2 rounded-md font-semibold ${compareSelected.length < 2 ? "bg-yellow-300 text-gray-600 cursor-not-allowed" : "bg-yellow-500 text-gray-900"}`}
        >
          Compare Exams ({compareSelected.length})
        </button>

        <button
          disabled={compareSelected.length === 0}
          className={`px-4 py-2 rounded-md font-semibold ${compareSelected.length === 0 ? "bg-yellow-300 text-gray-900 cursor-not-allowed" : "bg-yellow-500 text-gray-900"}`}
        >
          Download Calendar
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Examain;

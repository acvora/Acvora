import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/* Stat Component */
const Stat = ({ label, value, highlight = false }) => (
  <div className="flex flex-col rounded-xl border border-[#ffffff]/30 bg-[#ffffff]/70 p-2 shadow-sm backdrop-blur-sm ring-1 ring-inset ring-[#f3f4f6] animate-in slide-in-from-bottom-2 duration-700 ease-out">
    <span className="text-sm text-[#1f2937] transition-colors duration-300">{label}</span>
    <span
      className={`mt-1 text-xl transition-all duration-500 hover:scale-105 ${
        highlight ? "font-semibold text-[#f59e0b]" : "font-medium text-[#111827]"
      }`}
    >
      {value}
    </span>
  </div>
);

/* Generic Card with optional image */
const Card = ({ title, desc, icon, imgSrc }) => (
  <div className="group rounded-2xl border border-[#f3f4f6] bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-0 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm ring-1 ring-[#f3f4f6] overflow-hidden animate-in zoom-in-95 duration-700 ease-out">
    {imgSrc ? (
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/10 via-transparent to-transparent transition-opacity duration-500 group-hover:from-[#000000]/20" />
      </div>
    ) : null}
    <div className="p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f3f4f6] via-[#f9fafb] to-[#f3f4f6] text-[#f59e0b] ring-1 ring-inset ring-[#e5e7eb] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        {icon ?? <span className="text-lg transition-transform duration-300 group-hover:scale-125">★</span>}
      </div>
      <h4 className="text-base font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#d97706]">{title}</h4>
      {desc && <p className="mt-1 text-sm text-[#4b5563] transition-colors duration-300 group-hover:text-[#374151]">{desc}</p>}
    </div>
  </div>
);

/* Institute Card */
const InstituteCard = ({ title, desc, img }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const pRef = useRef(null);

  useEffect(() => {
    if (pRef.current) {
      const element = pRef.current;
      setHasMore(element.scrollHeight > element.clientHeight);
    }
  }, [desc, expanded]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="snap-center shrink-0 w-80 h-[320px] animate-in slide-in-from-right-4 duration-1000 ease-out delay-200 flex flex-col">
      <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-[#ffffff]/30 bg-[#ffffff]/90 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm ring-1 ring-[#f3f4f6]">
        <div className="relative h-44 w-full overflow-hidden flex-shrink-0">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/15 via-transparent to-transparent transition-opacity duration-500 group-hover:from-[#000000]/25" />
        </div>
        <div className="p-4 flex flex-col flex-1 min-h-0">
          <h4 className="text-base font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#d97706] line-clamp-2 mb-2 flex-shrink-0">{title}</h4>
          <div className="flex-1 min-h-0 flex flex-col">
            <p
              ref={pRef}
              className={`text-sm text-[#4b5563] transition-colors duration-300 group-hover:text-[#374151] overflow-hidden flex-grow ${
                expanded ? 'line-clamp-none' : 'line-clamp-2'
              }`}
            >
              {desc}
            </p>
            {hasMore && (
              <button
                onClick={toggleExpanded}
                className="mt-1 text-[#f59e0b] text-xs font-medium underline hover:no-underline transition-colors duration-200 self-start flex-shrink-0"
              >
                {expanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Section Component */
const Section = ({ title, subtitle, children, id }) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in-0 duration-1000 ease-out">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="animate-in slide-in-from-left-4 duration-700 ease-out">
        <h2 className="text-2xl font-bold tracking-tight text-[#111827]">{title}</h2>
        {subtitle && <p className="mt-1 text-[#4b5563]">{subtitle}</p>}
      </div>
      <div className="hidden gap-2 sm:flex animate-in slide-in-from-right-4 duration-700 ease-out delay-200">
        <a
          href="#counselor"
          className="rounded-lg bg-[#fbbf24] text-[#111827] px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-[#f59e0b] hover:scale-105 hover:shadow-lg"
        >
          Talk to Counselor
        </a>
      </div>
    </div>
    <div className="space-y-4 animate-in stagger-100ms items-start">
      {children}
    </div>
  </section>
);

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const scrollerRef = useRef(null);

  // Mock image mappings (replace with actual asset paths or API data)
  const INSTITUTE_IMAGES = {
    "IIM Indore": "/Indore.jpeg",
    "Shaheed Sukhdev College": "/Delhi.jpeg",
    "NMIMS Mumbai": "/Mumbai.jpeg",
    "Symbiosis": "/Symbiosis.jpeg",
  };

  const SPECIALIZATION_IMAGES = {
    "Marketing": "/Marketing.jpeg",
    "Finance": "/Finance.jpeg",
    "HR Management": "/HR.jpeg",
    "Business Analytics": "/BA.jpeg",
  };

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://acvora-07fo.onrender.com/api/courses/${id}`);
        const courseData = await res.json();
        console.log("Course fetched:", courseData);

        const parsed = {
          ...courseData,
          highlights: courseData.highlights ? courseData.highlights.split(",") : [],
          careerRoles: courseData.careerRoles ? courseData.careerRoles.split(",") : [],
          topInstitutes: courseData.topInstitutes ? courseData.topInstitutes.split(",").map(name => name.trim()).filter(name => name) : [],
          curriculum: courseData.curriculum ? courseData.curriculum.split(",") : [],
          eligibilityItems: courseData.eligibility
            ? courseData.eligibility.split("\n").filter(item => item.trim())
            : [],
          admissionItems: courseData.admissionProcess
            ? courseData.admissionProcess.split("\n").filter(item => item.trim())
            : [],
          scholarshipsItems: courseData.scholarships
            ? courseData.scholarships.split("\n").filter(item => item.trim())
            : [],
          abroadItems: courseData.abroadOptions
            ? courseData.abroadOptions.split("\n").filter(item => item.trim())
            : [],
          faqsBlocks: courseData.faqs
            ? courseData.faqs.split("\n\n").map(block => {
                const lines = block.split("\n");
                return {
                  question: lines[0] || "",
                  answer: lines.slice(1).join("\n") || ""
                };
              }).filter(faq => faq.question && faq.answer)
            : [],
          specializations: courseData.specializations || [], // Always array
          topInstituteImages: courseData.topInstituteImages || [], // Always array
        };

        setCourse(parsed);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  // Auto-scroll for institutes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector(":scope > .contents > *");
    const cardWidth = firstCard?.getBoundingClientRect().width || 320;
    const gap = 16;
    const stride = cardWidth + gap; // Simplified to scroll one card at a time for better alignment
    let scrollAmount = 0;

    const step = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = scrollAmount + stride;
      if (next >= max - 4) {
        scrollAmount = 0;
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount = next;
        el.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const interval = setInterval(step, 3000); // Slightly faster for better flow
    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, [course]);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-[#4b5563]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f59e0b]"></div>
        <span className="ml-3">Loading course...</span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#e8e8e8] text-[#111827]">
        {/* Navbar */}
        <header className="sticky top-0 z-30 w-full bg-[#111827] text-[#ffffff] shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-[#fbbf24] text-2xl font-bold">▲</div>
              <span className="text-xl font-bold text-[#ffffff]">Acvora</span>
            </div>

            {/* Main Navigation */}
            <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Home</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Counselling</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Scholarships</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Courses</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Colleges</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">Exams</a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors duration-300">News & Feed</a>
            </nav>

            {/* User Greeting Button */}
            <div className="flex items-center">
              <button className="rounded-full bg-[#f59e0b] px-6 py-2 text-sm font-semibold text-[#111827] shadow-md hover:bg-[#fbbf24] transition-all duration-300 hover:scale-105">
                Hi, ANKIT SINGH RAWAT
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="overview"
          className="relative bg-[#e8e8e8] mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 animate-in fade-in-0 duration-1000 ease-out"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none animate-pulse">
            <div className="mx-auto max-w-6xl">
              <div className="absolute left-8 top-8 h-40 w-40 rounded-full bg-[#e8e8e8]/40 blur-3xl animate-bounce [animation-delay:0s]" />
              <div className="absolute right-8 -top-6 h-56 w-56 rounded-full bg-[#e8e8e8]/40 blur-3xl animate-bounce [animation-delay:1s]" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-5 md:gap-10">
            <div className="md:col-span-3 animate-in slide-in-from-left-8 duration-1000 ease-out">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3f4f6] to-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#d97706] ring-1 ring-[#e5e7eb] animate-pulse [animation-duration:2s]">
                {course.shortName || "Course"}
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl transition-all duration-700 hover:text-[#d97706]">
                {course.courseTitle}
              </h1>
              <p className="mt-3 text-[#1f2937] animate-in fade-in-0 duration-1000 ease-out delay-300">
                {course.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-in stagger-100ms">
                <Stat label="Duration" value={course.duration} highlight />
                <Stat label="Fees" value={course.fees} />
                <Stat label="Mode" value={course.mode} />
                <Stat label="Level" value={course.level} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 animate-in slide-in-from-bottom-4 duration-700 ease-out delay-500">
                <a
                  href="#counselor"
                  className="rounded-lg border border-[#d1d5db] bg-[#ffffff] px-5 py-2.5 text-sm font-semibold text-[#92400e] shadow-sm transition-all duration-300 hover:bg-[#f9fafb] hover:scale-105 hover:shadow-lg"
                >
                  Talk to Counselor
                </a>
                <a
                  href="#brochure"
                  className="rounded-lg bg-[#fbbf24] text-[#111827] px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#f59e0b] hover:scale-105 transition-all duration-300"
                >
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="md:col-span-2 animate-in slide-in-from-right-8 duration-1000 ease-out">
              <div className="relative overflow-hidden rounded-2xl border border-[#ffffff]/30 bg-[#ffffff]/50 p-5 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] animate-in zoom-in-95 duration-700 ease-out">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f9fafb] blur-2xl animate-pulse [animation-duration:3s]" />
                <h3 className="text-lg font-semibold text-[#111827]">Key Highlights</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#1f2937] animate-in stagger-100ms">
                  {(course.highlights || []).map((item, idx) => (
                    <li key={idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                      {item.trim()}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 grid grid-cols-2 gap-3 animate-in stagger-100ms delay-500">
                  <Stat label="Internship" value={course.internship || "N/A"} />
                  <Stat label="Placement" value={course.placement || "N/A"} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <Section
          id="specializations"
          title="Specializations"
          subtitle="Choose a focus area to align with career goals."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-in stagger-150ms">
            {(course.specializations || []).map((spec, idx) => (
              <Card
                key={idx}
                title={spec.name || `Specialization ${idx + 1}`}
                desc={spec.description}
                imgSrc={spec.image ? `https://acvora-07fo.onrender.com/${spec.image}` : SPECIALIZATION_IMAGES[spec.name] || "/default-spec.jpeg"}
              />
            ))}
          </div>
        </Section>

        {/* Eligibility & Admission */}
        <Section
          id="eligibility"
          title="Eligibility & Admission"
          subtitle="Check requirements, exams, and application timelines."
        >
          <div className="grid gap-6 lg:grid-cols-2 animate-in stagger-200ms">
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Eligibility</h4>
              <ul className="mt-3 space-y-2 text-[#1f2937] text-sm animate-in stagger-100ms">
                {(course.eligibilityItems || []).map((item, idx) => (
                  <li key={idx} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Entrance & Admission</h4>
              <ul className="mt-3 space-y-2 text-[#1f2937] text-sm animate-in stagger-100ms">
                {(course.admissionItems || []).map((item, idx) => (
                  <li key={idx} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Application Guide */}
        <Section
          id="application-guide"
          title="Application Guide"
          subtitle="Step-by-step overview of the process."
        >
          <div className="grid gap-6 md:grid-cols-3 animate-in stagger-150ms">
            <Card title="1. Register" desc="Create applicant profile" />
            <Card title="2. Apply" desc="Fill form, upload documents" />
            <Card title="3. Exam/Shortlist" desc="Entrance/merit-based shortlist" />
            <Card title="4. Interview" desc="PI/WAT/GD as applicable" />
            <Card title="5. Offer" desc="Provisional admission" />
            <Card title="6. Enroll" desc="Fee payment & onboarding" />
          </div>
        </Section>

        {/* Curriculum */}
        <Section
          id="curriculum"
          title="Curriculum Snapshot"
          subtitle="Core subjects and electives."
        >
          <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl animate-in slide-in-from-bottom-2 duration-700 ease-out">
            <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Core Curriculum</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#1f2937] animate-in stagger-100ms">
              {(course.curriculum || []).map((item, idx) => (
                <li key={idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Top Institutes */}
        <Section
          id="institutes"
          title="Top Institutes"
          subtitle="Popular institutions offering this course."
        >
          <div className="relative animate-in fade-in-0 duration-1000 ease-out">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#e8e8e8] to-[#e8e8e8] animate-pulse [animation-duration:4s]" />
            <div className="rounded-xl border border-[#ffffff]/30 bg-[#ffffff]/50 p-4 backdrop-blur-sm shadow-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-lg">
              <div
                ref={scrollerRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-2 [scrollbar-width:thin]"
                style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
              >
                <div className="contents lg:[&>*]:w-[calc((100vw-2rem-2rem-2rem)/3)] xl:[&>*]:w-[calc((72rem-2rem-2rem-2rem)/3)] min-h-[320px]">
                  {(course.topInstituteImages || []).map((item, idx) => (
                    <InstituteCard
                      key={idx}
                      title={course.topInstitutes?.[idx] || item.description || `Institute ${idx + 1}`}
                      desc={item.description || `Explore programs at ${course.topInstitutes?.[idx] || 'this institute'}`}
                      img={item.url ? `https://acvora-07fo.onrender.com/${item.url}` : INSTITUTE_IMAGES[course.topInstitutes?.[idx]] || "/default-institute.jpeg"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Career Opportunities */}
        <Section
          id="career"
          title="Career Opportunities"
          subtitle="Roles with strong growth potential."
        >
          <div className="grid gap-6 lg:grid-cols-2 animate-in stagger-200ms">
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Popular Roles</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#1f2937] animate-in stagger-100ms">
                {(course.careerRoles || []).map((role, idx) => (
                  <li key={idx} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                    {role.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Expected Salary Range</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#1f2937] animate-in stagger-100ms">
                <li className="animate-in fade-in-0 duration-500 ease-out">Entry Level: ₹6-12 LPA</li>
                <li className="animate-in fade-in-0 duration-500 ease-out delay-100">Mid Level: ₹12-25 LPA</li>
                <li className="animate-in fade-in-0 duration-500 ease-out delay-200">Senior Level: ₹25+ LPA</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Scholarships & Abroad Options */}
        <Section
          id="scholarships"
          title="Scholarships & Abroad Options"
          subtitle="Merit-based aid, need-based support, and exchange programs."
        >
          <div className="grid gap-6 lg:grid-cols-2 animate-in stagger-200ms">
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Scholarships</h4>
              <ul className="mt-3 space-y-2 text-[#1f2937] text-sm animate-in stagger-100ms">
                {(course.scholarshipsItems || []).map((item, idx) => (
                  <li key={idx} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-xl">
              <h4 className="text-lg font-semibold text-[#111827] transition-colors duration-300 hover:text-[#d97706]">Study Abroad & Exchange</h4>
              <ul className="mt-3 space-y-2 text-[#1f2937] text-sm animate-in stagger-100ms">
                {(course.abroadItems || []).map((item, idx) => (
                  <li key={idx} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in-0 duration-500 ease-out">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* FAQs */}
        <Section id="faqs" title="FAQs" subtitle="Quick answers to common queries.">
          <div className="grid gap-6 md:grid-cols-2 animate-in stagger-150ms">
            {(course.faqsBlocks || []).map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#ffffff]/30 bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-5 shadow-sm backdrop-blur-sm ring-1 ring-[#f3f4f6] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <h4 className="font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#d97706]">{faq.question}</h4>
                <p className="mt-1 text-sm text-[#1f2937] transition-all duration-300 group-hover:text-[#374151]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <section id="apply" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 animate-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="relative overflow-hidden rounded-3xl border border-[#ffffff]/30 bg-gradient-to-r from-[#111827] to-[#1f2937] p-8 text-[#ffffff] shadow-sm transition-all duration-500 hover:shadow-2xl animate-pulse [animation-duration:6s]">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#ffffff]/15 blur-2xl animate-bounce [animation-delay:0s]"></div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 animate-in fade-in-0 duration-700 ease-out">
                <h3 className="text-2xl font-bold transition-colors duration-300 hover:text-[#fde68a]">Ready to begin your journey?</h3>
                <p className="mt-1 text-[#ffffff]/90 animate-in fade-in-0 duration-700 ease-out delay-200">
                  Apply now or speak with a counselor to clarify admissions and course details.
                </p>
              </div>
              <div className="flex items-center gap-3 md:justify-end animate-in slide-in-from-right-4 duration-700 ease-out delay-400">
                <a
                  href="#counselor"
                  className="rounded-lg bg-[#ffffff]/15 px-5 py-3 text-sm font-semibold text-[#ffffff] ring-1 ring-inset ring-[#ffffff]/30 backdrop-blur transition-all duration-300 hover:bg-[#ffffff]/25 hover:scale-105"
                >
                  Talk to Counselor
                </a>
                <a
                  href="#apply-form"
                  className="rounded-lg bg-[#fbbf24] px-5 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f59e0b] transition-all duration-300 hover:scale-105"
                >
                  Start Application
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
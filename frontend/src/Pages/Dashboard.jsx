// src/pages/Dashboard.jsx
import React, { useState } from "react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import ExecutiveCommandCenter from "../components/AdminDashboard/ExecutiveCommandCenter";
import InstituteManagement from "../components/AdminDashboard/InstituteManagement";
import ProgramIntelligence from "../components/AdminDashboard/ProgramIntelligence";
import StudentLifecycle from "../components/AdminDashboard/StudentLifecycle";
import CrmAdmissions from "../components/AdminDashboard/CrmAdmissions";
import StudyAbroadHub from "../components/AdminDashboard/StudyAbroadHub";
import ScholarshipsAid from "../components/AdminDashboard/ScholarshipsAid";
import LoanOperations from "../components/AdminDashboard/LoanOperations";
import RevenueBilling from "../components/AdminDashboard/RevenueBilling";
import GrowthAnalytics from "../components/AdminDashboard/GrowthAnalytics";
import PartnershipsAlliances from "../components/AdminDashboard/PartnershipsAlliances";
import ComplianceRisk from "../components/AdminDashboard/ComplianceRisk";
import AiIntelligence from "../components/AdminDashboard/AiIntelligence";
import UserRbac from "../components/AdminDashboard/UserRbac";
import DevOpsHealth from "../components/AdminDashboard/DevOpsHealth";
import EnterpriseReports from "../components/AdminDashboard/EnterpriseReports";
import BehavioralIntelligence from "../components/AdminDashboard/BehavioralIntelligence";
import MasterSettings from "../components/AdminDashboard/MasterSettings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <ExecutiveCommandCenter />;
      case "institutes":
        return <InstituteManagement />;
      case "courses":
        return <ProgramIntelligence />;
      case "students":
        return <StudentLifecycle />;
      case "crm":
        return <CrmAdmissions />;
      case "abroad":
        return <StudyAbroadHub />;
      case "financial":
        return <ScholarshipsAid />;
      case "fintech":
        return <LoanOperations />;
      case "revenue":
        return <RevenueBilling />;
      case "marketing":
        return <GrowthAnalytics />;
      case "alliances":
        return <PartnershipsAlliances />;
      case "grc":
        return <ComplianceRisk />;
      case "ai":
        return <AiIntelligence />;
      case "rbac":
        return <UserRbac />;
      case "devops":
        return <DevOpsHealth />;
      case "reports":
        return <EnterpriseReports />;
      case "analytics":
        return <BehavioralIntelligence />;
      case "settings":
        return <MasterSettings />;
      default:
        return <ExecutiveCommandCenter />;
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;

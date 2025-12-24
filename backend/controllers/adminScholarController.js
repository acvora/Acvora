import AdminScholar from "../models/AdminScholar.js";

/**
 * CREATE SCHOLARSHIP
 */
export const createScholar = async (req, res) => {
  try {
    const raw = { ...req.body };
    const data = {}; // ✅ FIX: define data

    // ✅ ALLOW ONLY FIELDS DEFINED IN SCHEMA
    const allowedFields = [
      "name","code","provider","providerType","country","state","websiteURL",
      "level","type","coverageType",
      "discipline","degreeTypes","modeOfStudy",
      "nationality","domicileReq","categoryEligibility",
      "genderEligibility","disabilityEligibility",
      "incomeLimitMin","incomeLimitMax",
      "minAcademicQual","minMarksCGPA","gapYearAllowed",
      "minAge","maxAge","yearOfStudy",
      "tuitionCoverage","tuitionAmount","monthlyStipend",
      "annualAllowance","hostelCoverage","booksAllowance",
      "travelAllowance","examFeeCoverage","otherBenefits","benefits",
      "durationType","totalDuration","totalDurationUnit","renewalCriteria",
      "appMode","appURL","startDate","endDate","deadlineTime","appFee",
      "requiredDocuments","selectionMethod","interviewMode",
      "disbursementMode","disbursementFrequency",
      "status","visibility","featured","tags",
      "verifiedAdmin","sourceVerified",
      "description","eligibility"
    ];

    // 🔥 COPY ONLY ALLOWED FIELDS
    allowedFields.forEach((key) => {
      if (raw[key] !== "" && raw[key] !== undefined) {
        data[key] = raw[key];
      }
    });

    // 🔒 REQUIRED FIELDS
    if (!data.name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!data.provider) {
      return res.status(400).json({ success: false, message: "Provider is required" });
    }
    if (!data.status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    // 🧠 ARRAY FIELDS
    const arrayFields = [
      "type","discipline","degreeTypes","categoryEligibility",
      "yearOfStudy","requiredDocuments","selectionMethod","tags"
    ];

    arrayFields.forEach((field) => {
      if (data[field] && !Array.isArray(data[field])) {
        data[field] = [data[field]];
      }
    });

    // 🔢 NUMBER FIELDS
    const numberFields = [
      "incomeLimitMin","incomeLimitMax","minAge","maxAge",
      "tuitionAmount","monthlyStipend","annualAllowance",
      "booksAllowance","travelAllowance","appFee"
    ];

    numberFields.forEach((field) => {
      if (data[field] !== undefined) {
        data[field] = Number(data[field]);
        if (isNaN(data[field])) delete data[field];
      }
    });

    // 📅 DATE FIELDS
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);

    const scholar = await AdminScholar.create(data);

    return res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      scholar,
    });

  } catch (err) {
    console.error("🔥 CREATE SCHOLAR ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

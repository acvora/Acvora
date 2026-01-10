import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The backend endpoint
const url = 'https://acvora-07fo.onrender.com/api/universities';

// Create a dummy file for uploads
const dummyFilePath = path.join(__dirname, 'dummy.txt');
fs.writeFileSync(dummyFilePath, 'This is a dummy file for testing uploads.');

const universities = [
  {
    instituteName: "Global Tech University",
    type: "University",
    year: "1998",
    ownership: "Private",
    students: "15000",
    faculty: "800",
    description: "A leading university in technology and innovation, offering a wide range of undergraduate and postgraduate programs.",
    address: "123 Tech Park, Silicon Valley",
    state: "California",
    city: "Palo Alto",
    pinCode: "94301",
    email: "contact@gtu.edu",
    phone: "1-800-555-1234",
    website: "https://www.gtu.edu",
    socialMedia: "https://twitter.com/gtu",
    contactPerson: "Dr. Jane Doe",
    emailUsername: "gtu-admin",
    password: "password123",
    declaration: true,
    subscriptionPlan: "premium",
    topRecruiters: "Google,Apple,Microsoft",
    highestPackage: "150000 USD",
    avgPackage: "90000 USD",
    campusSize: "200 acres",
    hostelFee: "8000 USD/year",
    studentRating: "4.8/5",
    nirfRank: "5",
    placementRate: "95%",
    admissionDetails: "Admissions are open for the fall semester. Apply online.",
    scholarships: "Merit-based scholarships available,Need-based grants",
    intlStudentOffice: "Yes, available",
    countriesEnrolled: "India,China,Germany",
    foreignMoUs: "MIT,Stanford",
    languageSupport: "English, Spanish",
    visaSupport: "Yes"
  },
  {
    instituteName: "National Arts College",
    type: "College",
    year: "1950",
    ownership: "Government",
    students: "5000",
    faculty: "300",
    description: "A prestigious college dedicated to the fine arts, humanities, and social sciences.",
    address: "456 Arts Avenue, Culture City",
    state: "New York",
    city: "New York",
    pinCode: "10001",
    email: "info@nac.gov",
    phone: "1-800-555-5678",
    website: "https://www.nac.gov",
    socialMedia: "https://instagram.com/nac",
    contactPerson: "Prof. John Smith",
    emailUsername: "nac-admin",
    password: "password456",
    declaration: true,
    subscriptionPlan: "standard",
    topRecruiters: "Art Institute,Museum of Modern Art,National Theatre",
    highestPackage: "80000 USD",
    avgPackage: "50000 USD",
    campusSize: "50 acres",
    hostelFee: "6000 USD/year",
    studentRating: "4.5/5",
    nirfRank: "15",
    placementRate: "88%",
    admissionDetails: "Portfolio submission required for all fine arts programs.",
    scholarships: "Artistic talent scholarship",
    intlStudentOffice: "Yes, available",
    countriesEnrolled: "France,Italy,Japan",
    foreignMoUs: "The Louvre,Pratt Institute",
    languageSupport: "English, French",
    visaSupport: "Yes"
  }
];

const selectedAccreditations = ["NAAC – National Assessment and Accreditation Council", "UGC Recognized"];
const selectedAffiliations = ["UGC – University Grants Commission", "AIU – Association of Indian Universities Membership"];
const selectedModes = ["Full Time", "Online"];
const facilities = [{ name: "hostel", description: "Well-furnished hostel rooms." }, { name: "library", description: "24/7 library access." }];
const branches = [{ name: "Computer Science", avgLPA: "12 LPA", highestLPA: "40 LPA" }, { name: "Mechanical Engineering", avgLPA: "8 LPA", highestLPA: "25 LPA" }];


const sendRequest = async (uniData) => {
  const form = new FormData();

  // Append text fields
  for (const key in uniData) {
    form.append(key, String(uniData[key]));
  }

  // Append arrays (stringified, as per frontend code)
  form.append('accreditations', JSON.stringify(selectedAccreditations));
  form.append('affiliations', JSON.stringify(selectedAffiliations));
  form.append('modeOfEducation', JSON.stringify(selectedModes));
  form.append('facilities', JSON.stringify(facilities));
  form.append('branches', JSON.stringify(branches));

  // Append dummy files
  const fileStream = fs.createReadStream(dummyFilePath);
  form.append('logo', fileStream, { filename: 'logo.txt' });
  form.append('bannerImage', fs.createReadStream(dummyFilePath), { filename: 'banner1.txt' });
  form.append('bannerImage', fs.createReadStream(dummyFilePath), { filename: 'banner2.txt' });
  form.append('bannerImage', fs.createReadStream(dummyFilePath), { filename: 'banner3.txt' });
  form.append('aboutImages', fs.createReadStream(dummyFilePath), { filename: 'about1.txt' });
  form.append('aboutImages', fs.createReadStream(dummyFilePath), { filename: 'about2.txt' });
  form.append('aboutImages', fs.createReadStream(dummyFilePath), { filename: 'about3.txt' });
  form.append('aboutImages', fs.createReadStream(dummyFilePath), { filename: 'about4.txt' });
  form.append('aboutImages', fs.createReadStream(dummyFilePath), { filename: 'about5.txt' });

  try {
    console.log(`Sending data for: ${uniData.instituteName}`);
    const res = await axios.post(url, form, {
      headers: form.getHeaders()
    });
    console.log(`✅ Success for ${uniData.instituteName}:`);
    console.log(res.data);
  } catch (error) {
    console.error(`❌ Error for ${uniData.instituteName}:`);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

const runTest = async () => {
  for (const uni of universities) {
    await sendRequest(uni);
    console.log('---------------------------------');
  }
  // Clean up the dummy file
  fs.unlinkSync(dummyFilePath);
  console.log('Test complete. Dummy file removed.');
};

runTest();
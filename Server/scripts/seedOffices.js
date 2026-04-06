require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Office = require("../models/Office");

const offices = [
  {
    name: "Delhi High Court",
    department: "Court",
    purpose: "Civil & Criminal Appellate",
    address: "Sher Shah Road",
    city: "New Delhi",
    state: "Delhi",
    contactNumber: "011-23381000",
    workingHours: "Mon-Sat 10:00 AM - 5:00 PM"
  },
  {
    name: "Parliament Street Police Station",
    department: "Police",
    purpose: "Law Enforcement & FIRs",
    address: "Parliament Street",
    city: "New Delhi",
    state: "Delhi",
    contactNumber: "011-23361100",
    workingHours: "24/7"
  },
  {
    name: "District Commissioner Office South",
    department: "District Administration",
    purpose: "Civil Administration & Revenue",
    address: "MB Road, Saket",
    city: "New Delhi",
    state: "Delhi",
    contactNumber: "011-29535025",
    workingHours: "Mon-Fri 09:30 AM - 5:30 PM"
  },
  {
    name: "Labour Commission Office",
    department: "Labour Department",
    purpose: "Workplace Disputes & Verification",
    address: "Sham Nath Marg",
    city: "New Delhi",
    state: "Delhi",
    contactNumber: "011-23963378",
    workingHours: "Mon-Fri 10:00 AM - 4:00 PM"
  },
  {
    name: "Directorate General of Health Services",
    department: "Health",
    purpose: "Public Health Regulations",
    address: "Nirman Bhawan",
    city: "New Delhi",
    state: "Delhi",
    contactNumber: "011-23061438",
    workingHours: "Mon-Fri 09:00 AM - 5:00 PM"
  }
];

async function seedOffices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
    
    await Office.deleteMany({});
    console.log("Cleared existing offices.");

    await Office.insertMany(offices);
    console.log("Successfully seeded", offices.length, "offices!");
    
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed offices:", error);
    process.exit(1);
  }
}

seedOffices();

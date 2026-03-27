const mongoose = require("mongoose");
const Knowledge = require("../models/Knowledge");
const Solution = require("../models/Solution");
const Source = require("../models/Source");
require("dotenv").config();

const sampleData = [
    {
        title: "Minimum Wage Requirements in India",
        category: "Labor Laws",
        explanation: "Under the Minimum Wages Act, 1948, every employee is entitled to receive minimum wages. The minimum wage varies by industry and location. For scheduled employment, it ranges from ₹176 to ₹325 per day depending on the state and type of work. Central government employees are also covered under this act.",
        keywords: ["wage", "salary", "minimum", "labor", "employment", "payment"],
        applicableStates: ["All India"],
        steps: [
            "Check the minimum wage rate for your industry and location from the official government website",
            "Ensure your employer pays at least the minimum wage",
            "Keep records of your salary payments and working hours",
            "File a complaint with the labor department if wages are not paid properly",
            "Contact the nearest labor office for assistance"
        ],
        requiredDocuments: ["Employment contract", "Salary slips", "Attendance records", "Identity proof"]
    },
    {
        title: "Overtime Pay Rules",
        category: "Labor Laws",
        explanation: "According to the Factories Act, 1948, workers are entitled to overtime pay at double the normal rate for hours worked beyond 9 hours per day or 48 hours per week. This applies to factories with 10 or more workers. The Payment of Wages Act, 1936 also regulates timely payment of wages.",
        keywords: ["overtime", "extra hours", "pay", "labor", "factory", "wages"],
        applicableStates: ["All India"],
        steps: [
            "Track your working hours carefully using a time log",
            "Calculate overtime hours (beyond 48 hours/week or 9 hours/day)",
            "Request overtime pay from your employer in writing",
            "If denied, file a complaint with the labor inspector",
            "Keep all communication records with your employer"
        ],
        requiredDocuments: ["Time sheets", "Attendance records", "Employment contract", "Salary records"]
    },
    {
        title: "Marriage Registration Process",
        category: "Family Law",
        explanation: "Marriage registration is mandatory in India under the Registration of Births and Deaths Act, 1969. Couples must register their marriage within 30 days of the ceremony. The registration provides legal proof of marriage and is required for various legal purposes including property rights, insurance claims, and government benefits.",
        keywords: ["marriage", "registration", "family", "certificate", "legal", "wedding"],
        applicableStates: ["All India"],
        steps: [
            "Collect all required documents including ID proofs and marriage photos",
            "Visit the local registrar office or marriage registrar",
            "Fill out the marriage registration form (Form 1)",
            "Pay the registration fee (varies by state, typically ₹10-100)",
            "Receive the marriage certificate within 7-30 days"
        ],
        requiredDocuments: ["Marriage invitation card", "ID proofs of both parties", "Two witnesses with ID proofs", "Marriage photos", "Address proof"]
    },
    {
        title: "Divorce by Mutual Consent",
        category: "Family Law",
        explanation: "Under Section 13B of the Hindu Marriage Act, 1955, couples can obtain divorce by mutual consent. Both parties must agree to the divorce and file a joint petition. The court may grant divorce after 6 months from the date of filing, provided the parties remain unmarried during this period. This process is faster and less contentious than contested divorce.",
        keywords: ["divorce", "mutual consent", "family", "marriage", "separation", "court"],
        applicableStates: ["All India"],
        steps: [
            "Both parties must mutually agree to the divorce",
            "Prepare and file a joint petition in the family court",
            "Wait for 6 months cooling period (can be waived in some cases)",
            "Appear before the court for final hearing",
            "Receive the divorce decree if approved by the court"
        ],
        requiredDocuments: ["Marriage certificate", "Joint petition", "ID proofs", "Address proofs", "Affidavits"]
    },
    {
        title: "Filing a Police Complaint (FIR)",
        category: "Criminal Law",
        explanation: "First Information Report (FIR) is the first step in criminal proceedings. Any person can file an FIR at a police station regarding cognizable offenses. The police must register the FIR and provide a copy to the complainant within 24 hours. FIR is crucial evidence in court proceedings.",
        keywords: ["FIR", "police", "complaint", "criminal", "offense", "investigation"],
        applicableStates: ["All India"],
        steps: [
            "Go to the nearest police station with all evidence",
            "Provide detailed information about the incident to the officer",
            "The police will register the FIR and give you a copy",
            "Keep the FIR number for future reference",
            "Follow up with the police on the investigation progress"
        ],
        requiredDocuments: ["ID proof", "Any evidence related to the incident", "Medical reports if applicable", "Witness statements"]
    },
    {
        title: "Property Registration and Stamp Duty",
        category: "Property Law",
        explanation: "Property registration is mandatory for all immovable property transactions in India. The registration provides legal ownership and prevents disputes. Documents must be registered within 4 months of execution. Stamp duty rates vary by state and property value, typically 4-8% of the property value.",
        keywords: ["property", "registration", "ownership", "real estate", "stamp duty", "transfer"],
        applicableStates: ["All India"],
        steps: [
            "Verify all property documents and ownership history",
            "Calculate and pay stamp duty at the sub-registrar office",
            "Get the documents registered within 4 months of agreement",
            "Pay registration fee (typically 1% of property value)",
            "Receive the registered documents with government stamp"
        ],
        requiredDocuments: ["Sale deed/agreement", "Previous ownership documents", "ID proofs", "Property tax receipts", "Encumbrance certificate"]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");

        // Check if data already exists
        const existingCount = await Knowledge.countDocuments();
        if (existingCount > 0) {
            console.log("Database already has data. Skipping seed.");
            process.exit(0);
        }

        // Create a sample source
        const source = await Source.create({
            type: "html",
            title: "Government Legal Resources",
            url: "https://www.india.gov.in/legal-resources",
            department: "Ministry of Law and Justice",
            verified: true
        });

        console.log("Created source:", source._id);

        // Create knowledge entries
        for (const data of sampleData) {
            const knowledge = await Knowledge.create({
                ...data,
                source: source._id,
                status: "approved",
                isActive: true
            });
            console.log("Created knowledge:", knowledge.title);

            // Create a corresponding solution
            const solution = await Solution.create({
                title: `How to ${knowledge.title.toLowerCase()}`,
                description: `Complete guide for ${knowledge.title.toLowerCase()}. ${knowledge.explanation}`,
                knowledge: knowledge._id,
                steps: knowledge.steps,
                requiredDocuments: knowledge.requiredDocuments,
                eligibility: "All eligible Indian citizens",
                estimatedTime: "1-4 weeks depending on complexity",
                estimatedCost: "₹500-5000 depending on the process",
                isActive: true
            });
            console.log("Created solution for:", knowledge.title);
        }

        console.log("Database seeded successfully with", sampleData.length, "legal topics!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
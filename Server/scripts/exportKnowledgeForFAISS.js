const mongoose = require("mongoose");
const Knowledge = require("../models/Knowledge");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const knowledge = await Knowledge.find({
    status: "approved",
    isActive: true
  }).select("_id title description");

  const data = knowledge.map(k => ({
    _id: k._id.toString(),                 // 🔑 REAL ObjectId
    text: `${k.title}. ${k.description}`   // text used for embeddings
  }));

  const outputPath = path.join(
    __dirname,
    "../ml/embeddings/knowledge_dump.json"
  );

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log("Knowledge exported for FAISS:", data.length);
  process.exit();
};

run();

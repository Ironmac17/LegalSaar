import { useState } from "react";
import api from "../../api/api";

export default function UploadDocument() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);
    await api.post("/documents/upload", form);
    alert("Uploaded");
  };

  return (
    <div className="p-8">
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={upload} className="ml-3 bg-blue-600 text-white px-3 py-1">
        Upload
      </button>
    </div>
  );
}

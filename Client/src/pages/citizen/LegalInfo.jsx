import { useState } from "react";
import api from "../../api/api";

export default function LegalInfo() {
  const [query,setQuery]=useState("");
  const [results,setResults]=useState([]);

  const search = async () => {
    const res = await api.get(`/knowledge/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-8">
      <input
        className="border p-2 mr-2"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search legal information..."
      />
      <button onClick={search} className="bg-blue-600 text-white px-3 py-2">
        Search
      </button>

      <div className="mt-6">
        {results.map(r=>(
          <div key={r._id} className="border p-3 mb-2">
            {r.title}
          </div>
        ))}
      </div>
    </div>
  );
}

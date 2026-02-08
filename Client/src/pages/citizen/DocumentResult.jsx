import { useEffect, useState } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";

export default function DocumentResult() {
  const { id } = useParams();
  const [clauses,setClauses]=useState([]);

  useEffect(()=>{
    api.get(`/documents/${id}/clauses`)
      .then(res=>setClauses(res.data));
  },[id]);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Document Analysis</h2>

      {clauses.map(c=>(
        <div key={c._id} className="border p-3 mb-3">
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

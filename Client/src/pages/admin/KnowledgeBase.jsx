import { useEffect, useState } from "react";
import { getKnowledge } from "../../api/adminApi";

export default function KnowledgeBase(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    getKnowledge().then(res=>setData(res.data));
  },[]);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Knowledge Base</h2>
      {data.map(k=>(
        <div key={k._id} className="border p-3 mb-2">
          {k.title}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Offices() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    api.get("/offices").then(res => setOffices(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Nearby Offices</h2>

      {offices.map(o => (
        <div key={o._id} className="border p-4 mb-3 rounded">
          <h3 className="font-bold">{o.name}</h3>
          <p>{o.address}</p>
          <p>{o.city}</p>
        </div>
      ))}
    </div>
  );
}

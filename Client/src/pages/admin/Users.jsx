import { useEffect, useState } from "react";
import { getUsers } from "../../api/adminApi";

export default function Users(){
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    getUsers().then(res=>setUsers(res.data));
  },[]);

  return (
    <div className="p-8">
      <h2 className="text-xl">Users</h2>
      {users.map(u=>(
        <div key={u._id}>{u.phone}</div>
      ))}
    </div>
  );
}

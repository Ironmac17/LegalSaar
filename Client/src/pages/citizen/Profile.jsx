import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="p-8">Not logged in</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">My Profile</h2>

      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

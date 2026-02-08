import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/assistant">Assistant</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <div>{children}</div>
    </div>
  );
}

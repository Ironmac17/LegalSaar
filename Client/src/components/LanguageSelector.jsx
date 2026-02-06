import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(AuthContext);

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="ta">Tamil</option>
      <option value="te">Telugu</option>
    </select>
  );
}

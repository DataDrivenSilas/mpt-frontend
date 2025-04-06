
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LandlordDashboard() {
  const [tenants, setTenants] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://mpt-backend.onrender.com/api/login", {
        email,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await axios.get("https://mpt-backend.onrender.com/api/tenants");
      setTenants(response.data);
    };
    fetchTenants();
  }, []);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Landlord Login</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Landlord!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="border rounded-xl shadow-md p-4">
            <h2 className="text-xl font-semibold">{tenant.name}</h2>
            <p className="text-sm text-gray-600">Status: {tenant.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

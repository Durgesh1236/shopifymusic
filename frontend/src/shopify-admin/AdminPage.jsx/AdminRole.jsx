import { useEffect, useState } from "react";
import { UserData } from "../../context/User";

const EmailRoleForm = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const { AdminRole, Admins, AllAdmin, loading} = UserData();

  useEffect(() => {
    AllAdmin();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminRole(email, role, setEmail, setRole);
  };

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <>
    <div className="p-4 md:p-6 -ml-[12px] md:ml-0 lg:ml-0 lg:p-8 max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-lg rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Enter Email and Select Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          placeholder="Enter email"
          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 md:p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      </div>
      {Admins && (
        <div className="my-10 -ml-[12px] p-4 md:p-6 bg-gray-100 rounded shadow-lg overflow-x-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">Admin Users (Total: {Admins.length})</h3>
          <table className="w-full border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-2 md:px-4 py-2 border">Name</th>
                <th className="px-2 md:px-4 py-2 border">Email</th>
                <th className="px-2 md:px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {Admins.map((admin) => (
                <tr key={admin._id} className="bg-white text-gray-700 text-center">
                  <td className="px-2 md:px-4 py-2 border">{admin.name || "N/A"}</td>
                  <td className="px-2 md:px-4 py-2 border">{admin.email}</td>
                  <td className="px-2 md:px-4 py-2 border">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EmailRoleForm;
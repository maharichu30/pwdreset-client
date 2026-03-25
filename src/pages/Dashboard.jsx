import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    setUser("User");

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')"
      }}
    >

      <div className="bg-black bg-opacity-60 p-10 rounded-2xl text-white text-center shadow-2xl animate-fade">
        <h1 className="text-4xl font-bold mb-4 animate-bounce">
          Welcome {user} 👋
        </h1>

        <p className="mb-6 text-lg">
          You have successfully logged in
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;
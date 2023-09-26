"use client";
import { useState, useEffect } from "react";

// Componente principal
const Home = () => {
  // Estado para guardar la información de los usuarios
  const [data, setData] = useState([]);

  // useEffect para hacer la solicitud API cuando el componente se monte
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/v1/users");
        const resData = await res.json();
        setData(resData.users);
      } catch (error) {
        console.error("Hubo un error al obtener los usuarios:", error);
      }
    };

    // Llamar a la función fetchUsers
    fetchUsers();
  }, []);

  // Renderizar el componente
  return (
    <section className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-5xl mb-5 text-center">Gestores!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((user) => (
            <div
              key={user.id}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold hover:text-yellow-400 transition duration-300">
                {user.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;

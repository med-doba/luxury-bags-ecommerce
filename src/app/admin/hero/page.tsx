// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface HeroSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
// }

// export default function HeroAdmin() {
//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [newHero, setNewHero] = useState<Omit<HeroSection, "id">>({
//     title: "",
//     subtitle: "",
//     imageUrl: "",
//   });
//   const router = useRouter();

//   useEffect(() => {
//     fetchHeroSections();
//   }, []);

//   const fetchHeroSections = async () => {
//     const response = await fetch("/api/admin/hero");
//     const data = await response.json();
//     setHeroSections(data);
//   };

//   const handleAddHero = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await fetch("/api/admin/hero", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newHero),
//     });
//     setNewHero({ title: "", subtitle: "", imageUrl: "" });
//     fetchHeroSections();
//   };

//   const handleUpdateHero = async (
//     id: string,
//     updatedHero: Partial<HeroSection>
//   ) => {
//     await fetch(`/api/admin/hero/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedHero),
//     });
//     fetchHeroSections();
//   };

//   const handleDeleteHero = async (id: string) => {
//     await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
//     fetchHeroSections();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Hero Sections</h1>

//       <form
//         onSubmit={handleAddHero}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Hero Section</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newHero.title}
//           onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Subtitle"
//           value={newHero.subtitle}
//           onChange={(e) => setNewHero({ ...newHero, subtitle: e.target.value })}
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newHero.imageUrl}
//           onChange={(e) => setNewHero({ ...newHero, imageUrl: e.target.value })}
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Hero Section
//         </button>
//       </form>

//       <div className="space-y-4">
//         {heroSections.length > 0 &&
//           heroSections.map((hero) => (
//             <div key={hero.id} className="p-4 bg-white rounded-lg shadow">
//               <h3 className="text-lg font-semibold mb-2">{hero.title}</h3>
//               <p className="text-gray-600 mb-2">{hero.subtitle}</p>
//               <img
//                 src={hero.imageUrl || "/placeholder.svg"}
//                 alt={hero.title}
//                 className="w-full h-40 object-cover mb-4 rounded"
//               />
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() =>
//                     handleUpdateHero(hero.id, {
//                       title: prompt("New title:", hero.title) || hero.title,
//                     })
//                   }
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteHero(hero.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroAdmin() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [newHero, setNewHero] = useState<Omit<HeroSection, "id">>({
    title: "",
    subtitle: "",
    imageUrl: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    const response = await fetch("/api/admin/hero");
    const data = await response.json();
    setHeroSections(data);
  };

  const handleAddHero = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHero),
    });
    setNewHero({ title: "", subtitle: "", imageUrl: "" });
    fetchHeroSections();
  };

  const handleUpdateHero = async (
    id: string,
    updatedHero: Partial<HeroSection>
  ) => {
    await fetch(`/api/admin/hero/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedHero),
    });
    fetchHeroSections();
  };

  const handleDeleteHero = async (id: string) => {
    await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
    fetchHeroSections();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Hero Sections</h1>

      <form
        onSubmit={handleAddHero}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Hero Section</h2>
        <input
          type="text"
          placeholder="Title"
          value={newHero.title}
          onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={newHero.subtitle}
          onChange={(e) => setNewHero({ ...newHero, subtitle: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newHero.imageUrl}
          onChange={(e) => setNewHero({ ...newHero, imageUrl: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Hero Section
        </button>
      </form>

      <div className="space-y-4">
        {heroSections.length > 0 &&
          heroSections.map((hero) => (
            <div key={hero.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{hero.title}</h3>
              <p className="text-gray-600 mb-2">{hero.subtitle}</p>
              <img
                src={hero.imageUrl || "/placeholder.svg"}
                alt={hero.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleUpdateHero(hero.id, {
                      title: prompt("New title:", hero.title) || hero.title,
                    })
                  }
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHero(hero.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

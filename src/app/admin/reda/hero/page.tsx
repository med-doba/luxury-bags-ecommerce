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

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, LinkIcon, X } from "lucide-react";
import Link from "next/link";

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

type ImageUploadMethod = "file" | "url";

export default function HeroAdmin() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [newHero, setNewHero] = useState<Omit<HeroSection, "id">>({
    title: "",
    subtitle: "",
    imageUrl: "",
  });
  const [imageUploadMethod, setImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const response = await fetch("/api/admin/hero");
      if (!response.ok) throw new Error("Failed to fetch hero sections");
      const data = await response.json();
      setHeroSections(data);
    } catch (error) {
      console.error("Error fetching hero sections:", error);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setNewHero((prev) => ({ ...prev, imageUrl: "" })); // Clear URL when file is selected
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewHero((prev) => ({ ...prev, imageUrl: url }));
    setImageFile(null);
    setImagePreview("");
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setNewHero((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add hero section details to formData
      formData.append("title", newHero.title);
      formData.append("subtitle", newHero.subtitle);

      // Add image URL if using URL method
      if (imageUploadMethod === "url" && newHero.imageUrl) {
        formData.append("imageUrl", newHero.imageUrl);
      }

      // Add image file if using file upload method
      if (imageUploadMethod === "file" && imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch("/api/admin/hero", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add hero section");
      }

      resetForm();
      fetchHeroSections();
    } catch (error) {
      console.error("Error adding hero section:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewHero({ title: "", subtitle: "", imageUrl: "" });
    setImageFile(null);
    setImagePreview("");
    setSubmitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdateHero = async (
    id: string,
    updatedHero: Partial<HeroSection>
  ) => {
    try {
      const response = await fetch(`/api/admin/hero/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHero),
      });

      if (!response.ok) {
        throw new Error("Failed to update hero section");
      }

      fetchHeroSections();
    } catch (error) {
      console.error("Error updating hero section:", error);
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero section?")) return;

    try {
      const response = await fetch(`/api/admin/hero/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete hero section");
      }

      fetchHeroSections();
    } catch (error) {
      console.error("Error deleting hero section:", error);
    }
  };

  const isFormValid = () => {
    return (
      newHero.title.trim() !== "" &&
      newHero.subtitle.trim() !== "" &&
      (imageFile !== null || newHero.imageUrl.trim() !== "")
    );
  };

  return (
    <div className="py-20 p-4">
      <h1 className="text-3xl font-semibold mb-6">
        <Link href={"/admin/reda"}>{`<-- back`}</Link> <br />
        Manage Hero Sections
      </h1>

      <form
        onSubmit={handleAddHero}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Hero Section</h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <input
          type="text"
          placeholder="Title"
          value={newHero.title}
          onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={newHero.subtitle}
          onChange={(e) => setNewHero({ ...newHero, subtitle: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Image Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Hero Image</h3>

          {/* Toggle between upload methods */}
          <div className="flex mb-4 border rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setImageUploadMethod("file")}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                imageUploadMethod === "file"
                  ? "bg-gray-200 font-medium"
                  : "bg-white"
              }`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageUploadMethod("url")}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                imageUploadMethod === "url"
                  ? "bg-gray-200 font-medium"
                  : "bg-white"
              }`}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Image URL
            </button>
          </div>

          {/* File upload option */}
          {imageUploadMethod === "file" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center w-full"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        Click to upload an image
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="relative">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Hero preview"
                      width={200}
                      height={200}
                      className="mx-auto h-40 object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* URL input option */}
          {imageUploadMethod === "url" && (
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newHero.imageUrl}
                  onChange={handleImageUrlChange}
                  className="flex-1 p-2 border rounded-l"
                />
                {newHero.imageUrl && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500 text-white px-3 rounded-r"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {newHero.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={newHero.imageUrl || "/placeholder.svg"}
                    alt="Hero preview"
                    width={200}
                    height={200}
                    className="mx-auto h-40 object-contain"
                    onError={() => {
                      alert("Invalid image URL. Please enter a valid URL.");
                      setNewHero((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Adding..." : "Add Hero Section"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {heroSections.map((hero) => (
          <div key={hero.id} className="p-4 bg-white rounded-lg shadow">
            <div className="relative h-40 mb-4">
              <Image
                src={hero.imageUrl || "/placeholder.svg"}
                alt={hero.title}
                fill
                className="rounded object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{hero.title}</h3>
            <p className="text-gray-600 mb-4">{hero.subtitle}</p>
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

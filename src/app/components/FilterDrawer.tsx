// "use client";

// import { useState } from "react";
// import { Plus, Minus } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Slider } from "@/components/ui/slider";

// interface FilterSection {
//   id: string;
//   title: string;
//   options: string[];
// }

// const filterSections: FilterSection[] = [
//   {
//     id: "categories",
//     title: "CATEGORIES",
//     options: [
//       "ALL BAGS",
//       "CROSSBODY BAGS",
//       "SHOULDER BAGS",
//       "TOTE BAGS",
//       "MINI BAGS",
//       "CLUTCHES",
//     ],
//   },
//   {
//     id: "colours",
//     title: "COLOURS",
//     options: [
//       "BLACK",
//       "BROWN",
//       "BEIGE",
//       "RED",
//       "PINK",
//       "GREEN",
//       "WHITE",
//       "GREY",
//       "YELLOW",
//       "BLUE",
//       "BURGUNDY",
//       "PURPLE",
//     ],
//   },
//   {
//     id: "materials",
//     title: "MATERIALS",
//     options: ["LEATHER", "CANVAS", "NYLON", "SUEDE", "COTTON", "SILK"],
//   },
//   {
//     id: "sizes",
//     title: "BAG SIZES",
//     options: ["SMALL", "MEDIUM", "LARGE"],
//   },
// ];

// interface FilterDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onApply: (filters: Record<string, string[]>) => void;
// }

// export default function FilterDrawer({
//   isOpen,
//   onClose,
//   onApply,
// }: FilterDrawerProps) {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const [selectedFilters, setSelectedFilters] = useState<
//     Record<string, string[]>
//   >({});
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [resultsCount, setResultsCount] = useState(89);

//   const toggleSection = (sectionId: string) => {
//     setExpandedSection(expandedSection === sectionId ? null : sectionId);
//   };

//   const toggleFilter = (sectionId: string, option: string) => {
//     setSelectedFilters((prev) => {
//       const sectionFilters = prev[sectionId] || [];
//       const updated = sectionFilters.includes(option)
//         ? sectionFilters.filter((item) => item !== option)
//         : [...sectionFilters, option];

//       return {
//         ...prev,
//         [sectionId]: updated,
//       };
//     });
//   };

//   const handleClear = () => {
//     setSelectedFilters({});
//     setPriceRange([0, 5000]);
//   };

//   const handleApply = () => {
//     onApply({
//       ...selectedFilters,
//       price: [priceRange[0].toString(), priceRange[1].toString()],
//     });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClose}
//         aria-hidden="true"
//       />
//       <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 overflow-hidden flex flex-col">
//         <div className="flex justify-end p-4 border-b">
//           <button
//             onClick={onClose}
//             className="text-sm font-medium hover:text-gray-600 transition-colors"
//           >
//             CLOSE
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {filterSections.map((section) => (
//             <div key={section.id} className="border-b">
//               <button
//                 onClick={() => toggleSection(section.id)}
//                 className="w-full px-4 py-5 flex justify-between items-center text-left"
//               >
//                 <span className="text-sm font-medium">{section.title}</span>
//                 {expandedSection === section.id ? (
//                   <Minus className="h-4 w-4" />
//                 ) : (
//                   <Plus className="h-4 w-4" />
//                 )}
//               </button>

//               <div
//                 className={cn(
//                   "px-4 space-y-3 overflow-hidden transition-all duration-200",
//                   expandedSection === section.id ? "pb-4" : "h-0"
//                 )}
//               >
//                 {section.options.map((option) => (
//                   <label
//                     key={option}
//                     className="flex items-center space-x-3 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       className="h-5 w-5 border-2 rounded"
//                       checked={
//                         selectedFilters[section.id]?.includes(option) || false
//                       }
//                       onChange={() => toggleFilter(section.id, option)}
//                     />
//                     <span className="text-sm">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <div className="border-b">
//             <button
//               onClick={() => toggleSection("price")}
//               className="w-full px-4 py-5 flex justify-between items-center text-left"
//             >
//               <span className="text-sm font-medium">PRICE RANGE</span>
//               {expandedSection === "price" ? (
//                 <Minus className="h-4 w-4" />
//               ) : (
//                 <Plus className="h-4 w-4" />
//               )}
//             </button>

//             <div
//               className={cn(
//                 "px-4 space-y-3 overflow-hidden transition-all duration-200",
//                 expandedSection === "price" ? "pb-4" : "h-0"
//               )}
//             >
//               <div className="pt-4">
//                 <Slider
//                   min={0}
//                   max={5000}
//                   step={100}
//                   value={priceRange}
//                   onValueChange={setPriceRange}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between mt-2">
//                   <span className="text-sm">${priceRange[0]}</span>
//                   <span className="text-sm">${priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t p-4">
//           <div className="text-sm mb-4">{resultsCount} RESULTS</div>
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               onClick={handleClear}
//               className="py-3 px-4 border border-black text-center text-sm font-medium hover:bg-gray-50 transition-colors"
//             >
//               CLEAR
//             </button>
//             <button
//               onClick={handleApply}
//               className="py-3 px-4 bg-black text-white text-center text-sm font-medium hover:bg-gray-900 transition-colors"
//             >
//               APPLY
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { useClickOutside } from "@/hooks/useClickOutside";

// interface FilterDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onApply: (filters: Record<string, string[]>) => void;
//   selectedCategoryId?: string;
// }

// export default function FilterDrawer({
//   isOpen,
//   onClose,
//   onApply,
//   selectedCategoryId,
// }: FilterDrawerProps) {
//   const [filters, setFilters] = useState<Record<string, string[]>>({
//     colours: [],
//     sizes: [],
//     categories: [],
//     price: ["0", "1000"],
//   });
//   const [allCategories, setAllCategories] = useState<
//     Array<{ id: string; name: string }>
//   >([]);
//   const drawerRef = useClickOutside<HTMLDivElement>(onClose);

//   // Fetch all categories
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch("/api/admin/categories/get-all");
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setAllCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   // Pre-select the category if selectedCategoryId is provided
//   useEffect(() => {
//     if (selectedCategoryId && allCategories.length > 0) {
//       const selectedCategory = allCategories.find(
//         (cat) => cat.id === selectedCategoryId
//       );
//       if (selectedCategory) {
//         setFilters((prev) => ({
//           ...prev,
//           categories: [selectedCategory.name.toUpperCase()],
//         }));
//       }
//     }
//   }, [selectedCategoryId, allCategories]);

//   const handleFilterChange = (
//     category: string,
//     option: string,
//     checked: boolean
//   ) => {
//     setFilters((prev) => {
//       const updatedOptions = checked
//         ? [...prev[category], option]
//         : prev[category].filter((item) => item !== option);
//       return { ...prev, [category]: updatedOptions };
//     });
//   };

//   const handlePriceChange = (min: string, max: string) => {
//     setFilters((prev) => ({ ...prev, price: [min, max] }));
//   };

//   const handleApply = () => {
//     onApply(filters);
//     onClose();
//   };

//   const handleReset = () => {
//     setFilters({
//       colours: [],
//       sizes: [],
//       categories: selectedCategoryId ? filters.categories : [],
//       price: ["0", "1000"],
//     });
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50" />
//       <div
//         ref={drawerRef}
//         className={`relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl transition-transform duration-300 transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Filters</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="space-y-8">
//             {/* Categories Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Categories</h3>
//               <div className="space-y-2">
//                 {allCategories.map((category) => (
//                   <label
//                     key={category.id}
//                     className="flex items-center space-x-2"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={filters.categories.includes(
//                         category.name.toUpperCase()
//                       )}
//                       onChange={(e) =>
//                         handleFilterChange(
//                           "categories",
//                           category.name.toUpperCase(),
//                           e.target.checked
//                         )
//                       }
//                       disabled={selectedCategoryId === category.id}
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">{category.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Colors Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Colours</h3>
//               <div className="space-y-2">
//                 {["BLACK", "WHITE", "RED", "BLUE", "GREEN"].map((color) => (
//                   <label key={color} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={filters.colours.includes(color)}
//                       onChange={(e) =>
//                         handleFilterChange("colours", color, e.target.checked)
//                       }
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">
//                       {color.charAt(0) + color.slice(1).toLowerCase()}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Sizes</h3>
//               <div className="space-y-2">
//                 {["S", "M", "L", "XL"].map((size) => (
//                   <label key={size} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={filters.sizes.includes(size)}
//                       onChange={(e) =>
//                         handleFilterChange("sizes", size, e.target.checked)
//                       }
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">{size}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Price Range Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Price Range</h3>
//               <div className="flex items-center space-x-4">
//                 <input
//                   type="number"
//                   value={filters.price[0]}
//                   onChange={(e) =>
//                     handlePriceChange(e.target.value, filters.price[1])
//                   }
//                   min="0"
//                   className="w-24 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
//                 />
//                 <span>to</span>
//                 <input
//                   type="number"
//                   value={filters.price[1]}
//                   onChange={(e) =>
//                     handlePriceChange(filters.price[0], e.target.value)
//                   }
//                   min={Number(filters.price[0])}
//                   className="w-24 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             <button
//               onClick={handleApply}
//               className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={handleReset}
//               className="w-full bg-white text-primary py-2 px-4 border border-primary rounded-md hover:bg-gray-50 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { useClickOutside } from "@/hooks/useClickOutside";

// interface FilterDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onApply: (filters: Record<string, string[]>) => void;
//   selectedCategoryId?: string;
// }

// export default function FilterDrawer({
//   isOpen,
//   onClose,
//   onApply,
//   selectedCategoryId,
// }: FilterDrawerProps) {
//   const [filters, setFilters] = useState<Record<string, string[]>>({
//     colours: [],
//     sizes: [],
//     categories: [],
//     price: ["0", "1000"],
//     stock: [], // Add stock filter
//   });
//   const [allCategories, setAllCategories] = useState<
//     Array<{ id: string; name: string }>
//   >([]);
//   const drawerRef = useClickOutside<HTMLDivElement>(onClose);

//   // Fetch all categories
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch("/api/admin/categories/get-all");
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setAllCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   // Pre-select the category if selectedCategoryId is provided
//   useEffect(() => {
//     if (selectedCategoryId && allCategories.length > 0) {
//       const selectedCategory = allCategories.find(
//         (cat) => cat.id === selectedCategoryId
//       );
//       if (selectedCategory) {
//         setFilters((prev) => ({
//           ...prev,
//           categories: [selectedCategory.name.toUpperCase()],
//         }));
//       }
//     }
//   }, [selectedCategoryId, allCategories]);

//   const handleFilterChange = (
//     category: string,
//     option: string,
//     checked: boolean
//   ) => {
//     setFilters((prev) => {
//       const updatedOptions = checked
//         ? [...prev[category], option]
//         : prev[category].filter((item) => item !== option);
//       return { ...prev, [category]: updatedOptions };
//     });
//   };

//   const handlePriceChange = (min: string, max: string) => {
//     setFilters((prev) => ({ ...prev, price: [min, max] }));
//   };

//   const handleApply = () => {
//     onApply(filters);
//     onClose();
//   };

//   const handleReset = () => {
//     setFilters({
//       colours: [],
//       sizes: [],
//       categories: selectedCategoryId ? filters.categories : [],
//       price: ["0", "1000"],
//       stock: [],
//     });
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50" />
//       <div
//         ref={drawerRef}
//         className={`relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl transition-transform duration-300 transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Filters</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="space-y-8">
//             {/* Categories Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Categories</h3>
//               <div className="space-y-2">
//                 {allCategories.map((category) => (
//                   <label
//                     key={category.id}
//                     className="flex items-center space-x-2"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={filters.categories.includes(
//                         category.name.toUpperCase()
//                       )}
//                       onChange={(e) =>
//                         handleFilterChange(
//                           "categories",
//                           category.name.toUpperCase(),
//                           e.target.checked
//                         )
//                       }
//                       disabled={selectedCategoryId === category.id}
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">{category.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Stock Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Disponibilité</h3>
//               <div className="space-y-2">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={filters.stock.includes("IN_STOCK")}
//                     onChange={(e) =>
//                       handleFilterChange("stock", "IN_STOCK", e.target.checked)
//                     }
//                     className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                   />
//                   <span className="text-gray-700">En stock</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={filters.stock.includes("OUT_OF_STOCK")}
//                     onChange={(e) =>
//                       handleFilterChange(
//                         "stock",
//                         "OUT_OF_STOCK",
//                         e.target.checked
//                       )
//                     }
//                     className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                   />
//                   <span className="text-gray-700">Rupture de stock</span>
//                 </label>
//               </div>
//             </div>

//             {/* Colors Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Colours</h3>
//               <div className="space-y-2">
//                 {["BLACK", "WHITE", "RED", "BLUE", "GREEN"].map((color) => (
//                   <label key={color} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={filters.colours.includes(color)}
//                       onChange={(e) =>
//                         handleFilterChange("colours", color, e.target.checked)
//                       }
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">
//                       {color.charAt(0) + color.slice(1).toLowerCase()}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Sizes</h3>
//               <div className="space-y-2">
//                 {["S", "M", "L", "XL"].map((size) => (
//                   <label key={size} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={filters.sizes.includes(size)}
//                       onChange={(e) =>
//                         handleFilterChange("sizes", size, e.target.checked)
//                       }
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//                     />
//                     <span className="text-gray-700">{size}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Price Range Filter */}
//             <div>
//               <h3 className="text-lg font-medium mb-4">Price Range</h3>
//               <div className="flex items-center space-x-4">
//                 <input
//                   type="number"
//                   value={filters.price[0]}
//                   onChange={(e) =>
//                     handlePriceChange(e.target.value, filters.price[1])
//                   }
//                   min="0"
//                   className="w-24 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
//                 />
//                 <span>to</span>
//                 <input
//                   type="number"
//                   value={filters.price[1]}
//                   onChange={(e) =>
//                     handlePriceChange(filters.price[0], e.target.value)
//                   }
//                   min={Number(filters.price[0])}
//                   className="w-24 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             <button
//               onClick={handleApply}
//               className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={handleReset}
//               className="w-full bg-white text-primary py-2 px-4 border border-primary rounded-md hover:bg-gray-50 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

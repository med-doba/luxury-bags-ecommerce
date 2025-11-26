"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Plus, Minus } from "lucide-react";

// Removed predefined colors - now using custom color picker only

// Size options for bags
const BAG_SIZE_OPTIONS = [
  { name: "MINI", value: "mini" },
  { name: "SMALL", value: "small" },
  { name: "MEDIUM", value: "medium" },
  { name: "LARGE", value: "large" },
];

// Size options for shoes
const SHOES_SIZE_OPTIONS = [
  { name: "35", value: "35" },
  { name: "36", value: "36" },
  { name: "37", value: "37" },
  { name: "38", value: "38" },
  { name: "39", value: "39" },
  { name: "40", value: "40" },
  { name: "41", value: "41" },
  { name: "42", value: "42" },
  { name: "43", value: "43" },
  { name: "44", value: "44" },
  { name: "45", value: "45" },
];

export interface ColorSizeVariantData {
  id?: string;
  size: string;
  stock: number;
  price?: number;
}

export interface ColorVariantData {
  id?: string;
  color: string;
  colorHex?: string; // Add hex color support
  stock: number;
  images: ColorVariantImageData[];
  newImages: File[];
  sizeVariants: ColorSizeVariantData[];
}

export interface ColorVariantImageData {
  id?: string;
  url: string;
  isExisting?: boolean;
}

interface ColorVariantManagerProps {
  colorVariants: ColorVariantData[];
  onChange: (colorVariants: ColorVariantData[]) => void;
  disabled?: boolean;
  basePrice?: number;
  productType?: string; // "bag" or "shoes"
}

export default function ColorVariantManager({
  colorVariants,
  onChange,
  disabled = false,
  basePrice = 0,
  productType = "bag",
}: ColorVariantManagerProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorVariants.map((cv) => cv.color)
  );

  // Custom color creation state
  const [showCustomColorForm, setShowCustomColorForm] = useState(false);
  const [customColorName, setCustomColorName] = useState("");
  const [customColorHex, setCustomColorHex] = useState("#000000");

  const fileInputRefs = useRef<{ [color: string]: HTMLInputElement | null }>(
    {}
  );

  // Helper function to get size options based on product type
  const getSizeOptions = () => {
    return productType === "shoes" ? SHOES_SIZE_OPTIONS : BAG_SIZE_OPTIONS;
  };

  const addColorVariant = (color: string, colorHex: string) => {
    const newVariant: ColorVariantData = {
      color,
      colorHex,
      stock: 0,
      images: [],
      newImages: [],
      sizeVariants: [],
    };

    const updatedVariants = [...colorVariants, newVariant];
    setSelectedColors([...selectedColors, color]);
    onChange(updatedVariants);
  };

  const addCustomColorVariant = () => {
    if (!customColorName.trim()) return;

    // Check if color already exists
    if (selectedColors.includes(customColorName.toLowerCase())) {
      alert("A color with this name already exists!");
      return;
    }

    addColorVariant(customColorName.toLowerCase(), customColorHex);

    // Reset form
    setCustomColorName("");
    setCustomColorHex("#000000");
    setShowCustomColorForm(false);
  };

  const removeColorVariant = (color: string) => {
    const updatedVariants = colorVariants.filter((cv) => cv.color !== color);
    const updatedColors = selectedColors.filter((c) => c !== color);

    setSelectedColors(updatedColors);
    onChange(updatedVariants);
  };

  const updateColorVariantStock = (color: string, stock: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color ? { ...cv, stock } : cv
    );
    onChange(updatedVariants);
  };

  const handleImageUpload = (color: string, files: FileList) => {
    const filesArray = Array.from(files);
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? { ...cv, newImages: [...cv.newImages, ...filesArray] }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeNewImage = (color: string, imageIndex: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            newImages: cv.newImages.filter((_, index) => index !== imageIndex),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeExistingImage = (color: string, imageIndex: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            images: cv.images.filter((_, index) => index !== imageIndex),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const getColorHex = (colorName: string) => {
    // Get hex from the color variant
    const colorVariant = colorVariants.find((cv) => cv.color === colorName);
    return colorVariant?.colorHex || "#000000";
  };

  const getColorDisplayName = (colorName: string) => {
    // Capitalize the color name
    return colorName.charAt(0).toUpperCase() + colorName.slice(1);
  };

  // Size variant management functions
  const addSizeVariant = (color: string, size: string) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: [
              ...cv.sizeVariants,
              { size, stock: 0, price: undefined },
            ],
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeSizeVariant = (color: string, size: string) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: cv.sizeVariants.filter((sv) => sv.size !== size),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const updateSizeVariant = (
    color: string,
    size: string,
    updates: Partial<ColorSizeVariantData>
  ) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: cv.sizeVariants.map((sv) =>
              sv.size === size ? { ...sv, ...updates } : sv
            ),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const getSizeName = (sizeValue: string) => {
    const sizeOptions = getSizeOptions();
    const sizeOption = sizeOptions.find((s) => s.value === sizeValue);
    return sizeOption?.name || sizeValue.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Color Variants
        </label>

        {/* Color Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-600">Colors</h4>
            {!showCustomColorForm && (
              <button
                type="button"
                onClick={() => setShowCustomColorForm(true)}
                disabled={disabled}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Add Color
              </button>
            )}
          </div>

          {/* Color Form */}
          {showCustomColorForm && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={customColorName}
                    onChange={(e) => setCustomColorName(e.target.value)}
                    placeholder="e.g., Rose Gold, Midnight Blue"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={customColorHex}
                      onChange={(e) => setCustomColorHex(e.target.value)}
                      className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      value={customColorHex}
                      onChange={(e) => setCustomColorHex(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                      placeholder="#000000"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={addCustomColorVariant}
                    disabled={disabled || !customColorName.trim()}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomColorForm(false);
                      setCustomColorName("");
                      setCustomColorHex("#000000");
                    }}
                    disabled={disabled}
                    className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Display Colors */}
          {colorVariants.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {colorVariants.map((variant) => (
                  <div
                    key={variant.color}
                    className="relative flex flex-col items-center p-3 rounded-lg border-2 border-blue-500 bg-blue-50"
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-200 mb-2"
                      style={{ backgroundColor: variant.colorHex || "#000000" }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center">
                      {getColorDisplayName(variant.color)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeColorVariant(variant.color)}
                      disabled={disabled}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Color Variants Management */}
      {colorVariants.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">
            Color Variants & Images
          </h3>

          {colorVariants.map((variant) => (
            <div
              key={variant.color}
              className="border border-gray-200 rounded-lg p-4 space-y-4"
            >
              {/* Color Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: getColorHex(variant.color) }}
                  />
                  <h4 className="text-md font-medium text-gray-900">
                    Images for {getColorDisplayName(variant.color)}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => removeColorVariant(variant.color)}
                  disabled={disabled}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Size Variants Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-gray-900">
                    Size Variants for {getColorDisplayName(variant.color)}
                  </h5>
                </div>

                {/* Size Selection */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {getSizeOptions().map((size) => {
                    const isSelected = variant.sizeVariants.some(
                      (sv) => sv.size === size.value
                    );
                    return (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            removeSizeVariant(variant.color, size.value);
                          } else {
                            addSizeVariant(variant.color, size.value);
                          }
                        }}
                        disabled={disabled}
                        className={`
                          px-3 py-2 text-xs font-medium rounded border transition-colors
                          ${
                            isSelected
                              ? "bg-blue-100 border-blue-300 text-blue-700"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                          }
                          ${
                            disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }
                        `}
                      >
                        {size.name}
                      </button>
                    );
                  })}
                </div>

                {/* Size Variant Details */}
                {variant.sizeVariants.length > 0 && (
                  <div className="space-y-3">
                    <h6 className="text-sm font-medium text-gray-700">
                      Size Details:
                    </h6>
                    <div className="space-y-2">
                      {variant.sizeVariants
                        .sort((a, b) => {
                          const sizeOptions = getSizeOptions();
                          const orderA = sizeOptions.findIndex(
                            (opt) => opt.value === a.size
                          );
                          const orderB = sizeOptions.findIndex(
                            (opt) => opt.value === b.size
                          );
                          return orderA - orderB;
                        })
                        .map((sizeVariant) => (
                          <div
                            key={sizeVariant.size}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded border"
                          >
                            <div className="flex-shrink-0">
                              <span className="text-sm font-medium text-gray-700">
                                {getSizeName(sizeVariant.size)}:
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-xs text-gray-600">
                                Stock:
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={sizeVariant.stock}
                                onChange={(e) =>
                                  updateSizeVariant(
                                    variant.color,
                                    sizeVariant.size,
                                    {
                                      stock: parseInt(e.target.value) || 0,
                                    }
                                  )
                                }
                                disabled={disabled}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-xs text-gray-600">
                                Price Override ($):
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={sizeVariant.price || ""}
                                onChange={(e) =>
                                  updateSizeVariant(
                                    variant.color,
                                    sizeVariant.size,
                                    {
                                      price: e.target.value
                                        ? parseFloat(e.target.value)
                                        : undefined,
                                    }
                                  )
                                }
                                disabled={disabled}
                                placeholder={basePrice.toString()}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                              />
                              {!sizeVariant.price && (
                                <span className="text-xs text-gray-400">
                                  (uses base: ${basePrice})
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeSizeVariant(
                                  variant.color,
                                  sizeVariant.size
                                )
                              }
                              disabled={disabled}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {variant.sizeVariants.length === 0 && (
                  <div className="text-center py-3 text-gray-500 text-sm bg-gray-50 rounded border-2 border-dashed">
                    No sizes selected. Click size buttons above to add size
                    variants.
                  </div>
                )}
              </div>

              {/* Image Upload Area */}
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[variant.color] = el;
                    }}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        handleImageUpload(variant.color, e.target.files);
                        e.target.value = "";
                      }
                    }}
                    className="hidden"
                    disabled={disabled}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRefs.current[variant.color]?.click()
                    }
                    disabled={disabled}
                    className="inline-flex flex-col items-center justify-center w-full disabled:opacity-50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 text-sm">
                      Upload images for {getColorDisplayName(variant.color)}
                    </span>
                    <span className="text-gray-400 text-xs mt-1">
                      PNG, JPG, GIF up to 10MB each
                    </span>
                  </button>
                </div>

                {/* Existing Images */}
                {variant.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Current Images:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {variant.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image.url}
                            alt={`${getColorDisplayName(variant.color)} image ${
                              index + 1
                            }`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeExistingImage(variant.color, index)
                            }
                            disabled={disabled}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {variant.newImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      New Images:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {variant.newImages.map((file, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`New ${getColorDisplayName(
                              variant.color
                            )} image ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(variant.color, index)}
                            disabled={disabled}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {colorVariants.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-sm">
            Select colors above to start adding images for each color variant
          </p>
        </div>
      )}
    </div>
  );
}

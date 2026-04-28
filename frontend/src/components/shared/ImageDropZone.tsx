import React, { useRef, useState } from "react";

type Props = {
  value?: File | null;
  onChange: (file: File | null) => void;
  label: string;
};

export default function ImageDropzone({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;

    // 🔥 validation (client-side quick check)
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Max size 2MB");
      return;
    }

    onChange(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        type="file"
        hidden
         accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <p className="text-sm text-gray-600">{label}</p>

      {!value ? (
        <p className="text-xs text-gray-400 mt-1">
          Drag & drop or click to upload
        </p>
      ) : (
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-green-600">
            ✅ File selected
          </p>
          <p className="text-xs text-gray-500">
            {value.name} ({(value.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      )}
    </div>
  );
}
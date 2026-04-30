import { Avatar } from 'antd';
import React from 'react'
type Props ={
    label:string;
    preview?:string;
    setPreview:(v:string | undefined) => void;
    url?:string;
    setFile:(file: File | null) => void;
    error?:{message?:string};
    type:"avatar" | "front" | "back";
    shape?:"circle" | "square";
    size?: number;
    isEdit:boolean;
    onFileChange:(e:React.ChangeEvent<HTMLInputElement>,type:string) => void;
    setPreviewImage:(img?:string) => void;
}
function FileUploadField({label,preview,setPreview,url,setFile,error,isEdit,type,shape,size,onFileChange,setPreviewImage}:Props) {
  return (
     <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
      <p className="text-sm text-gray-500">{label}</p>

      <div className="relative group">
        <Avatar
          shape={shape === "circle" ? undefined : "square"}
          size={size}
          src={preview || url}
          className={`border cursor-pointer ${
            preview ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => setPreviewImage(preview || url)}
        >
          {label === "Avatar" ? "A" : "No Image"}
        </Avatar>

        {isEdit && (
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs cursor-pointer opacity-0 group-hover:opacity-100 rounded-md">
            Change
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => onFileChange(e, type)}
            />
          </label>
        )}
      </div>

      {/* Always visible change */}
      {isEdit && (
        <label className="text-xs text-blue-500 cursor-pointer">
          Change
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => onFileChange(e, type)}
          />
        </label>
      )}

      <p className="text-xs text-gray-400">JPG, PNG • Max 5MB</p>

      {isEdit && preview && (
        <button
          className="text-xs text-red-600 font-medium"
          onClick={() => {
            setFile(null);
            setPreview(undefined);
          }}
        >
          Remove Image
        </button>
      )}

      {error && (
        <p className="text-red-700 text-xs">{error.message}</p>
      )}
    </div>
  )
}

export default FileUploadField
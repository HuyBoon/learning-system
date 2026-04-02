'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  label?: string;
}

export default function CloudinaryUpload({ 
  value, 
  onChange, 
  onRemove,
  folder = 'learning-system',
  label = 'Course Thumbnail'
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const data = await uploadToCloudinary(file, folder);
      onChange(data.secure_url);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      // Reset input value so same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest transition-colors mb-2">
        <ImageIcon className="h-4 w-4" />
        <span>{label}</span>
      </label>

      {value ? (
        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-slate-200 group shadow-sm bg-slate-50">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-700"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemove?.();
              }}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
              title="Remove image"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative aspect-video rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer group
            ${isUploading ? 'bg-slate-50 border-slate-200 cursor-wait' : 'bg-white border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30'}
          `}
        >
          {isUploading ? (
            <div className="text-center space-y-4">
              <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
              <p className="text-slate-500 font-bold animate-pulse">Uploading to Cloud...</p>
            </div>
          ) : (
            <div className="text-center space-y-3 px-6">
              <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:bg-indigo-100 duration-500">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-lg tracking-tight">Click or drag to upload</p>
                <p className="text-slate-400 font-bold text-sm">PNG, JPG or WebP (max 5MB)</p>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  );
}

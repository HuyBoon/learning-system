/**
 * Cloudinary Utility for Unsigned Uploads
 * Documentation: https://cloudinary.com/documentation/upload_images#unsigned_upload
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dxxxxxxxxx';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'huyboon_academy_unsigned';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export const uploadToCloudinary = async (
  file: File, 
  folder: string = 'learning-system'
): Promise<CloudinaryResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to upload to Cloudinary');
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'An unexpected error occurred during upload');
  }
};

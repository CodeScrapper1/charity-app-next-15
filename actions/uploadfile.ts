"use server";

interface IUploadImage {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export const uploadFile = async (file: File): Promise<IUploadImage> => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "charity-app");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response?.ok) {
      throw new Error(`File upload failed with status ${response.status}`);
    }
    const res = await response.json();

    return res as IUploadImage;
  } catch (error) {
    console.log("error uploading file", error);
    throw error;
  }
};

import axiosInstance from './axiosInstance';
import { API_PATHS } from './config';

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  //   Append image file to formdata
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image', error);
    throw error;
  }
};

export default uploadImage;

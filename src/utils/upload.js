import auth from './auth';
import { useToast } from 'vue-toastification';

const toast = useToast();

class Upload {
  static async api(path, file, folder) {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/upload/${path}?folder=${
        folder || 'images'
      }`;
      const formData = new FormData();

      formData.append(path, file);

      const response = await auth.authorizedRequest(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error();

      const result = await response.json();

      return result;
    } catch (error) {
      return error;
      toast.error('Something went wrong');
    }
  }

  static image(file, folder) {
    if (!file) return toast.error('File is required');

    const validFileType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (!validFileType.includes(file.type)) {
      toast.error('Invalid file');

      return Promise.reject('Invalid file');
    }
    if (file.size > 240000) {
      toast.error('Image too large (Max 240KB)');

      return Promise.reject('Image too large');
    }

    return this.api('image', file, folder);
  }
}

export default Upload;

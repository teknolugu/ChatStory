import auth from './auth';

function validateFile(file, types, maxSize) {
  if (!types.includes(file.type)) {
    return {
      invalid: true,
      message: 'Invalid file',
    };
  }
  if (file.size >= maxSize) {
    return {
      invalid: true,
      message: `File too large (max. ${maxSize / 1024}KB)`,
    };
  }

  return { invalid: false };
}

class Upload {
  static async api(path, file, folder) {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/upload/${path}?folder=${folder || ''}`;
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
      console.error(error);
      return error;
    }
  }

  static image(file, folder) {
    if (!file) return 'File is required';

    const validFileType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const { invalid, message } = validateFile(file, validFileType, 245760);

    if (invalid) {
      return Promise.reject(message);
    }

    return this.api('image', file, folder);
  }

  static audio(file, folder) {
    if (!file) return 'File is required';

    const validFileType = ['audio/wav', 'audio/mpeg'];
    const { invalid, message } = validateFile(file, validFileType, 368640);

    if (invalid) {
      return Promise.reject(message);
    }

    return this.api('audio', file, folder);
  }
}

export default Upload;

import { ImageProp } from '../components/CameraScreen';

export const sendFile = async (
  files: ImageProp,
  setResponse: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const formData = new FormData();
    formData.append('files[]', files.fullWidth);

    const result = await fetch('http://192.168.0.10:3000', {
      method: 'POST',
      body: formData,
    });

    if (!result.ok) {
      throw new Error(`Server responded with status: ${result.status}`);
    }

    const data = await result.json();
    setResponse((prevResponse) => {
      return [...prevResponse, data.levels];
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

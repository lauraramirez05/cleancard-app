import { ImageProp } from '../components/CameraScreen';

export const sendFile = async (
  files: ImageProp,
  setBiomarkersData: React.Dispatch<React.SetStateAction<any>>
) => {
  const yourUrl = `192.168.1.155`;

  try {
    const formData = new FormData();
    formData.append('files[]', files.fullWidth);

    const response = await fetch(`http://${yourUrl}:3000`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    setBiomarkersData((prevResponse) => {
      return [...prevResponse, result.levels];
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

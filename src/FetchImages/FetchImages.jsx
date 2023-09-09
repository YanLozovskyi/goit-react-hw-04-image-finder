const fetchImages = async ({ query, page }) => {
  const API_KEY = '36892972-3965195d48ffcffaf1a3741cc';

  const baseURL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(baseURL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`No data on request`);
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default fetchImages;

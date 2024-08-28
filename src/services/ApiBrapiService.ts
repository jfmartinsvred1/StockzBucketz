import axios from 'axios';

export async function fetchStockData() {
  try {
    const response = await axios.get('https://brapi.dev/api/quote/list?token=e1N2Rv5dStx9u6xCzsveoN?search=ibo', {
      params: {
      },
    });

    return response.data.stocks
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
}

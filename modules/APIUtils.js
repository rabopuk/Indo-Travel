export const fetchData = async url => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getData = async (url) => {
  try {
    const data = await fetchData(url);

    return data;
  } catch (error) {
    console.error('Failed to fetch data: ', error.message);
  }
};


export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Problem with the fetch operation: ', error.message);
    throw error;
  }
};

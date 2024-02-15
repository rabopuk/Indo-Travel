
export const URL = 'https://jsonplaceholder.typicode.com/posts';
// export const URL = 'false address trulyayaaaaaa';
export const LOCAL_URL = 'date.json';

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

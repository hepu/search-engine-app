import querystring from 'querystring';

export default {
  search: async (options) => {
    const url = `${process.env.API_URL}/search?${querystring.stringify(options)}`;

    console.debug('[API] GET ', url);
    try {
      const response = await fetch(url);

      if (response.ok) {
        return response.json();
      }
    } catch (e) {
      console.error('Error fetching', e);
    }

    return {
      error: 'API timeout',
    };
  },
};

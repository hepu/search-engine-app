import fetchMock from 'fetch-mock';
import querystring from 'querystring';

/* eslint-disable import/first */
process.env.API_URL = 'http://test.com';

import api from '../api';

describe('Api tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('search', () => {
    describe('when API responds successfully', () => {
      it('returns the query resulting items', async () => {
        const text = 'test';
        const engine = 'google';

        fetchMock.getOnce(`${process.env.API_URL}/search?${querystring.stringify({ text, engine })}`, {
          body: { items: [{ title: 'test' }], pagination: { page: 1 } },
          headers: { 'content-type': 'application/json' },
        });

        const response = await api.search({ text, engine });

        return expect(response).toEqual({
          items: [
            {
              title: 'test',
            },
          ],
          pagination: {
            page: 1,
          },
        });
      });
    });

    describe('when API has an error', () => {
      it('returns an error', async () => {
        const text = 'test';
        const engine = 'google';

        fetchMock.getOnce(`${process.env.API_URL}/search?${querystring.stringify({ text, engine })}`, 500);

        const response = await api.search({ text, engine });

        return expect(response.error).not.toBe(null);
      });
    });
  });
});

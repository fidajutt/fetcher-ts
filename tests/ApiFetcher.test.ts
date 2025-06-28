import { describe, it, expect } from '@jest/globals';
import { apiFetcher } from '../src';

describe('ApiFetcher', () => {
  const fetcher = apiFetcher({ baseUrl: 'https://api.example.com', timeout: 5000, retries: 3 });

  it('should handle GET requests', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'test' }),
      })
    ) as jest.Mock;

    const response = await fetcher.get('/test-endpoint');
    expect(response).toEqual({ data: 'test' });
  });

  it('should handle POST requests', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    const response = await fetcher.post('/test-endpoint', { key: 'value' });
    expect(response).toEqual({ success: true });
  });

  it('should retry on failure', async () => {
    let attempt = 0;
    global.fetch = jest.fn(() => {
      attempt++;
      if (attempt < 3) {
        return Promise.reject(new Error('Network error'));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'retried' }),
      });
    }) as jest.Mock;

    const response = await fetcher.get('/retry-endpoint');
    expect(response).toEqual({ data: 'retried' });
    expect(attempt).toBe(3);
  });
});
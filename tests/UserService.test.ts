import { describe, it, expect } from '@jest/globals';
import { UserService } from '../src/UserService';
import { apiFetcher } from '../src';

describe('UserService', () => {
  const fetcher = apiFetcher({ baseUrl: 'https://api.example.com', timeout: 5000, retries: 3 });
  const userService = new UserService(fetcher);

  it('should fetch user data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '123', name: 'John Doe' }),
      })
    ) as jest.Mock;

    const response = await userService.getUser('123');
    expect(response).toEqual({ id: '123', name: 'John Doe' });
  });

  it('should create a new user', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    const response = await userService.createUser({ name: 'Jane Doe' });
    expect(response).toEqual({ success: true });
  });
});
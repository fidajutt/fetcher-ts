import { describe, it, expect } from '@jest/globals';
import { ProductService } from '../src/ProductService';
import { apiFetcher } from '../src';

describe('ProductService', () => {
  const fetcher = apiFetcher({ baseUrl: 'https://api.example.com', timeout: 5000, retries: 3 });
  const productService = new ProductService(fetcher);

  it('should fetch product data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '456', name: 'Sample Product' }),
      })
    ) as jest.Mock;

    const response = await productService.getProduct('456');
    expect(response).toEqual({ id: '456', name: 'Sample Product' });
  });

  it('should create a new product', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    const response = await productService.createProduct({ name: 'New Product' });
    expect(response).toEqual({ success: true });
  });
});
import { ApiFetcher } from './index';

export class ProductService {
  private fetcher: ApiFetcher;

  constructor(fetcher: ApiFetcher) {
    this.fetcher = fetcher;
  }

  public async getProducts(): Promise<any> {
    return this.fetcher.get('/products');
  }

  public async getProduct(productId: string): Promise<any> {
    return this.fetcher.get(`/products/${productId}`);
  }

  public async createProduct(productData: any): Promise<any> {
    return this.fetcher.post('/products', productData);
  }
}
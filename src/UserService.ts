import { ApiFetcher } from './index';

export class UserService {
  private fetcher: ApiFetcher;

  constructor(fetcher: ApiFetcher) {
    this.fetcher = fetcher;
  }

  public async getUser(userId: string): Promise<any> {
    return this.fetcher.get(`/users/${userId}`);
  }

  public async createUser(userData: any): Promise<any> {
    return this.fetcher.post('/users', userData);
  }
}
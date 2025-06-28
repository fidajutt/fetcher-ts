export interface FetcherConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

export class ApiFetcher {
  private config: FetcherConfig;

  constructor(config: FetcherConfig) {
    this.config = config;
  }

  private async fetchWithRetries(url: string, options: RequestInit, retries: number): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout || 5000);
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok && retries > 0) {
        return this.fetchWithRetries(url, options, retries - 1);
      }

      return response;
    } catch (error) {
      if (retries > 0) {
        return this.fetchWithRetries(url, options, retries - 1);
      }
      throw error;
    }
  }

  public async get(endpoint: string): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const response = await this.fetchWithRetries(url, { method: 'GET' }, this.config.retries || 3);
    return response.json();
  }

  public async post(endpoint: string, body: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const response = await this.fetchWithRetries(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      this.config.retries || 3
    );
    return response.json();
  }
}

export function apiFetcher(config: FetcherConfig): ApiFetcher {
  return new ApiFetcher(config);
}

export function objectDiff(obj1: Record<string, any>, obj2: Record<string, any>) {
  const added: Record<string, any> = {};
  const removed: Record<string, any> = {};
  const changed: Record<string, { from: any; to: any }> = {};

  for (const key in obj2) {
    if (!(key in obj1)) {
      added[key] = obj2[key];
    } else if (obj1[key] !== obj2[key]) {
      changed[key] = { from: obj1[key], to: obj2[key] };
    }
  }

  for (const key in obj1) {
    if (!(key in obj2)) {
      removed[key] = obj1[key];
    }
  }

  return { added, removed, changed };
}
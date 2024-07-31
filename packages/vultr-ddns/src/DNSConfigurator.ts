export class DNSConfigurator {
  private readonly apiKey: string;
  private readonly domain: string;
  private readonly subdomain: string;

  constructor(apiKey: string, domain: string, subdomain: string) {
    this.apiKey = apiKey;
    this.domain = domain;
    this.subdomain = subdomain;
  }

  public async setIPv4(address: string, ttl: number) {}

  public async setIPv6(address: string, ttl: number) {}
}

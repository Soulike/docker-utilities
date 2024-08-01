import type {VultrDNSRecord, VultrDNSRecords} from './VultrApi.js';
import * as assert from 'node:assert';
import {DNSRecord, IPv4DNSRecord, IPv6DNSRecord} from './DNSRecord.js';
import {Address4, Address6} from 'ip-address';

export class DNSConfigurator {
  private readonly apiKey: string;
  private readonly domain: string;
  private readonly subdomain: string;

  /**
   * @param apiKey - Vultr API key.
   * @param domain - The domain used for DNS.
   * @param subdomain - The subdomain used for DNS. No trailing dot.
   *
   * For `foo.example.com`, `domain` is `example.com`, `subdomain` is `foo`
   */
  constructor(apiKey: string, domain: string, subdomain: string) {
    this.apiKey = apiKey;
    this.domain = domain;
    this.subdomain = subdomain;
  }

  public async setIPv4(
    address: IPv4DNSRecord['data'],
    ttl: IPv4DNSRecord['ttl'],
  ) {
    assert.ok(
      Address4.isValid(address),
      `Trying to set an invalid address ${address}`,
    );
    const record = new IPv4DNSRecord(address, this.subdomain, 0, ttl);
    return this.setDNSRecord(record);
  }

  public async setIPv6(
    address: IPv6DNSRecord['data'],
    ttl: IPv6DNSRecord['ttl'],
  ) {
    assert.ok(
      Address6.isValid(address),
      `Trying to set an invalid address ${address}`,
    );
    const record = new IPv6DNSRecord(address, this.subdomain, 0, ttl);
    return this.setDNSRecord(record);
  }

  private async setDNSRecord(record: DNSRecord) {
    const serverRecord = await this.getDnsRecordFromServer(record.type);
    if (serverRecord.data === record.data) {
      return;
    }

    const url = new URL(
      `https://api.vultr.com/v2/domains/${this.domain}/records/${serverRecord.id}`,
    );
    const headers = this.getRequestHeadersWithAPIKey();
    headers.set('Content-Type', 'application/json');
    const body = JSON.stringify(record);
    await fetch(url, {
      method: 'PATCH',
      headers,
      body,
    });
  }

  private async getAllDnsRecordsFromServer(): Promise<VultrDNSRecords> {
    const url = new URL(
      `https://api.vultr.com/v2/domains/${this.domain}/records`,
    );
    const headers = this.getRequestHeadersWithAPIKey();

    const response = await fetch(url, {method: 'GET', headers});
    return response.json();
  }

  private async getDnsRecordFromServer(
    dnsType: DNSRecord['type'],
  ): Promise<VultrDNSRecord> {
    const {records} = await this.getAllDnsRecordsFromServer();
    const record = records.find(
      (record) => record.name === this.subdomain && record.type === dnsType,
    );
    assert.ok(
      record,
      `DNS record for ${this.subdomain}.${this.domain} in type ${dnsType} not found.`,
    );
    return record;
  }

  private getRequestHeadersWithAPIKey() {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${this.apiKey}`);
    return headers;
  }
}

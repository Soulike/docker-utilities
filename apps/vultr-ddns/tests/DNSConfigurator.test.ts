import {afterAll, beforeAll, describe, expect} from '@jest/globals';
import {DNSConfigurator} from '../src/DNSConfigurator';
import {env} from 'node:process';
import * as assert from 'node:assert';

describe('DNSConfigurator', () => {
  let dnsConfigurator: DNSConfigurator;

  beforeAll(async () => {
    const apiKey = env['VULTR_API_KEY'];
    assert.ok(
      apiKey,
      'Vultr API Key is not set as environment variable VULTR_API_KEY',
    );
    dnsConfigurator = new DNSConfigurator(apiKey, 'soulike.tech', 'test.ddns');
  });

  afterAll(async () => {
    await Promise.all([
      dnsConfigurator.setIPv4('127.0.0.1', 300),
      dnsConfigurator.setIPv6('::1', 300),
    ]);
  });

  it('should set IPv4', async () => {
    const ip = '192.168.123.45';
    await dnsConfigurator.setIPv4(ip, 300);
    const ipv4OnDNSServer = await dnsConfigurator.getIPv4();
    expect(ipv4OnDNSServer).toBe(ip);
  });

  it('should set IPv6', async () => {
    const ip = '8440:89aa:a063:8dd0:cb2b:a67c:60c0:85d3';
    await dnsConfigurator.setIPv6(ip, 300);
    const ipv6OnDNSServer = await dnsConfigurator.getIPv6();
    expect(ipv6OnDNSServer).toBe(ip);
  });
});

import {afterAll, beforeAll, describe, expect} from '@jest/globals';
import {DNSConfigurator} from '../src/DNSConfigurator';
import {env} from 'node:process';
import * as assert from 'node:assert';
import {IPQuery} from '../src/IPQuery';

describe('DNSConfigurator', () => {
  let dnsConfigurator: DNSConfigurator;

  beforeAll(async () => {
    const apiKey = env['VULTR_API_KEY'];
    assert.ok(apiKey, 'Vultr API Key is not set as environment variable VULTR_API_KEY');
    dnsConfigurator = new DNSConfigurator(apiKey, 'soulike.tech', 'test.ddns');
  });

  afterAll(async () => {
    await Promise.all([
      dnsConfigurator.setIPv4('127.0.0.1', 300),
      dnsConfigurator.setIPv6('::1', 300)]);
  });

  it('should set IPv4', async () => {
    const currentIPv4 = await IPQuery.getIPv4();
    await dnsConfigurator.setIPv4(currentIPv4, 300);
    const ipv4OnDNSServer = await dnsConfigurator.getIPv4();
    expect(ipv4OnDNSServer).toBe(currentIPv4);
  });

  it('should set IPv6', async () => {
    const currentIPv6 = await IPQuery.getIPv6();
    await dnsConfigurator.setIPv6(currentIPv6, 300);
    const ipv6OnDNSServer = await dnsConfigurator.getIPv6();
    expect(ipv6OnDNSServer).toBe(currentIPv6);
  });
});

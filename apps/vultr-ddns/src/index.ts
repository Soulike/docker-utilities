import {env} from 'node:process';
import * as assert from 'node:assert';
import {DNSConfigurator} from './DNSConfigurator.js';
import {IPQuery} from './IPQuery.js';

const API_KEY = env['VULTR_API_KEY'];
const DOMAIN = env['DOMAIN'];
const IPV4_SUBDOMAIN = env['IPV4_SUBDOMAIN'];
const IPV6_SUBDOMAIN = env['IPV6_SUBDOMAIN'];
const DDNS_INTERVAL = Number.parseInt(env['DDNS_INTERVAL'] ?? '600');

assert.ok(API_KEY, 'Environment variable VULTR_API_KEY is not set properly.');
assert.ok(DOMAIN, 'Environment variable DOMAIN is not set properly.');
assert.ok(
  IPV4_SUBDOMAIN || IPV6_SUBDOMAIN,
  'Both environment variable IPV4_SUBDOMAIN and IPV6_SUBDOMAIN are not set properly.',
);

if (IPV4_SUBDOMAIN) {
  const dnsConfigurator = new DNSConfigurator(API_KEY, DOMAIN, IPV4_SUBDOMAIN);
  setInterval(async () => {
    const address = await IPQuery.getIPv4();
    await dnsConfigurator.setIPv4(address, DDNS_INTERVAL);
  }, DDNS_INTERVAL);
}

if (IPV6_SUBDOMAIN) {
  setInterval(async () => {
    const dnsConfigurator = new DNSConfigurator(
      API_KEY,
      DOMAIN,
      IPV6_SUBDOMAIN,
    );
    const address = await IPQuery.getIPv6();
    await dnsConfigurator.setIPv6(address, DDNS_INTERVAL);
  }, DDNS_INTERVAL);
}

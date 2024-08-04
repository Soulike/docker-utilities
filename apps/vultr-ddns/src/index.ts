import {env} from 'node:process';
import * as assert from 'node:assert';
import {DNSConfigurator} from './DNSConfigurator';
import {IPQuery} from './IPQuery';
import {Logger} from 'logger';
import {VultrAPI} from './VultrAPI';

const DOMAIN = env['DOMAIN'];
const IPV4_SUBDOMAIN = env['IPV4_SUBDOMAIN'];
const IPV6_SUBDOMAIN = env['IPV6_SUBDOMAIN'];
const TTL = Number.parseInt(env['DDNS_INTERVAL'] ?? '600');

assert.ok(DOMAIN, 'Environment variable DOMAIN is not set properly.');
assert.ok(
  IPV4_SUBDOMAIN || IPV6_SUBDOMAIN,
  'Both environment variable IPV4_SUBDOMAIN and IPV6_SUBDOMAIN are not set properly.',
);

const API_KEY = VultrAPI.getAPIKey();

if (IPV4_SUBDOMAIN) {
  const dnsConfigurator = new DNSConfigurator(API_KEY, DOMAIN, IPV4_SUBDOMAIN);
  setInterval(async () => {
    const address = await IPQuery.getIPv4();
    await dnsConfigurator.setIPv4(address, TTL);
    Logger.info(`DNS A record of ${IPV4_SUBDOMAIN}.${DOMAIN} is updated to ${address}.`);
  }, TTL * 1000);
}

if (IPV6_SUBDOMAIN) {
  setInterval(async () => {
    const dnsConfigurator = new DNSConfigurator(
      API_KEY,
      DOMAIN,
      IPV6_SUBDOMAIN,
    );
    const address = await IPQuery.getIPv6();
    await dnsConfigurator.setIPv6(address, TTL);
    Logger.info(`DNS AAAA record of ${IPV6_SUBDOMAIN}.${DOMAIN} is updated to ${address}.`);
  }, TTL * 1000);
}

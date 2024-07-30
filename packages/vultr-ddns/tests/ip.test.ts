import {isIPv4, isIPv6} from 'is-ip';
import {describe, expect, it} from '@jest/globals';
import {getIPv4, getIPv6} from '../src/ip';

describe('Retrieve IP Addresses from Remote', () => {
  it('should return IPv4', async () => {
    const ipv4 = await getIPv4();
    expect(isIPv4(ipv4)).toBeTruthy();
  });

  it('should return IPv6', async () => {
    const ipv6 = await getIPv6();
    expect(isIPv6(ipv6)).toBeTruthy();
  });
})

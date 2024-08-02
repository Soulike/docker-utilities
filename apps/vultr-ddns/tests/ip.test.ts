import {Address4, Address6} from 'ip-address';
import {describe, expect, it} from '@jest/globals';
import {IPQuery} from '../src/IPQuery.js';

describe('Retrieve IP Addresses from Remote', () => {
  it('should return IPv4', async () => {
    const ipv4 = await IPQuery.getIPv4();
    expect(Address4.isValid(ipv4)).toBeTruthy();
  });

  it('should return IPv6', async () => {
    const ipv6 = await IPQuery.getIPv6();
    expect(Address6.isValid(ipv6)).toBeTruthy();
  });
})

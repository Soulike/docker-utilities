import {Address4, Address6} from 'ip-address';
import * as assert from 'node:assert';

export class IPQuery {
  private static async getIPFromRemote(url: string) {
    const response = await fetch(url);
    return (await response.text()).trim();
  }

  static async getIPv4() {
    const ipv4 = await IPQuery.getIPFromRemote('https://ipv4.icanhazip.com');
    assert.ok(
      Address4.isValid(ipv4),
      'Remote returns an invalid IPv4 address.',
    );
    return ipv4;
  }

  static async getIPv6() {
    const ipv6 = await IPQuery.getIPFromRemote('https://ipv6.icanhazip.com');
    assert.ok(
      Address6.isValid(ipv6),
      'Remote returns an invalid IPv4 address.',
    );
    return ipv6;
  }
}

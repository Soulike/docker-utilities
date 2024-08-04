import type {DNSRecord} from './DNSRecord';
import {env} from 'node:process';
import assert from 'node:assert';
import fs from 'node:fs';

export interface VultrDNSRecords {
  records: readonly Readonly<VultrDNSRecord>[];
  meta: Readonly<VultrDNSRecordsMeta>;
}

export interface VultrDNSRecord extends DNSRecord {
  id: string;
}

export interface VultrDNSRecordsMeta {
  total: number;
  links: {
    next: string;
    prev: string;
  };
}

export class VultrAPI {
  public static getAPIKey() {
    const API_KEY_FILE = env['VULTR_API_KEY_FILE'];
    assert.ok(API_KEY_FILE, 'Environment variable VULTR_API_KEY_FILE is not set properly.');
    const apiKey = fs.readFileSync(API_KEY_FILE, {encoding: 'utf-8'});
    return apiKey.trim();
  }
}

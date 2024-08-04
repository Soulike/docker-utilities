import type {DNSRecord} from './DNSRecord';

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

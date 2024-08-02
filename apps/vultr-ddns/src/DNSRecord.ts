export class DNSRecord {
  public readonly data: string;
  public readonly name: string;
  public readonly priority: number;
  public readonly ttl: number;
  public readonly type: string;

  constructor(
    data: string,
    name: string,
    priority: number,
    ttl: number,
    type: string,
  ) {
    this.type = type;
    this.data = data;
    this.name = name;
    this.priority = priority;
    this.ttl = ttl;
  }
}

export class IPv4DNSRecord extends DNSRecord {
  constructor(data: string, name: string, priority: number, ttl: number) {
    super(data, name, priority, ttl, 'A');
  }
}

export class IPv6DNSRecord extends DNSRecord {
  constructor(data: string, name: string, priority: number, ttl: number) {
    super(data, name, priority, ttl, 'AAAA');
  }
}

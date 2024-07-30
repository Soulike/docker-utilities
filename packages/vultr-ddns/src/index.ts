import {env} from 'node:process';
import * as assert from 'node:assert';

const API_KEY = env['VULTR_API_KEY'];
const DOMAIN = env['DOMAIN'];
const SUBDOMAIN = env['SUBDOMAIN'];

assert.ok(API_KEY, 'Environment variable VULTR_API_KEY is not setup properly.');
assert.ok(DOMAIN, 'Environment variable DOMAIN is not setup properly.');
assert.ok(SUBDOMAIN, 'Environment variable SUBDOMAIN is not setup properly.');

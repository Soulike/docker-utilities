import baseConfig from './jest.config.base.mjs';

/**
 * @type {import('jest').Config}
 */
const config = {
  ...baseConfig,
  projects: ['apps/*', 'packages/*'],
};

export default config;

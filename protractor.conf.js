exports.config = {
  // TODO: Should get a dedicated selenium server set up to send these
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/**/*.e2e.js'],
  capabilities: {
    browserName: 'firefox'
  }
}
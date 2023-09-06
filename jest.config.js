/** @type {import('jest').Config} */
const config = {
    verbose: true,
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom"
  };
  
  module.exports = config;
  
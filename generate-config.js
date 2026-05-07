#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'platform/app/.env') });

// Read the original config template
const configPath = path.join(__dirname, 'platform/app/public/config/default.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Replace environment variables
const generatedConfig = configContent
  .replace(/http:\/\/172\.17\.0\.66:8080/g, process.env.REACT_APP_DCM4CHEE_SERVER || 'http://172.17.0.66:8080')
  .replace(/\/aets\/DCM4CHEE\//g, `/aets/${process.env.REACT_APP_DCM4CHEE_AET || 'DCM4CHEE'}/`);

// Write back the config
fs.writeFileSync(configPath, generatedConfig, 'utf8');
console.log('✓ Config generated from environment variables');
console.log(`  Server: ${process.env.REACT_APP_DCM4CHEE_SERVER || 'http://172.17.0.66:8080'}`);
console.log(`  AET: ${process.env.REACT_APP_DCM4CHEE_AET || 'DCM4CHEE'}`);

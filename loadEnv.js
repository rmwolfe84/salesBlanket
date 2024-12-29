// Import dotenv and dotenv-expand
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

// Load and expand .env variables
const env = dotenv.config();
dotenvExpand(env);

// Log to verify loaded variables (optional)
console.log('Loaded environment variables:', env.parsed);

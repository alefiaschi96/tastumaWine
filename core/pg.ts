// Load environment variables from .env file
require('dotenv').config();

const postgres = require('postgres');

// Get database connection string from environment variables
const connectionString = process.env["DATABASE_URL"];

// Create postgres client
const sql = postgres(connectionString);

// Export the client for use in other files
export default sql;
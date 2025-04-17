// Load environment variables from .env file
require('dotenv').config();

// Use pg library instead of postgres
const { Client } = require('pg');

// Get database connection string from environment variables
const connectionString = process.env.DATABASE_URL;

// Create postgres client
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false // Necessario per alcune configurazioni di Supabase
    }
});

// Connect to the database
client.connect().catch(err => {
    console.error('Errore di connessione al database:', err);
});

// Export the client for use in other files
module.exports = client;

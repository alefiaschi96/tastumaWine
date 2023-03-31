const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

const port = 3000;
const HOST = '0.0.0.0';

app.use(cors())
app.use(bodyParser.json()); // per gestire il corpo delle richieste in formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // per gestire il corpo delle richieste in formato URL-encoded

// Connessione al database
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tastuma',
    password: 'chialex3',
    port: 5432,
});
client.connect();

app.get('/api/wines/type', (req, res) => {
    client.query('SELECT DISTINCT type FROM tastuma.wine', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante l\'accesso ai dati del database');
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/api/wines', (req, res) => {
    client.query('SELECT * FROM tastuma.wine order by price', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante l\'accesso ai dati del database');
        } else {
            res.send(result.rows);
        }
    });
});


app.get('/api/wine', (req, res) => {
    let first = true;

    let query = 'SELECT * FROM tastuma.wine WHERE '

    if (req.query['id']) {
        first = false
        query = query + ' id = ' + req.query['id']
    }

    if (req.query['wine_name']) {
        if (!first)
            query = query + " AND "
        else
            first = false
        query = query + ' LOWER(wine_name) like \'%' + req.query['wine_name'].toLowerCase() + '%\''
    }

    if (req.query['region']) {
        if (!first)
            query = query + " AND "
        else
            first = false
        query = query + ' LOWER(region) like \'%' + req.query['region'].toLowerCase() + '%\''
    }

    if (req.query['type']) {
        if (!first)
            query = query + " AND "
        else
            first = false
        query = query + ' LOWER(type) like \'%' + req.query['type'].toLowerCase() + '%\''
    }

    query = query + " order by price"

    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante l\'accesso ai dati del database');
        } else {
            res.send(result.rows);
        }
    });
});

app.post('/api/wine', (req, res) => {
    let query = "insert into tastuma.wine (wine_name, type, region, denomination, menu_name, company, vine, year, reseller, price, sciolze_vinery, tastuma_vinery, service_temp, fridge_temp, fridge_type) values ("
    for (const key in req.body) {
        query = query + "\'" + req.body[key] + "\', "
    }
    query = query.slice(0, -2) + ")"
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante l\'accesso ai dati del database');
        } else {
            res.send("Saved");
        }
    });
});

app.put('/api/wine', (req, res) => {
    let query = "UPDATE tastuma.wine SET "
    for (const key in req.body) {
        query = query + key + " = \'" + req.body[key] + "\', "
    }
    query = query.slice(0, -2) 

    query = query + " WHERE ID = " + req.body['id']
    console.log(query)
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante l\'accesso ai dati del database');
        } else {
            res.send("Saved");
        }
    });
});

app.options('*', cors());

// Avvio del server
app.listen(port, HOST, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
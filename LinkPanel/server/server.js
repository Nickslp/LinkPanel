const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const dbPath = path.join(__dirname, '../db', 'links.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        if (DEBUG_MODE) {
            console.log('Connected to the SQLite database.');
        }

        db.run(`CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                if (DEBUG_MODE) {
                    console.log('Links table created or already exists.');
                }
            }
        });
    }
});

// Middleware to validate password
const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        if (DEBUG_MODE) {
            console.log('Password validation failed: Password is required');
        }
        return res.status(400).json({ error: 'Password is required' });
    }

    const plainPassword = process.env.PLAIN_PASSWORD;

    if (password === plainPassword) {
        if (DEBUG_MODE) {
            console.log('Password validation succeeded');
        }
        next();
    } else {
        if (DEBUG_MODE) {
            console.log('Password validation failed: Invalid password');
        }
        res.status(401).json({ error: 'Invalid password' });
    }
};

// API endpoint to validate a password
app.post('/api/validate-password', (req, res) => {
    const { password } = req.body;

    if (!password) {
        if (DEBUG_MODE) {
            console.log('Password validation request failed: Password is required');
        }
        return res.status(400).json({ error: 'Password is required' });
    }

    const plainPassword = process.env.PLAIN_PASSWORD;

    if (password === plainPassword) {
        if (DEBUG_MODE) {
            console.log('Password validation request succeeded');
        }
        res.status(200).json({ message: 'Password is valid' });
    } else {
        if (DEBUG_MODE) {
            console.log('Password validation request failed: Invalid password');
        }
        res.status(401).json({ error: 'Invalid password' });
    }
});

// API endpoint to fetch all links
app.get('/api/links', (req, res) => {
    db.all('SELECT * FROM links', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (DEBUG_MODE) {
                console.log('Fetched links:', rows);
            }
            res.json(rows);
        }
    });
});

// API endpoint to add a new link
app.post('/api/links', validatePassword, (req, res) => {
    const { url, description } = req.body;

    if (!url) {
        if (DEBUG_MODE) {
            console.log('Add link request failed: URL is required');
        }
        return res.status(400).json({ error: 'URL is required' });
    }

    db.run(`INSERT INTO links (url, description) VALUES (?, ?)`, [url, description || null], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (DEBUG_MODE) {
                console.log('Added new link:', { id: this.lastID, url, description });
            }
            res.status(201).json({ id: this.lastID, url, description });
        }
    });
});

// API endpoint to update a link
app.put('/api/links/:id', validatePassword, (req, res) => {
    const { id } = req.params;
    const { url, description } = req.body;

    if (!url) {
        if (DEBUG_MODE) {
            console.log('Update link request failed: URL is required');
        }
        return res.status(400).json({ error: 'URL is required' });
    }

    db.run(`UPDATE links SET url = ?, description = ? WHERE id = ?`, [url, description || null, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (DEBUG_MODE) {
                console.log('Updated link:', { id, url, description });
            }
            res.status(200).json({ id, url, description });
        }
    });
});

// API endpoint to delete a link
app.delete('/api/links/:id', validatePassword, (req, res) => {
    const { id } = req.params;

    if (!id) {
        if (DEBUG_MODE) {
            console.log('Delete link request failed: ID is required');
        }
        return res.status(400).json({ error: 'ID is required' });
    }

    db.run(`DELETE FROM links WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (this.changes > 0) {
                if (DEBUG_MODE) {
                    console.log('Deleted link with ID:', id);
                }
                res.status(200).json({ message: 'Link deleted successfully' });
            } else {
                if (DEBUG_MODE) {
                    console.log('Delete link request failed: Link not found');
                }
                res.status(404).json({ error: 'Link not found' });
            }
        }
    });
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
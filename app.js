const express = require('express');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

// 404 route
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status).send(
        `
        <h1>${err.status}</h1>
        <h2>Error: ${err.message}</h2>
        <p>Stack: ${err.stack}</p>
        `
    );
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
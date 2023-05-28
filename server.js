const path = require('path')
const express = require('express');
// const api = require('index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/assets/index.html'))
);

app.get('/api/notes', (req, res) => {

}
)

app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        // Obtain existing notes


    }
})

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));



// Fall back pathway 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


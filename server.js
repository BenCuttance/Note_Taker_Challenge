const path = require('path')
const express = require('express');
const fs = require('fs')
// const api = require('.'); 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    

}
);

app.get('/notes', (req, res) => {
  
    res.sendFile(path.join(__dirname, 'public/notes.html'))
   

}
)

const readFromFile = (path) => {
    const fileData = fs.readFileSync(path);
    return fileData;

}

app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved for notes`);
    var notes = JSON.parse(readFromFile('./db/db.json'));
    // .then((data => res.json(JSON.parse(data))));
    
    res.json(notes)

})

const getId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
// POST request 

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} for notes`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: getId()
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);

            } else {
                const parsedNote = JSON.parse(data);

                parsedNote.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNote, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : res.send('New note recieved')

                )
            }
        })
    }
})

app.delete('/api/notes/:id', (req, res) => {
    console.log('delete request called')
    const id = req.params.id 
    console.log(id)
    
    var note = note.id(parseInt(req.params.id));

    if (note) {
        removeNote(parseInt(req.params.id))


    return res.send('Note deleted')
    } 

})  



app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));

// Fall back pathway 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))

}
);




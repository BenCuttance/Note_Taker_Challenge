
const path = require('path')
const express = require('express');
const fs = require('fs')

// Local port and port for use on Heroku
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Code to get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    
}
);

// Code to get route for the notes page
app.get('/notes', (req, res) => {
  
    res.sendFile(path.join(__dirname, 'public/notes.html'))
   

}
)
// Function to read file data
const readFromFile = (path) => {
    const fileData = fs.readFileSync(path);
    return fileData;

}

// Code to read data from db.json and display data onto users page
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved for notes`);
    var notes = JSON.parse(readFromFile('./db/db.json'));
   
    
    res.json(notes)

})

// Function to randomly generate unique Id for each note generated for the database
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

// Code to delete notes from database. This code return all notes in databse, except the note with the ID the user selected
// Then the notes are re-written back to the databse.
app.delete('/api/notes/:id', (req, res) => {
    console.log('delete request called')
    const id = req.params.id 
    console.log(id)
    
    var notes = JSON.parse(readFromFile('./db/db.json')); 
    
    var updatedNotes = notes.filter((note) => {
        return note.id !== id;
    }) ;

    console.log(updatedNotes);
    
    fs.writeFile(
        './db/db.json',
        JSON.stringify(updatedNotes, null, 4),
        (writeErr) =>
            writeErr
                ? console.error(writeErr)
                : res.send('Notes updated') 
)} 

 
)  

// Starting the server
app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));

// Fall back pathway 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))

}
);




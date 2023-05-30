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
    console.log('beep boop')
    
}
);

app.get('/notes', (req, res) => {
    console.info(`${req.method} request for notes beep boop`);
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    console.log('beep boop')
   
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
        console.log(notes)
        res.json(notes)

})

const getId = () =>{ return Math.floor((1 + Math.random()) * 0x10000)
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

    fs.readFile('./db/db.json', 'utf8', (err, data)=> {
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




// app.post('/api/notes', (req, res) => {

//     console.info(`${req.method} request received to add a review`);

//     const { title, text } = req.body;

//     if (req.body) {
//         const newNote = {
//             title,
//             text
//         };

//         readAndAppend(newNote, './db/db.json');
//         res.json('Note added successfully') 
   
//         // Obtain existing notes
//         fs.readFile('./db/db.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedNote = json.parse(data);

//                 parsedNote.push(newNote);

//                 fs.writeFile(
//                     './db/db.json',
//                     JSON.stringify(parsedNote, null, 4),
//                     (writeErr) =>
//                         writeErr
//                             ? console.error(writeErr)
//                             : console.info('Successfully updated notes')
//                 )
//             }

//         });

//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         console.log(response);
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('Error in posting note')
//     }

// }
// )

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));

// Fall back pathway 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
 
}
);




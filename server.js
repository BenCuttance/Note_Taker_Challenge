const path = require('path')
const express = require('express');
const fs = require('fs')
// const api = require('index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    console.log('beep boop')
    res.json('beep boop')
}
);

app.get('/notes', (req, res) => {
    console.info(`${req.method} request for notes beep boop`);
    console.log('beep boop')
    res.json('beep boop')

}
)


// app.get('/api/notes', (req, res) => {
//     console.log(`${req.method} request recieved for notes`);
//     readFromFile('./db/db.json').then((data => res.json(JSON.parse(data))));
//         console.log('beep boop')
//         res.json('beep boop')
// })

// POST request 

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} for notes`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        }

    fs.readFile('./db/db.json', 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        
        } else {
            const parsedNote = JSON.parse(data);

            parsedNote.push(newNote);

            fs.writeFile(
                './db/reviews.json',
                JSON.stringify(parsedNote, null, 4),
                (writeErr) => 
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Beep boop!')
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

fs.readFile


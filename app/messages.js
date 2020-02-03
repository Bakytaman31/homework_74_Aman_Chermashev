const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = './messages';

let messages = [];

router.get('/', (req, res) => {
    fs.readdir(path, (err, files) => {
        const reverseFiles = files.reverse();
        for (let i = 0; i < 5; i++) {
            fs.readFile(`${path}/${reverseFiles[i]}`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                   const object = (JSON.parse(data));
                   messages.push(object)
                }
            })
        }

    });
    res.send(messages);
});

router.post('/newMessage/:message', (req, res) => {
    const date = new Date().toISOString();
    const fileName = `${date}.txt`;
    const object = {message: req.params.message, date: date};
    fs.writeFile(`./messages/${fileName}`, JSON.stringify(object, null, 2), err => {
        if (err) {
            console.error(err);
        } else {
            console.log('File is saved!');
        }
    });
    res.send(object);
});

module.exports = router;
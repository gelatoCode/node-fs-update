const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
    fs.readFile('./free.json', 'utf-8' , (err, data) => {
        if (err) throw err;

        const read = JSON.parse(data);

        res.render('index', {data : read});
    })
})

app.get('/edit/:id' , (req, res) => {
    fs.readFile('./free.json' , 'utf-8' , (err, data) => {
        const read = JSON.parse(data);

        const id = req.params.id;
        const edit = read.find(e => e.id === parseInt(id));

        res.render('update' , {data : edit});
    })
})
app.listen(8080, () => {
    console.log('Processing ongoing .....')
})
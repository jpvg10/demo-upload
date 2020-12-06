const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Agregando la extension
    }
});

const app = express();
const upload = multer({ storage });

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.post('/api/hoteles', upload.single('foto'), (req, res) => {
    try {
        const { nombre, estrellas } = req.body;

        console.log('Nombre:', nombre);
        console.log('Estrellas:', estrellas);
    
        const foto = req.file;
        // console.log(foto);
        console.log('Foto path:', foto.path)
    
        res.send({
            message: 'Success!'
        });
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

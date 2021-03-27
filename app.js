const express = require('express');
const multer = require('multer');

const app = express();
const filesPath = "D:/PUBLIC/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filesPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(filesPath));
app.use('/public', express.static('./public'));

app.use('/upload', function (req, res) {
    res.redirect('/uploadfile')
});

app.use('/uploadfile', express.static('./views/'));

app.post('/send', upload.single('file'), function (req, res) {
    res.redirect('/')
})

app.get('/', express.static(filesPath), require('serve-index')(filesPath, { icons: true }));

app.listen(port, () => console.log(`Server running at ${port}`))
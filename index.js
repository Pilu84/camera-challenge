const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const PDFDocument = require ('pdfkit');
const fs = require('fs');

app.use(compression());



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(bodyParser.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.post("/makepdf", (req, res) => {

    const imgToPdf = 'data:image/jpeg;base64,' + req.body.picture;
    const doc = new PDFDocument;
    const filename = Date.now();

    doc.pipe(fs.createWriteStream('./uploads/' + filename +'.pdf'));

    doc.image(imgToPdf, {
        align: 'center',
        valign: 'center'
    });

    doc.end();

    res.json({succes: true, uploaded: filename + '.pdf'});


});


app.post("/sendmessage", (req, res) => {
    


});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log("Its run"));

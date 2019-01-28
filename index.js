const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const PDFDocument = require ('pdfkit');
const fs = require('fs');
const mail = require('./sendmail');

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

app.post("/makepdf", async (req, res) => {

    const imgToPdf = 'data:image/jpeg;base64,' + req.body.picture;
    const doc = new PDFDocument;
    const filename = Date.now();

    function makepdf(filename, imgToPdf) {
        doc.pipe(fs.createWriteStream('./uploads/' + filename +'.pdf'));

        doc.image(imgToPdf, {
            align: 'center',
            valign: 'center'
        });

        doc.end();

        return filename;
    }

    const createPdf = await(makepdf(filename, imgToPdf));

    res.json({succes: true, uploaded: createPdf});


});


app.post("/sendmessage", async (req, res) => {

    await mail.sendMail(req.body.name, req.body.phone, req.body.email, req.body.message, req.body.picture).catch(console.error);

    res.json({succes: true});


});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log("Its run"));

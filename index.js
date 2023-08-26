import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from 'qr-image';
import path from "path";
import fs from 'fs';
import download from "image-downloader"


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.get("/", (req, res) => { 
    res.render(__dirname+"/index.ejs")

})




app.post("/download", (req, res)=>{ 
    // downloadImage("http://localhost:3000/images/qr.png", "/images/qr.png")
   
    const options = {
        url: "http://localhost:3000/images/qr.png",
        dest: __dirname+"/public/images/qr.png",               // will be saved to /path/to/dest/ima   
    };
      
      download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
        })
        .catch((err) => console.error(err));

})



app.post("/submit", (req, res) => { 
    console.log(req.body);
    var i = req.body;
    var j=i['content']
    console.log(j);
    
 
    var qr_svg = qr.image(j);
    
    qr_svg.pipe(fs.createWriteStream('public/images/qr.png'));
    

// //////remember path is specofed inthe qr.pmg whre image is to be generated

    // const currentPath = path.join(__dirname, "qr.png")
    // const newPath = path.join(__dirname, "/public/images", "newqr.png")
    
    // try {
    //   fs.renameSync(currentPath, newPath)
    //   console.log("Successfully moved the file!")
    // } catch(err) {
    //   throw err
    // }
    const numLetters = "true";
    res.render(__dirname + "/index.ejs", { finalqr: numLetters });
    

 


})

app.listen(port, () => {
    console.log("you are hearing to the port "+port)
 })

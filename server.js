const express = require('express');
const app = express();

app.use(express.static(__dirname+"/frontend"));

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res){
    let i = __dirname + "/frontend/html/home.html";
    res.sendFile(i);
});
 
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
});


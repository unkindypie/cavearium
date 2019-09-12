const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3013;


app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
});


app.listen(port, ()=>{
    console.log('Server is up on port', port);
});
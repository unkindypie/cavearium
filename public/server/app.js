var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3013;
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(port, function () {
    console.log('Server is up on port', port);
});
//# sourceMappingURL=app.js.map
const express = require('express')
const path = require('path')
const mime = require('mime');
const app = express()
const port = 3000


app.use('/static', express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path) {
        res.setHeader("Content-Type", mime.getType(path));
    }
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

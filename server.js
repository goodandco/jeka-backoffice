var connect = require('connect');
var serveStatic = require('serve-static')


const port = 9526
const app = connect()

app.use("/admin", serveStatic('./dist', {
  'index': ['index.html', '/']
}))

app.listen(port, function () {
  console.log(`> Listening at  http://localhost:${port}`)
});
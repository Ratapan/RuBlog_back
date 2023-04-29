import app from './app'
import './database'

const port = 3000

app.listen(port);

console.log(`server listen on port http://localhost:${port}`)
const app = require('./server');

const port = process.env.PORT

app.listen(port,()=>{console.log(`Server Running  Successfully!. On Port: ${port}`)});
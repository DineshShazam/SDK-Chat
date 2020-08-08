import app from './app'
import http from 'http'

const server = http.Server(app);

server.listen(3035,()=>{console.log('Application started at PORT 3035')})


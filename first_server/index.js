const http = require('http');//setting the server as http

const hostname = 'localhost';//setting the host name
//setting up the port, identifies our server program
//on the local network as a running process
const port = 3000;

const server = http.createServer((req, res) => {
    const { url } = req;//example of ES6 destructuring syntax
    //makes the url

    console.log(url);

    if (url === '/translations') {
        const translations = { 1: 'one', 2: 'two', 3: 'three'};

        res.setHeader('Content-Type', 'application/json');
        //header identifies to the browswer what kind of data we are sending back

        res.write(JSON.stringify(translations));//to send back data through the response
        //JSON.stringify turns the object into a string

        res.end();//this completely ends the res
    }

    res.end('Welcome to Node!');//end tells server we have finished our configuration
});//this takes one arguement, a callback function with two arguents, req(request) and res(response)

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});//activates the server


const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method
    if (url === '/') {
        res.write(`
            <html>
            <head><title>Enter Message</title>
            <body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>
            </html>
        `);
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
    
        return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            fs.writeFile('message.txt',parsedBody.split("=")[1],err =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
        
        
        // res.writeHead(302,{'Location':'/'});
        // res.write(`
        //     <html>
        //     <head><title>Enter Message</title>
        //     <body><form action="/message" method="POST"><input type = "text" name="message"><button type = "submit">Send</button></form></body>
        //     </html>
        // `);
    }
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <head><title>My First Page</title>
    <body><h1>Hello From Node js</h1></body>
    </html>
    `);
    res.end();
}

// module.exports = requestHandler;
module.exports = {
    handler: requestHandler,
    someText: "Some coded text"
}



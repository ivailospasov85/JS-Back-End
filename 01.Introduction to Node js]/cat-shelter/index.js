const http = require('http');
const fs = require('fs');
const querystring = require('querystring')

const cats = [
    {
        id: 1,
        name: 'Tommy',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        name: 'Navcho',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Persian Cat',
        description: 'Nebuchadnezzar II',
    },
    {
        id: 3,
        name: 'Sisa',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        render('./views/partials/cat.html', cats, (err, catResult) => {
            if (err) {
                res.statusCode = 404
                return res.end()
            }

            render('views/home.html', [{ cats: catResult }], (err, result) => {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });

                res.write(result)
                res.end();
            })
        })

        // fs.readFile('./views/home.html', { encoding: 'utf-8' }, (err, result) => {
        //     if (err) {
        //         res.statusCode = 404
        //         return res.end()
        //     }
        //     

        //     res.write(result)
        //     res.end();
        // })

    } else if (req.url === '/styles/site.css') {
        fs.readFile('views/site.css', { encoding: 'utf-8' }, (err, result) => {
            if (err) {
                res.statusCode = 404
                return res.end()
            }
            res.writeHead(200, {
                'content-type': 'text/css'
            });

            res.write(result)
            res.end();
        })
    } else if (req.url === '/cats/add-cat' && req.method === 'GET') {
        fs.readFile('./views/addCat.html', { encoding: 'utf-8' }, (err, result) => {
            if (err) {
                res.statusCode = 404
                return res.end()
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            })
            res.write(result)
            res.end();

        })

    } else if (req.url === '/cats/add-cat' && req.method === 'POST') {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('close', () => {
            const parsedBody = querystring.parse(body)
            parsedBody.id = cats[cats.length - 1].id + 1

            cats.push(parsedBody)

            res.writeHead(302, {
                'location': '/'
            })
            res.end()

        })
    }
    else {
        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write('<h1>404</h1>');
        res.end();
    }
});

function render(view, dataArr, callback) {
    fs.readFile(view, 'utf-8', (err, result) => {
        if (err) {
            return callback(err)
        }

        const htmlResult = dataArr.map(data => {
            return Object.keys(data).reduce((acc, key) => {
                const pattern = new RegExp(`{{${key}}}`, 'g')

                return acc.replace(pattern, data[key])
            }, result)
        }).join('\n')

        callback(null, htmlResult)
    })

}


server.listen(5000);
console.log('Server is listening on port 5000...');
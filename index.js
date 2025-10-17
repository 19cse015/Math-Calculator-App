const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const PORT = 3002;

const PI = 3.1416;
const half = 0.5;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/CSS'));

//Home page
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});










/////circle

app.get("/circle", (req, res) => {

    res.sendFile(__dirname + "/circle.html");
});


app.post("/circle", (req, res) => {

    const r = req.body.radius;

    const Area = PI * r * r;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Result</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background: linear-gradient(135deg, #dbeeff, #f9fdff);
                    color: #004080;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 {
                    font-size: 2.2rem;
                    color: #003366;
                    margin-bottom: 25px;
                }
                a {
                    text-decoration: none;
                }
                button {
                    background-color: #0077cc;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }
                button:hover {
                    background-color: #005fa3;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <h1>The Area of Circle is: ${Area}</h1>
            <a href="/"><button>Go Back to Home</button></a>
        </body>
        </html>
    `);


});


////Triangle

app.get("/Triangle", (req, res) => {

    res.sendFile(__dirname + "/Triangle.html");
});


app.post("/Triangle", (req, res) => {


    const b = req.body.base;
    const h = req.body.Height;

    const Area = half * b * h;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Result</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background: linear-gradient(135deg, #dbeeff, #f9fdff);
                    color: #004080;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 {
                    font-size: 2.2rem;
                    color: #003366;
                    margin-bottom: 25px;
                }
                a {
                    text-decoration: none;
                }
                button {
                    background-color: #0077cc;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }
                button:hover {
                    background-color: #005fa3;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <h1>The Area of Triangle is: ${Area}</h1>
            <a href="/"><button>Go Back to Home</button></a>
        </body>
        </html>
    `);






});


/// Derivative

app.get("/derivative", (req, res) => {
    res.sendFile(__dirname + "/Derivative.html");

});


app.post('/derivative', (req, res) => {
    let func = req.body.func;






    let derivative;
    try {
        derivative = math.derivative(func, 'x').toString();
    } catch (err) {
        derivative = 'Invalid function';
    }

    // Send result as HTML
    res.send(`
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Result</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background: linear-gradient(135deg, #dbeeff, #f9fdff);
                    color: #004080;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 {
                    font-size: 2.2rem;
                    color: #003366;
                    margin-bottom: 25px;
                }
                a {
                    text-decoration: none;
                }
                button {
                    background-color: #0077cc;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }
                button:hover {
                    background-color: #005fa3;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <h1>The Derivative of ${func} is: ${derivative}</h1>
            <a href="/"><button>Go Back to Home</button></a>
        </body>
        </html>
    `);
});

///Limit

app.get("/limit", (req, res) => {
    res.sendFile(__dirname + "/limit.html");
})

app.post('/limit', (req, res) => {
    let func = req.body.func;
    let pointInput = req.body.point.trim().toLowerCase();
    let point;

    // Infinity input detection
    if (pointInput === "inf" || pointInput === "infinity" || pointInput === "∞") {
        point = Infinity;
    }
    else if (pointInput === "-inf" || pointInput === "-infinity" || pointInput === "-∞") {
        point = -Infinity;
    }
    else {
        point = parseFloat(pointInput);
    }



    let result;
    if (point === Infinity) {
        // x → ∞ হলে
        result = math.evaluate(func, { x: 1e10 }).toFixed(6);
    } else if (point === -Infinity) {
        // x → -∞ হলে
        result = math.evaluate(func, { x: -1e10 }).toFixed(6);
    } else {
        // Normal finite limit
        const delta = 1e-7;
        const left = math.evaluate(func, { x: point - delta });
        const right = math.evaluate(func, { x: point + delta });
        if (isFinite(left) && isFinite(right)) {
            result = ((left + right) / 2).toFixed(6);
        } else {
            result = "Does not exist";
        }
    }


    res.send(`
        <h1>Function: ${func}</h1>
        <h2>Limit as x → ${point}: ${result}</h2>
        <a href="/limit"><button>Go Back</button></a>
    `);
});



app.listen(PORT, () => {
    console.log(`server is running..at http://localhost:${PORT}`)
})
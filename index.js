require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const ethers = require('ethers');

var port = 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; //make sure these 3 are specified in .env file

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/vote", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else
     {
        res.send("Voting is finished");
    }
});



app.listen(port, function () {
    console.log("App is listening on port 3000")
});





/*The script sets up a basic Express.js server and configures it to handle file uploads, serve static files, and interact with an Ethereum blockchain using ethers.js. 

Here's a breakdown of each part:

1. require("dotenv").config();: This line loads environment variables from a .env file into process.env, allowing you to access them in your script. It's commonly used for storing sensitive information like API keys or private keys.

2. const express = require('express');: This line imports the Express.js framework, which is used to create web servers and handle HTTP requests/responses.

3. const app = express();: This line creates an Express application instance.

4. const fileUpload = require('express-fileupload');: This line imports the express-fileupload middleware, which adds file upload functionality to your Express app.

5. app.use(fileupload({ extended: true }));: This line tells Express to use the express-fileupload middleware with the option extended: true, which allows you to access the uploaded files in a convenient way.

6. app.use(express.static(__dirname));: This line serves static files (like HTML, CSS, and JavaScript files) from the directory specified by __dirname, which is the directory of the current script.

7. app.use(express.json());: This line adds middleware to parse JSON bodies of incoming requests. This is useful for handling data sent in JSON format, such as when working with APIs.

8. const path = require('path');: This line imports the path module, which provides utilities for working with file and directory paths.

9. const ethers = require('ethers');: This line imports the ethers library, which provides a way to interact with Ethereum smart contracts and the Ethereum blockchain.

10. var port = 3000;: This line defines the port number on which the Express server will listen for incoming requests.

11. const API_URL = process.env.API_URL;, const PRIVATE_KEY = process.env.PRIVATE_KEY;, const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;: These lines retrieve environment variables (API_URL, PRIVATE_KEY, CONTRACT_ADDRESS) from process.env, which were set in the .env file using the dotenv package. These variables are likely used to configure the connection to an Ethereum node and interact with a specific smart contract.
 */

/*require("dotenv").config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload ({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require('path');
const ethers = require('ethers');

var port = 3000;


const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env. CONTRACT_ADDRESS;

const {abi} = require("./artifacts/contracts/Voting.sol/Voting.json");
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/vote", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        res.send("Voting is finished");
    }
});

app.listen(port, function () {
    console.log("App is listening on port 3000")
});
*/
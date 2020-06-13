/* eslint-disable */
const port = 9000;
const ethers = require("ethers");
let provider = ethers.getDefaultProvider("mainnet");
require("dotenv").config();
const rp = require("request-promise");
const ganache = require("ganache-cli");
let server;

exports.init = async (blockNumber) => {
  const params = {
    fork:
      "https://mainnet.infura.io/v3/92b37dd5292446f29a718d40afe0bdf2@" +
      blockNumber,
  };
  server = ganache.server(params);
  server.listen(port, function (err, blockchain) {
    console.log("Initialized ganache server with blockNumber", blockNumber);
  });
};

exports.stop = async () => {
  server.close();
};

exports.handler = async (event, context) => {
  try {
    console.log(JSON.stringify(event));
    let returnCode;
    let resp;
    const latestBlock = await provider.getBlockNumber();
    await this.init(latestBlock);
    if (event.httpMethod === "POST") {
      const options = {
        method: "post",
        uri: "http://localhost:9000",
        headers: {},
        body: {
          jsonrpc: "2.0",
          method: "eth_call",
          params: [
            {
              from: "0x0D9D05d423C48FaFad62df50Ceb62A47c9c79b26",
              to: event.queryStringParameters.to,
              //"data": "0x70a08231000000000000000000000000e3818504c1b32bf1557b16c238b2e01fd3149c17"
              data: event.queryStringParameters.data,
            },
          ],
          id: "1",
        },
        json: true,
      };
      resp = await rp(options);
      returnCode = 200;
    } else {
      returnCode = 500;
      resp = {
        msg: "GET method not supported",
      };
    }
    console.log("Response from ganache ", resp);

    this.stop();
    return {
      statusCode: returnCode,
      body: JSON.stringify({
        resp,
      }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message,
      }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

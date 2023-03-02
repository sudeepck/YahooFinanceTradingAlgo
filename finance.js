const express = require('express')
const app = express()
const {executeTradingStrategyForFinanace} = require('./executeTradingStrategyForFinanace')
const request = require('request')
const {data} = require('./brokerageFees');

app.get('/',(req,res)=>{
    res.send("Trading Platform")
})

app.get('/trading',async(req,res)=>{
    const { companyTiker, averagePrice,threshold,brokerageName}= req.query

    let str = "";
    let thresholdValue = parseFloat(threshold); 
    let averagePriceValue = parseFloat(averagePrice) // example reference price 0.7 96.5  11947.4
    let accountBalance = 100000; 

    let brokerageBuyFee = [{percentage:0.03},{amount :20}]
    let brokerageSellFee = [{percentage:0.03},{amount :20}]

    let tradeMarketData;

    if(brokerageName){
        data.forEach(function(item) {
            if(item.name === brokerageName){
                brokerageBuyFee[0] = {"percentage" :item.brokerageBuyFee[0].percentage};
                brokerageBuyFee[1] = {"amount":item.brokerageBuyFee[1].amount};
                brokerageSellFee[0] = {"percentage" :item.brokerageBuyFee[0].percentage};
                brokerageSellFee[1] = {"amount":item.brokerageBuyFee[1].amount};
            }
        });
    }

    let url = `https://query1.finance.yahoo.com/v8/finance/chart/${companyTiker}?range=30d&interval=5m`;    
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, response, data) => {   
            if (err) {
            console.log('Error:', err);
            console.log('Status:', response.statusCode);
            } else {
                tradeMarketData =  data
                let tradeMarketDataArray = [];
                console.log(tradeMarketData["chart"]["result"])
                if(tradeMarketData["chart"]["result"] === null){
                    res.send("Invalid Ticker");
                }else{
                let length = tradeMarketData["chart"]["result"][0]["timestamp"].length;

                for (let i = 0; i <length; i++) {
                    const obj = {
                        Date: tradeMarketData["chart"]["result"][0]["timestamp"][i],
                        Low: tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["low"][i],
                        High: tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["high"][i],
                        Open :tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["open"][i],
                        Close:tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["close"][i],
                        volume :tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["volume"][i],
                    };
                    tradeMarketDataArray.push(obj);
                }
                // console.log(tradeMarketDataArray)
                str = executeTradingStrategyForFinanace(tradeMarketDataArray,thresholdValue,averagePriceValue,accountBalance,str,brokerageBuyFee,brokerageSellFee);
                res.send(str);
                }
            }
        })
})

app.listen(3000,()=>{
    console.log("Connected to server");
})



const express = require('express')
const app = express()
const {executeTradingStrategyForFinanace} = require('./executeTradingStrategyForFinanace')
const request = require('request')
const {brokerageCharges} = require('./brokerageFees');
const {formatData} = require('./FormatData'); 

app.get('/',(req,res)=>{
    res.send("Trading Platform")
})

app.get('/trading',async(req,res)=>{
    let { companyTiker, averagePrice,threshold,brokerageName,start,end}= req.query
    
    let {brokerageBuyFee,brokerageSellFee} = brokerageCharges(brokerageName);
    let = url = `https://query1.finance.yahoo.com/v8/finance/chart/${companyTiker}?range=30d&interval=5m`; 
       
    request.get({url: url,json: true,headers: {'User-Agent': 'request'}}, (err, response, data) => {   
        if (err) {
            console.log('Error:', err);
            console.log('Status:', response.statusCode);
        } else {
                let tradeMarketDataArray = formatData(data);
                str = executeTradingStrategyForFinanace(tradeMarketDataArray,threshold,averagePrice,brokerageBuyFee,brokerageSellFee);
                res.send(str);
        }
    })
})

app.listen(3000,()=>{
    console.log("Connected to server");
})


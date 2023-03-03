
const express = require('express')
const app = express()
const {executeTradingStrategyForFinanace} = require('./executeTradingStrategyForFinanace')
const {brokerageCharges} = require('./brokerageFees');
const {formatData} = require('./FormatData'); 


app.get('/',(req,res)=>{
    res.send("Trading Platform")
})

app.get('/trading',async(req,res)=>{
    const { default: fetch } = await import('node-fetch');
    let { companyTiker, averagePrice,threshold,brokerageName,start,end}= req.query
    let {brokerageBuyFee,brokerageSellFee} = brokerageCharges(brokerageName);
    let url = `https://query1.finance.yahoo.com/v8/finance/chart/${companyTiker}?range=30d&interval=5m`; 

    const response = await fetch(url);
    const data = await response.json();
    let tradeMarketDataArray = formatData(data);
    str = executeTradingStrategyForFinanace(tradeMarketDataArray,threshold,averagePrice,brokerageBuyFee,brokerageSellFee);
    res.send(str);
})

app.listen(3000,()=>{
    console.log("Connected to server");
})


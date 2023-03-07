
const express = require('express')
const app = express()
const {brokerageCharges} = require('./brokerageFees');
const {formatData} = require('./FormatData'); 
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'))


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
    let tradeMarketDataArray = await formatData(data);
    let tradingData =  await tradeMarketDataArray.map(trade=>trade);

        res.render('es', { tradingData,threshold,averagePrice,brokerageBuyFee,brokerageSellFee});
})

app.listen(3000,()=>{
    console.log("Connected to server");
})

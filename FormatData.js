 const {unixTimeStamptoIST} = require('./unixTimeStamptoIST');
let tradeMarketDataArray = [];
formatData = (tradeMarketData)=>{

     if(tradeMarketData["chart"]["result"] === null){
            return [];
    }
    else{
                let length = tradeMarketData["chart"]["result"][0]["timestamp"].length;
               let dataAndTime =  unixTimeStamptoIST(tradeMarketData["chart"]["result"][0]["timestamp"])

                for (let i = 0; i <length; i++) {
                    const obj = {
                        Date: dataAndTime[i]["Date"],
                        Time:dataAndTime[i]["Time"],
                        Low: tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["low"][i],
                        High: tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["high"][i],
                        Open :tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["open"][i],
                        Close:tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["close"][i],
                        volume :tradeMarketData["chart"]["result"][0]["indicators"]["quote"][0]["volume"][i],
                    };
                    tradeMarketDataArray.push(obj);
                }

        return tradeMarketDataArray;
    }
}

module.exports = {formatData}
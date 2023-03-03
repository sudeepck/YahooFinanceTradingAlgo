const data = [
    {
        "name":"dhan",
        "brokerageBuyFee": [{percentage:0.03},{amount :20}],
        "brokerageSellFee" : [{percentage:0.03},{amount :20}]
    },
     {
        "name":"zerodha",
        "brokerageBuyFee": [{percentage:0.03},{amount :20}],
        "brokerageSellFee" : [{percentage:0.03},{amount :20}]
    },
    {
        "name":"5paisa",
        "brokerageBuyFee": [{percentage:100},{amount :20}],
        "brokerageSellFee" : [{percentage:100},{amount :20}]
    },
    {
        "name":"nuvama",
        "brokerageBuyFee": [{percentage:100},{amount :10}],
        "brokerageSellFee" : [{percentage:100},{amount :10}]
    }
]

brokerageCharges = (brokerageName)=>{
     let brokerageBuyFee = [{percentage:0.03},{amount :20}]
    let brokerageSellFee = [{percentage:0.03},{amount :20}]

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
    return {brokerageBuyFee,brokerageSellFee} 
}

  
module.exports = {brokerageCharges}



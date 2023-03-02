
function unixTimeStamptoIST(unixTimestamps){
    let DateTime =[]
        for (let i = 0; i < unixTimestamps.length; i++) {
            // Create a new Date object using the timestamp (in milliseconds)
            const dateObject = new Date(unixTimestamps[i] * 1000);

            // Get the date and time strings
            const dateString = dateObject.toLocaleDateString();
            const timeString = dateObject.toLocaleTimeString();
            DateTime.push({"Date" :dateString,"Time":timeString})
        }
        return DateTime;
}

module.exports ={unixTimeStamptoIST}

function getCurrentTimestamp () {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    console.log('current Time >> '+time);

    return time
  }

//var currentTime =getCurrentTimestamp();



function gerTimeAndDate(){
 
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time+'  '+date;
 
console.log(dateTime)
}

gerTimeAndDate();
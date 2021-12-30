const express = require('express');
var http = require('http');
var moment = require('moment');
const db = require('./db/db')

const app = express();
app.use(express.json());


getJar = (mac_id) => {
 return new Promise((resolve, reject) => {
  try {
   const quer = "SELECT * FROM jardata where node_mac_id='" + mac_id + "' ORDER BY date_time DESC limit 1"
   db.client.query(quer, function (error, results) {
    if (error) {
     console.log(error)
     resolve("500")
    } else {
     resolve(results.rows)
    }
   });
  } catch (e) {
   console.log(e)
   resolve("500")
  }
 });
}


// get jar current data
app.get('/jar/latest-data/:var', async (req, res) => {
 const mac_id = req.params.var;
 if (mac_id == "1co0n921t9663b567a94da194a4ae1e5" || mac_id == "1co0n921t9663b567a94da254a4ae1e7") {
  try {
   const getJarData = await getJar(mac_id)
   console.log(getJarData)
   res.json(getJarData)
  } catch (err) {
   res.json(err)
  }
 } else {
  res.json({ "err": "Invalid Mac Id" })
 }

})

/////////////////////////////////////////////////
////////////////////////////////////////////////

dateTime = (date1, date2) => {
 var m1 = moment(date1, 'DD-MM-YYYY HH:mm');
 var m2 = moment(date2, 'DD-MM-YYYY HH:mm');
 var m3 = m2.diff(m1, 'minutes');
 var m4 = m2.diff(m1, 'h');

 var numdays = Math.floor(m3 / 1440);
 var numhours = Math.floor((m3 % 1440) / 60);
 var numminutes = Math.floor((m3 % 1440) % 60);
 //console.log(numdays + " day(s) " + numhours + "h " + numminutes + "m");
 return { "day": numdays, "hour": numhours, "min": numminutes }
}

jarStatus = (mac_id) => {
 return new Promise((resolve, reject) => {
  let Jar_status = {}
  try {
   const quer = "SELECT * FROM jardata where node_mac_id='" + mac_id + "' ORDER BY date_time DESC limit 1"
   db.client.query(quer, function (error, results) {
    if (error) {
     console.log(error)
     resolve("500")
    } else {
     var CurrentDate = moment().format('DD-MM-YYYY HH:mm');
     var jarDate = results.rows[0].date_time;
     jarDate = moment(jarDate).subtract({ 'hours': 0, "minutes": 0 }).format('DD-MM-YYYY HH:mm');
     let dayHouMin = dateTime(jarDate, CurrentDate);
     Jar_status["mac_id"] = mac_id;
     if (dayHouMin.day > 0 || dayHouMin.hour > 0 || dayHouMin.min > 3) {
      Jar_status['status'] = 'ofline';
     } else {
      Jar_status['status'] = 'online';
     }
     resolve(Jar_status)
    }
   });
  } catch (e) {
   console.log(e)
   resolve("500")
  }
 });
}

// get jar statue
app.get('/jar/status', async (req, res) => {
 try {
  const status1 = await jarStatus("1co0n921t9663b567a94da194a4ae1e5");
  const status2 = await jarStatus("1co0n921t9663b567a94da254a4ae1e7");
  //console.log(status1);
  //console.log(status2);
  console.log([status1, status2])
  res.json([status1, status2])
 } catch (err) {
  res.json(err)
 }
})

///////////////////////////
///////////////////////////


history = (mac_id, date1, date2) => {
 return new Promise((resolve, reject) => {
  try {
   const quer = "SELECT * FROM jardata where date_time >='" + date1 + "' AND date_time<= '" + date2 + "' AND node_mac_id='" + mac_id + "'"
   db.client.query(quer, function (error, results) {
    if (error) {
     console.log(error)
     resolve("500")
    } else {
     console.log(results.rows)
     resolve(results.rows)
    }
   });
  }
  catch (er) {
   console.log(er)
   resolve("500")
  }
 });
}

// Post method for collect historic data from datetime range
app.post('/historic-data', async (req, res) => {
 console.log("Post")
 try {
  const { node_mac_id, from_date, to_date } = req.body;
  const historyy = await history(node_mac_id, from_date, to_date)
  res.json(historyy)
 }
 catch (err) {
  res.json(err)
 }
})



http.createServer(app).listen(3200);
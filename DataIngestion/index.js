const mqtt = require('mqtt')
const mdl = require('./models/models')

const client = mqtt.connect('mqtt://35.200.255.103', {
 port: 1883,
 username: 'dxtxmonster',
 password: 'dxtmonsterx',
})

client.on('connect', function () {
 console.log("Connected...");
 client.subscribe('/assesment/test/data/sens/', function (err) {
  if (!err) {
   console.log("hii..")
  }
 })
})

client.on('message', async function (topic, message) {
 var msg = message.toString();
 console.log(msg)
 if (msg) {
  msg = JSON.parse(msg);
  for (i = 0; i < msg.node.data.length; i++) {
   sId = msg.node.data[i].s_id;
   if (sId == "23000C01") {
    ble_val = msg.node.data[i].val;
   }
   if (sId == "24002901") {
    gms_val = msg.node.data[i].val;
   }
   if (sId == "24002902") {
    per_val = msg.node.data[i].val;
   }
  }
  const data = { node_mac_id: msg.node.id, hub_mac_id: msg.hub.id, ble_rssi_val: ble_val, Vacancy_in_gms: gms_val, Vacancy_in_per: per_val, date_time: msg.hub.timestamp }
  console.log("Data: ", data);
  const tdata = new mdl.jardata(data);
  await tdata.save()
 }


 // client.end()
})

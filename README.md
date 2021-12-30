<h1 align="center">MQTT-Brocker-Data-Handling Ingestion and API</h1>

  <h3>Main tools and modules: </h3>
  <ul>
    <li>Node.js</li>
    <li>express</li>
    <li>MQTT.js library</li>
    <li>PostgreSQL</li>
  </ul>

  <h3>The API(s) are:</h3>
  <table style="width:100%">
    <tr>
      <th>Method</th>
      <th>Url</th>
      <th>Permission</th>
      <th>Data</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Get</td>
      <td>/jar/latest-data/:node_mac_id</td>
      <td>Public</td>
      <td>-</td>
      <td>Get the latest sensor data of a Smart Jar
        by MAC ID.</td>
    </tr>
    <tr>
      <td>Get</td>
      <td>/jar/status</td>
      <td>Public</td>
      <td>-</td>
      <td>Get devices online/offline reports.</td>
    </tr>
    <tr>
      <td>Post</td>
      <td>/historic-data</td>
      <td>Public</td>
      <td>{<br>
        "node_mac_id" : String,<br>
        "from_date" : String, format "YYYY-MM-DD HH:MM"<br>
        "to_date" : String, format "YYYY-MM-DD HH:MM"<br>
        }</td>
      <td>Get Historic Data of a device between DateTime range.</td>
    </tr>


  </table>

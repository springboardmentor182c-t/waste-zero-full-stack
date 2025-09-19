# mean-app
Auth & Profile API - V1 API List

<h2>Authentication APIs</h2>

<table>
  <tr>
    <th>Endpoint</th>
    <th>Method</th>
    <th>Request Body</th>
  </tr>
  <tr>
    <td>/api/v1/auth/signup</td>
    <td>POST</td>
    <td>{ "name", "email", "password" }</td>
  </tr>
  <tr>
    <td>/api/v1/auth/login</td>
    <td>POST</td>
    <td>{ "email", "password" }</td>
  </tr>
</table>

<h2>Profile APIs (Protected - Bearer Token Required)</h2>

<table>
  <tr>
    <th>Endpoint</th>
    <th>Method</th>
    <th>Request Body</th>
  </tr>
  <tr>
    <td>/api/v1/profile</td>
    <td>GET</td>
    <td>---</td>
  </tr>
  <tr>
    <td>/api/v1/profile</td>
    <td>PUT</td>
    <td>{ "bio", "location", "skills" }</td>
  </tr>
  <tr>
    <td>/api/v1/profile</td>
    <td>DELETE</td>
    <td>---</td>
  </tr>
</table>

<h2>Utility APIs</h2>

<table>
  <tr>
    <th>Endpoint</th>
    <th>Method</th>
    <th>Request Body</th>
  </tr>
  <tr>
    <td>/api/v1/health</td>
    <td>GET</td>
    <td>---</td>
  </tr>
</table>

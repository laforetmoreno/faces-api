const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  return res.send('habemos um server');
})

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
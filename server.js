//Dependencies
const app = require("./app.js");

//Configuration
require("dotenv").config();
const PORT = process.env.PORT || 3001;

//Listening to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

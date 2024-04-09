const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
app.listen(process.env.PORT, () => {
  console.log(`The server is running. Use API on port: ${process.env.PORT}`);
  console.log("The database was succesfully connected");
});
})
.catch(() => process.exit(1));

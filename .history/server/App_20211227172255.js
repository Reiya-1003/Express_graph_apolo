const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema.js/scema");
const app = express();
const cors = require("cors");

app.use(cors());
mongoose.connect(
  "mongodb+srv://reiya:peichan0127@cluster0.xeuz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("接続しました");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("listening port 4000");
});

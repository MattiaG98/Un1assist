const mongoose = require("mongoose")
const url = process.env.MONGO_URL

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connect
  .then(db => {
    console.log("DBConnection Successfull!")
  })
  .catch(err => {
    console.log(err)
  })
let fs = require('fs');
let join = require('path').join;
const musicDir = join(__dirname, "../../public/music")
const Joke = require('../models/joke');
const co = require('co');
let files = [];
exports.getdata = (req, res) => {
  res.send({
    success: true,
    data: {
      time: (new Date).toString(),
    }
  })
}
function ran (num) {
  return Math.floor(Math.random() * num);
}
exports.getmusicdata = co.wrap(
  function* (req, res) {
    const count = yield Joke.countDocuments();
    const kip = ran(count - 20);
    const result = yield Joke.find().select('joke').skip(kip).limit(12);
    files = fs.readdirSync(musicDir);
    const num = files.length;
    let rm = { data: files[ran(num)], type: "music" };

    let newRes = result.map((item) => ({ data: item.joke, type: "joke" }));
    newRes.unshift(rm);
    res.send({
      success: true,
      data: newRes,
    })
  }
)



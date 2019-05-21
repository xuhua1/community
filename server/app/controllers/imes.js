const Imes = require('../models/imes');
const co = require('co');
const User = require('../models/user');

const unique = (arr, attr) => {
  var hash = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][attr] === arr[j][attr]) {
        ++i;
      }
    }
    hash.push(arr[i]);
  }
  return hash;
}
//增加一条搜索历史

exports.add = (imesJson) => {

  const imes = new Imes(imesJson);
  imes.save()
    .then().catch(function (e) {
      console.log(e.message);
    });
};

//检查发送信息接收人状态
//item.emit('msg', 201, fromId, txt); //没有在接受界面  imes.check(item, fromId,toId,txt );

exports.check = co.wrap(
  function* (item, fromId, toId, txt) {
    try {
      const result = yield Imes.find().or([{ fromId, toId }, { fromId: toId, toId: fromId }]).count();
      if (result > 0) {
        item.emit('msg', 201, { fromId, txt });
      } else {
        const useRes = yield User.findById(fromId).select('avatar nickname');
        const { avatar, nickname } = useRes;
        item.emit('msg', 202, { fromId, txt, avatar, nickname })
      }
    } catch (error) {
      console.log(error.message);
    }
  }
)

//发送两个人的数据
//imes.sendTwoU(fromId, toId, socket);
//fromId相关发送未读, 已读数据
//imes.sendAboutFromId(fromId, socket);
exports.sendTwoU = co.wrap(
  function* (fromId, toId, socket) {
    try {
      Imes.updateMany({ fromId: toId, toId: fromId }, { isReceive: true }, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      const result = yield Imes.find().or([{ fromId, toId }, { fromId: toId, toId: fromId }]).select('fromId ImesValue meta.createdAt');
      const toIdAvatar = yield User.findById(toId).select('avatar').exec();
      socket.emit("sendtwou", result, toIdAvatar.avatar);
    } catch (error) {
      console.log(error.message);
    }
  }
);
exports.sendAboutFromId = co.wrap(
  function* (fromId, socket) {
    try {


      const userRes = yield User.find({}).select('').exec();
      const result = yield Imes.find({ fromId }).select('toId').exec();
      const newResult = unique(result, "toId");
      console.log(newResult.length, result.length);
      let unSendPro = [];
      newResult.forEach((item) => {
        const pro = Imes.countDocuments({ fromId, toId: item.toId, isReceive: false }).exec();
        unSendPro.push(pro);
      });
      const unSendArr = yield Promise.all(unSendPro);


      const result2 = yield Imes.find({ toId: fromId }).select('fromId');
      const newResult2 = unique(result2, "fromId");
      let unReadPro = [];
      newResult2.forEach((item) => {
        const pro2 = Imes.countDocuments({ fromId: item.fromId, toId: fromId, isReceive: false }).exec();
        unReadPro.push(pro2);
      });
      const unReadArr = yield Promise.all(unReadPro);

      const newUnSendArray = newResult.map((item, index) => {
        return {
          fromId,
          toId: item.toId,
          number: unSendArr[index],
        }
      });
      const newUnReadArray = newResult2.map((item, index) => {
        return {
          fromId: item.fromId,
          toId: fromId,
          number: unReadArr[index],
        }
      });
      let allArr1 = result.map(item => item.toId);
      let allArr2 = result2.map(item => item.fromId);
      let allArr = [...new Set([...allArr1, ...allArr2])];
      allArr = userRes.map(item=>item._id);
      socket.emit("aboutfromid", newUnSendArray, newUnReadArray, allArr);
    } catch (error) {
      console.log(error.message);
    }
  }
);



/**
 * 搜索历史
 *//*
let imesSchema = new Schema({
fromId: { type: String, required: true },
toId: { type: String, required: true },
isReceive: { type: Boolean, required: true, default: false },
ImesValue: { type: String, required: true },
meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
});
*/

let aSock = [];
const imes = require('../../controllers/imes');
module.exports = function (io) {
  io.on('connection', socket => {
    aSock.push(socket);
    socket.on('makeconnect', (fromId) => {
      socket.fromId = fromId;

      //发送两个人的数据
      //imes.sendTwoU(fromId, toId, socket);
      //fromId相关发送未读, 已读数据
      imes.sendAboutFromId(fromId, socket);
    });
    socket.on('secondconnect', (fromId, toId) => {
      if (socket.toId === toId) return;
      socket.fromId = fromId;
      socket.toId = toId;
      //发送两个人的数据
      imes.sendTwoU(fromId, toId, socket);

      aSock.forEach(item => {
        if (item.fromId === toId) {
          item.emit('msg', 300, { fromId }); //在连接界面清理未读信息
        }
      })
    });
    socket.on("disconnect", () => {
      aSock = aSock.filter(item => item != socket);
      console.log(socket.fromId + "断开连接");
    });
    socket.on('sendmes', txt => {
      if (!txt) {
        socket.emit('msg', 500, { txt: '消息文本不能为空' });
      } else {
        let isReceive = false;
        //判断用户并发送信息
        const { fromId, toId } = socket;
        aSock.forEach(item => {
          if (item.fromId === toId && item.toId === fromId) {
            item.emit('msg', 200, { fromId, txt }); //在接受界面
            isReceive = true;
          } else if (item.fromId === toId && item.toId !== fromId) {
            //数据库判断
            socket.emit('msg', 400, { toId }); //没有在接受界面
            imes.check(item, fromId, toId, txt);
          }
          //defautl 没有连接
        })
        //储存数据库 发送者, 接收者, 是否已发送
        imes.add({ fromId, toId, isReceive, ImesValue: txt });
      }
    })

  });
  io.on('error', (err) => {
    console.log(err);
  });
}
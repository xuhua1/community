const SearchHistory = require('../models/searchHistory');

//增加一条搜索历史

exports.add = (req, res) => {

  const searchHistory = new SearchHistory(req.body);
  searchHistory.save()
    .then(function (result) {
      res.send({
        success: true,
        data: result._id,
      });
    }).catch(function (e) {
      res.send({
        success: false,
        message: e.message
      });
    });
};

//查询所有搜索历史(最多十个)

exports.findAll = (req, res) => {
  SearchHistory.find({ userId: req.query.userId })
    .limit(10).sort({ 'meta.createdAt': -1 }).select('searchValue').exec((err, result) => {
      if (err) {
        res.send({
          success: false,
          message: e.message
        })
      } else {
        res.send({
          success: true,
          data: result
        })
      }
    })
};

//通过id删除一个

exports.remove = (req, res) => {
  SearchHistory.findByIdAndRemove(req.query.hisId, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: e.message,
      })
    } else {
      res.send({
        success: true,
      })
    }
  })
};

/**
 * 修改id的时间
 */
exports.cHItem = (req, res) => {
  SearchHistory.findByIdAndUpdate(req.query.hisId, { 'meta.createdAt': Date.now() }, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: e.message,
      })
    } else {
      res.send({
        success: true,
      })
    }
  })
}
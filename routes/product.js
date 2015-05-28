exports.productlist = function(db) {
  return function(req, res) {
    db.collection('productlist').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};
exports.addproduct = function(db) {
  return function(req, res) {
    db.collection('productlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};
exports.deleteproduct = function(db) {
  return function(req, res) {
    var productToDelete = req.params.id;
    db.collection('productlist').removeById(productToDelete, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};
var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


const getStats = async (req,res,next)=>{
  try{
    const data = fs.readFileSync(path.join(__dirname,'../stats.json'));
    const stats = JSON.parse(data);
    const playerStats = stats.find(player=>player.id === Number(req.params.id));
    if(!playerStats){
      const err = new Error('Player stas are not found');
      err.status = 404;
      throw err;
    }

    res.json(playerStats);
  }catch(e){
    next(e)
  }
};
router
  .route('/api/v1/stats/:id')
  .get(getStats)

module.exports = router;

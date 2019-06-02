const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', (req, res, next) => {
console.log(req.query)  
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;

  if(sort !== -1 || sort !== 1){
      sort = defaultSort;
  }

  const findNews = News
  .find({title: new RegExp(search.trim(), 'i')})
  .sort({ created: sort})
  .select('_id title description created __v')  //tu ustawiamy elementy, które mają być wyświetlone w json'ie 
  ;

  findNews.exec((err, data) => {
    res.json(data);
  })
});


/* Metoda do pobierania 1 artykułu */
router.get('/:id', (req, res, next) => {
   const id = req.params.id;

      const findNews = News
      .findById(id);
      
    
      findNews.exec((err, data) => {
        res.json(data);
      })
    });

module.exports = router;

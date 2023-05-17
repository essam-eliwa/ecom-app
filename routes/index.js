import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index.js: GET /');
  res.render('pages/index', { title: 'SWE230: Express Demo App' , message : 'WE LOVE MERN STACK'});
});

export default router;

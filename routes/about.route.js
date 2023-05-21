import { Router } from 'express';
const router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
  res.send('About page');
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    //res.send('Test Route');
    res.json({message: "Test Route"});
  });

export default router;

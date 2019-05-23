const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createController = require('./controller');

const start = async ({ port, db }) => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const { getMovieList, saveMovieRank, getMyStats } = createController(db);
  app.get('/', (req, res, next) => getMovieList(req, res).catch(next));
  app.post('/', (req, res, next) => saveMovieRank(req, res).catch(next));
  app.get('/my-stats', (req, res, next) => getMyStats(req, res).catch(next));

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err, req, res) => {
    console.log(err)
    res.status(err.status || 500).send(err)
  });

  app.listen(port);
};

module.exports = { start };

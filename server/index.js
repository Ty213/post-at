const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Postat} = require('./models/postat');
var {Reply} = require('./models/reply');

const PORT = process.env.PORT || 5000;

//(╯°□°）╯︵ ┻━┻
// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(bodyParser.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.post('/api/postats', (req,res) => {
    console.log(req.body);
    var postat = new Postat({
        text: req.body.text,
        loc: {
          type: req.body.loc.type,
          coordinates: req.body.loc.coordinates
        }
    })
    postat.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.post('/api/replies', (req,res) => {
  var reply = new Reply({
      text: req.body.text,
      postat_id: req.body.postat_id
  })
  reply.save().then((doc) => {
      res.send(doc);
  }, (e) => {
      res.status(400).send(e);
  })
});

app.get('/api/postats', (req,res) => {
  Postat.find().then((postats) => {
      res.send({postats});
  }, (e) => {
      res.status(400).send(e);
  })
});

app.get('/api/:lnglat', (req,res) => {
  Postat.aggregate(
    [
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": [-75.022692,39.840271]
            },
            "distanceField": "distance",
            "spherical": true,
            "maxDistance": 1609
        }}
    ],
    function(err,results) {
      res.send({results});
    }
)
});

app.get('/api/postats/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Postat.findById(id).then((postat) => {
      if(!postat) {
        return res.status(404).send();
      }

     res.send({postat});
  }).catch((e) => {
      res.status(400).send();
  })

});

//update smile or frown
app.patch('/api/postats/:id/:emoji', (req,res) => {
  var id = req.params.id;
  var emoji = req.params.emoji;
  console.log(emoji);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(emoji === "smile"){
  Postat.findByIdAndUpdate(id, {$inc: {smile: 1} }, {new: true}).then((postat) => {
    if(!postat) {
      return res.status(404).send();
    }
    res.send({postat});
  }).catch((e) => {
    res.status(400).send();
  })
} else if(emoji === "frown"){
  Postat.findByIdAndUpdate(id, {$inc: {frown: 1} }, {new: true}).then((postat) => {
    if(!postat) {
      return res.status(404).send();
    }
    res.send({postat});
  }).catch((e) => {
    res.status(400).send();
  })

}

});




  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}

//how to pass json for postat
// {
// 	"text": "hi-nella",
// 	 "loc": { 
//          "type": "Point",
//          "coordinates": [-75.022692, 39.840271]
//      }
// }

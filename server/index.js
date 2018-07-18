const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Blep} = require('./models/blep');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// ANSWER API REQUESTS

//original blep - not a response
app.post('/api/blep', (req,res) => {
  const blep = new Blep({
      title: req.body.title,
      content: req.body.content,
      loc: {
        type: req.body.loc.type,
        coordinates: req.body.loc.coordinates
      }
  })
  blep.save().then((doc) => {
      res.send(doc);
  }, (e) => {
      res.status(400).send(e);
  })
});

//Reponse blep - needs parent ID
app.post('/api/blep/:id', (req,res) => {
  const blep = new Blep({
      title: req.body.title,
      content: req.body.content,
      parent: req.params.id,
      loc: {
        type: req.body.loc.type,
        coordinates: req.body.loc.coordinates
      }
  })
  blep.save().then((doc) => {
      res.send(doc);
  }, (e) => {
      res.status(400).send(e);
  })
});

//Get all the bleps
app.get('/api/bleps', (req,res) => {
  Blep.find().then((bleps) => {
      res.send({bleps});
  }, (e) => {
      res.status(400).send(e);
  })
});

//Get bleps by longitude,latitude
app.get('/api/:lnglat', (req,res) => {
  const loc = req.params.lnglat.split(',');
  const lng = parseFloat(loc[0]);
  const lat = parseFloat(loc[1]);

  console.log(lng,lat);
  Blep.aggregate(
    [
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": [lng, lat]
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

// app.get('/api/postats/:id', (req,res) => {
//   var id = req.params.id;

//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Postat.findById(id).then((postat) => {
//       if(!postat) {
//         return res.status(404).send();
//       }

//      res.send({postat});
//   }).catch((e) => {
//       res.status(400).send();
//   })

// });

//update smile or frown
// app.patch('/api/postats/:id/:emoji', (req,res) => {
//   var id = req.params.id;
//   var emoji = req.params.emoji;
//   console.log(emoji);
//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//   if(emoji === "smile"){
//   Postat.findByIdAndUpdate(id, {$inc: {smile: 1} }, {new: true}).then((postat) => {
//     if(!postat) {
//       return res.status(404).send();
//     }
//     res.send({postat});
//   }).catch((e) => {
//     res.status(400).send();
//   })
// } else if(emoji === "frown"){
//   Postat.findByIdAndUpdate(id, {$inc: {frown: 1} }, {new: true}).then((postat) => {
//     if(!postat) {
//       return res.status(404).send();
//     }
//     res.send({postat});
//   }).catch((e) => {
//     res.status(400).send();
//   })

// }

// });

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`listening on port ${PORT}`);
});
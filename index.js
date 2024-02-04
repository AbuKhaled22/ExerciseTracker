const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_KEY)

mongoose.connection.on('error', err => {
  console.log('There was an error connecting to the database: ', err)
})

mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database')
})

const userSchema= mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
},{versionKey: false})

const User= mongoose.model('User', userSchema)

const exerciseSchema = mongoose.Schema({
  description: String,
  duration: Number,
  date: String,
  userId: String
}, { versionKey: false});

const Exercise= mongoose.model('Exercise', exerciseSchema)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {
  const username = req.body.username 

  const foundUser= await User.findOne({username})

  if(foundUser){
    return res.json(foundUser)
  }

  const user =  await User.create({
    username,
  });

  res.json(user);
  
})

app.get('/api/users', async (req, res) => {
  const users= await User.find();
  res.json(users)
})

app.post('/api/users/:_id/exercises', async (req, res) => {
  const _id= req.params._id
  const description= req.body.description
  const duration= req.body.duration
  const date= req.body.date

  const foundUser = await User.findById(_id);

  if(!foundUser){
    return res.json({error: 'User not found'})
  }

  if(!date){
    date= new Date().toDateString();
  }

  const exercise= await Exercise.create({
    username: foundUser.username,
    description,
    duration,
    date,
    userId: foundUser._id
  })
  res.json(exercise)

})


app.get('/api/users/:_id/logs', async (req, res) => {
  const id = req.params._id;
  const from = req.query.from;
  const to = req.query.to;
  const limit = parseInt(req.query.limit);

  const foundUser = await User.findById(id);
  if (!foundUser) {
    return res.json({ error: 'User not found' });
  }

  let query = { userId: id };
  if (from && to) {
    query.date = { $gte: from, $lte: to };
  }

  const foundExercises = await Exercise.find(query).limit(limit);
  const count = foundExercises.length;
  const formattedLogs = foundExercises.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };
  });

  res.json({ username: foundUser.username, count: count, _id: id, log: formattedLogs });
});

/*app.get('/api/users/:_id/logs', async (req, res) => {
  const id= req.params._id  
  const foundUser = await User.findById(id);
  if(!foundUser){
    return res.json({error: 'User not found'})
  }
  const foundExercises = await Exercise.find({userId: id});
  const count = foundExercises.length;
  const formatetedLogs= foundExercises.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }
  })

  res.json({ username: foundUser.username, count: count,_id: id ,log: formatetedLogs});

})*/





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

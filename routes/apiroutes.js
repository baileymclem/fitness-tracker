const db = require("../models");

module.exports = function (app) {

  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" }
      }
    }])
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{
      $addFields: {
        totalDuration:
          { $sum: "$exercises.duration" }
      }
    }])
      .sort({ _id: -1 })
      .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(({ message }) => {
        console.log(message);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    db.Workout.findOneAndUpdate({ _id: id }, {
      $push: {
        exercises: req.body
      }
    })

      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


}
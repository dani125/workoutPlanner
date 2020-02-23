const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth=require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  
  // @route    POST api/profile
  // @desc     Create or update user profile
  // @access   Private
  router.post(
    '/',
    [
      auth,
      [
        check('motivation', 'motivation is required')
          .not()
          .isEmpty(),
        check('goals', 'goals are required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        goals,
        motivation,
        
     } = req.body;
  
      // Build profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (motivation) profileFields.motivation = motivation;
      if (goals) profileFields.goals = goals;
      
  
     
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  
  
  
  
  // @route    DELETE api/profile
  // @desc     Delete profile, user & posts
  // @access   Private
  router.delete('/', auth, async (req, res) => {
    try {
      
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    PUT api/profile/workouts
  // @desc     Add profile workouts
  // @access   Private
  router.put(
    '/workouts',
    [
      auth,
      [
        check('title', 'Need to add workout')
          .not()
          .isEmpty(),
        check('description', 'Need to add workout')
          .not()
          .isEmpty(),
          check('date', 'From date is required')
        .not()
        .isEmpty()
      
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title, 
        description,
        date

      } = req.body;
  
      const newWorkout = {
        title,
        description,
        date
       
      };
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.workouts.unshift(newWorkout);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  // @route    PUT api/profile/workouts
  // @desc     Add profile workouts
  // @access   Private
  
  router.delete("/workouts/:workout_id", auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.workouts = foundProfile.workouts.filter(
       workout => workout._id.toString() !== req.params.workout_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });
  // @route    PUT api/profile/workouts
  // @desc     Add profile workouts
  // @access   Private

  router.put("/workouts/:workout_id", auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.workouts = foundProfile.workouts.map(
       workout => workout._id.toString() === req.params.workout_id ? (workout= req.body): workout
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

  router.get("/workouts/:workout_id", auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });

      const found = foundProfile.workouts.map(
        workout => workout._id.toString() === req.params.workout_id ? (workout): workout
       );
   
      return res.status(200).json(found);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });
  
  module.exports = router;
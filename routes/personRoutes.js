const express = require('express');
const router = express.Router(); 

const Person = require('./../models/Person');

router.post('/', async (req, res) => {
    try {
      const data = req.body; // Assign the request body contents to the Person data
      // Create a new instance of the Person model with the extracted data
      const newPerson = new Person(data);
      // Save the new Person instance to the database
      const response = await newPerson.save();
      console.log('Data Saved:');
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      // Retrieve data from the database (assuming Person model)
      const data = await Person.find();
      // Log the retrieved data
      console.log('Data Retrieved:', data);
      // Send the retrieved data as a JSON response
      res.status(200).json(data);
    } catch (err) {
      // If an error occurs, log the error and send an error response
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  // wirk Type fron the URL Parameters/// 
router.get('/:workType' , async(req, res) => {
    try {
       const workType = req.params.workType;
       if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
       const response = await Person.find({work: workType});
       console.log('response fatched');
       res.status(200).json(response); 
       } 
       else {
         res.status(400).json({ error: 'Invalid work type' });
       }
     }catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal server error' });
    }
   })


   router.put('/:id' , async(req, res) => {
    try {
       const personId = req.params.id;
       const updatedPersonData = req.body;
       const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
         new: true, 
         runValidators: true,
        });
       if (!response) {
         return res.status(404).json({ error: 'Person not found' });
       }
       console.log('Data updated');
       res.status(200).json(response);  
     }
     catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal server error' });
    }
   });



   router.delete('/:id' , async(req, res) => {
    try {
       const personId = req.params.id;
       const response = await Person.findByIdAndDelete(personId);
       if (!response) {
         return res.status(404).json({ error: 'Person not found' });
       }
       console.log('Data Deleted');
       res.status(200).json({massage: 'Data Deleted Successfully'});  
     }
     catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal server error' });
    }
   });

   module.exports = router;
 
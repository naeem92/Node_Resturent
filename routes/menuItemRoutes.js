const express = require('express');
const router = express.Router(); 
const MenuItem = require('./../models/MenuItem');
router.post('/', async (req, res) => {
    try {
      const data = req.body; // Assign the request body contents to the Person data
      // Create a new instance of the Person model with the extracted data
      const newMenu = new MenuItem(data);
      // Save the new Person instance to the database
      const response = await newMenu.save();
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
      const data = await MenuItem.find();
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


  router.get('/:tasteType', async (req, res) => {
    try {
      const tasteType = req.params.tasteType;
      if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sauce'){
        const response = await MenuItem.find({taste: tasteType});
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
    
// Update a specific MenuItem
router.put('/:id' , async(req, res) => {
  try {
     const MenuItemId = req.params.id;
     const updatedMenuData = req.body;
     const response = await MenuItem.findByIdAndUpdate(MenuItemId, updatedMenuData,{
      new: true, 
      runValidators: true
  });
     if (!response) {
       return res.status(404).json({ error: 'Menu not found' });
     }
     console.log('Data updated');
     res.status(200).json(response);  
   }
   catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Internal server error' });
  }
 });

   // Delete a specific MenuItem
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }

    console.log('Deleted MenuItem:', deletedMenuItem);
    res.status(200).json({massage: 'Data Deleted Successfully'}); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  module.exports = router;
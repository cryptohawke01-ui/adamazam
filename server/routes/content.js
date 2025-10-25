const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

// Get all content for public website
router.get('/', async (req, res) => {
  try {
    // Get all content sections
    const { data: content, error } = await supabase
      .from('website_content')
      .select('*')
      .order('order_index');

    if (error) {
      throw error;
    }

    res.json({ content });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Get specific content section
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;

    const { data: content, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('section', section)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Content section not found' });
    }

    res.json({ content });
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({ error: 'Failed to fetch content section' });
  }
});

// Get menu items
router.get('/menu/items', async (req, res) => {
  try {
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('order_index');

    if (error) {
      throw error;
    }

    res.json({ menuItems });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

module.exports = router;

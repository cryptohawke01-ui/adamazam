const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { verifyToken } = require('./auth');

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(verifyToken);

// Get all content for admin panel
router.get('/content', async (req, res) => {
  try {
    const { data: content, error } = await supabaseAdmin
      .from('website_content')
      .select('*')
      .order('order_index');

    if (error) {
      throw error;
    }

    res.json({ content });
  } catch (error) {
    console.error('Get admin content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Create new content section
router.post('/content', async (req, res) => {
  try {
    const { section, title, content: contentText, order_index, is_active } = req.body;

    if (!section || !title || !contentText) {
      return res.status(400).json({ error: 'Section, title, and content are required' });
    }

    const { data: content, error } = await supabaseAdmin
      .from('website_content')
      .insert([
        {
          section,
          title,
          content: contentText,
          order_index: order_index || 0,
          is_active: is_active !== undefined ? is_active : true
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ content });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Update content section
router.put('/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { section, title, content: contentText, order_index, is_active } = req.body;

    const { data: content, error } = await supabaseAdmin
      .from('website_content')
      .update({
        section,
        title,
        content: contentText,
        order_index,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ content });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content section
router.delete('/content/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('website_content')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// Menu management
router.get('/menu', async (req, res) => {
  try {
    const { data: menuItems, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .order('order_index');

    if (error) {
      throw error;
    }

    res.json({ menuItems });
  } catch (error) {
    console.error('Get admin menu error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

router.post('/menu', async (req, res) => {
  try {
    const { label, url, order_index, is_active } = req.body;

    if (!label || !url) {
      return res.status(400).json({ error: 'Label and URL are required' });
    }

    const { data: menuItem, error } = await supabaseAdmin
      .from('menu_items')
      .insert([
        {
          label,
          url,
          order_index: order_index || 0,
          is_active: is_active !== undefined ? is_active : true
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ menuItem });
  } catch (error) {
    console.error('Create menu error:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

router.put('/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label, url, order_index, is_active } = req.body;

    const { data: menuItem, error } = await supabaseAdmin
      .from('menu_items')
      .update({
        label,
        url,
        order_index,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ menuItem });
  } catch (error) {
    console.error('Update menu error:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

router.delete('/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Delete menu error:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

module.exports = router;

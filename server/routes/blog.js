const express = require('express');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { verifyToken } = require('./auth');

const router = express.Router();

// Public routes - get all published blogs
router.get('/', async (req, res) => {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Public route - get single blog
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ blog });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Admin routes - require authentication
router.use(verifyToken);

// Get all blogs (including unpublished) for admin
router.get('/admin/all', async (req, res) => {
  try {
    const { data: blogs, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ blogs });
  } catch (error) {
    console.error('Get admin blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Create new blog
router.post('/admin', async (req, res) => {
  try {
    const { 
      title, 
      excerpt, 
      content, 
      image_url, 
      meta_title,
      meta_description,
      meta_keywords,
      slug,
      author,
      reading_time,
      featured,
      category,
      tags,
      published = false 
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate slug from title if not provided
    const generatedSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .insert([
        {
          title,
          excerpt: excerpt || '',
          content,
          image_url: image_url || null,
          meta_title: meta_title || null,
          meta_description: meta_description || null,
          meta_keywords: meta_keywords || null,
          slug: generatedSlug,
          author: author || null,
          reading_time: reading_time || null,
          featured: featured || false,
          category: category || null,
          tags: tags || null,
          published,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ blog });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Update blog
router.put('/admin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      excerpt, 
      content, 
      image_url, 
      meta_title,
      meta_description,
      meta_keywords,
      slug,
      author,
      reading_time,
      featured,
      category,
      tags,
      published 
    } = req.body;

    // Generate slug from title if not provided
    const generatedSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .update({
        title,
        excerpt,
        content,
        image_url: image_url || null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        meta_keywords: meta_keywords || null,
        slug: generatedSlug,
        author: author || null,
        reading_time: reading_time || null,
        featured: featured || false,
        category: category || null,
        tags: tags || null,
        published,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ blog });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete blog
router.delete('/admin/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Publish blog
router.put('/admin/:id/publish', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .update({
        published: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ blog });
  } catch (error) {
    console.error('Publish blog error:', error);
    res.status(500).json({ error: 'Failed to publish blog' });
  }
});

// Unpublish blog
router.put('/admin/:id/unpublish', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabaseAdmin
      .from('blogs')
      .update({
        published: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ blog });
  } catch (error) {
    console.error('Unpublish blog error:', error);
    res.status(500).json({ error: 'Failed to unpublish blog' });
  }
});

module.exports = router;

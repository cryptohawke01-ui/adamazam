-- Complete Blogs Table with SEO Fields
-- Run this SQL in your Supabase dashboard

CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Content Fields
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  
  -- SEO Fields
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  meta_keywords TEXT,
  slug VARCHAR(255) UNIQUE,
  
  -- Author & Publishing
  author VARCHAR(100),
  reading_time INTEGER, -- in minutes
  
  -- Categorization
  category VARCHAR(50),
  tags TEXT, -- comma-separated tags
  
  -- Status & Features
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to published blogs
CREATE POLICY "Public read access for published blogs" ON blogs
  FOR SELECT USING (published = true);

-- Create policies for admin access (full CRUD)
CREATE POLICY "Admin full access for blogs" ON blogs
  FOR ALL USING (true);

-- Insert sample blog post for testing
INSERT INTO blogs (
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
  category,
  tags,
  published,
  featured
) VALUES (
  'From Ground Zero to Success: The Journey of Starting Over',
  'This compelling memoir tells the story of Adam Muhammad Azam''s remarkable journey through one of America''s darkest periods. The book explores themes of resilience, identity, and the pursuit of the American dream in the face of unprecedented challenges.',
  'Your new journey. Eventually, the journey from ground zero to success is a story of resilience, determination, and self-discovery. It''s a shred of evidence of the human spirit''s ability to adapt and succeed in the face of adversity. This story is not just about survival; it''s about transformation, growth, and the unwavering belief that every ending is a new beginning waiting to unfold.',
  'https://raw.githubusercontent.com/username/repo/main/sample-image.jpg',
  'From Ground Zero to Success: Starting Over Journey',
  'Discover the inspiring journey of resilience and success. Learn how to overcome challenges and transform your life from ground zero to achievement.',
  'success, resilience, personal growth, starting over, motivation, inspiration',
  'from-ground-zero-to-success-journey',
  'Adam Muhammad Azam',
  5,
  'Personal Development',
  'motivation, resilience, success, personal growth, inspiration',
  true,
  true
);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

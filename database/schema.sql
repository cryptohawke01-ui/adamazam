-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website_content table
CREATE TABLE website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default menu items
INSERT INTO menu_items (label, url, order_index, is_active) VALUES
('HOME', '/', 1, true),
('ABOUT THE BOOK', '/about-the-book', 2, true),
('ABOUT THE AUTHOR', '/about-the-author', 3, true),
('BLOG', '/blog', 4, true),
('CONTACT US', '/contact-us', 5, true);

-- Insert default content
INSERT INTO website_content (section, title, content, order_index, is_active) VALUES
('home', 'Hero Section', 'Adam Muhammad Azam, the author of "Surviving 9/11: My American Dream Reclaimed," is an amazing individual whose life journey serves as evidence of the power of determination and resilience. Born with a firm spirit and a persistent drive for success, Azam''s life took a surprising turn in the wake of the 9/11 terrorist attacks. Before this essential moment, he had attained significant success as a regional director at Snyder Communications (AT&T).', 1, true),
('about-book', 'Book Overview', 'This compelling memoir tells the story of Adam Muhammad Azam''s remarkable journey through one of America''s darkest periods. The book explores themes of resilience, identity, and the pursuit of the American dream in the face of unprecedented challenges.', 1, true),
('about-author', 'Author Biography', 'Adam Muhammad Azam is an inspiring individual whose life journey serves as evidence of the power of determination and resilience. His story is one of triumph over adversity and the relentless pursuit of the American dream.', 1, true),
('blog', 'Blog Content', 'Our blog will feature personal insights, professional experiences, and reflections on topics ranging from leadership and resilience to community service and the pursuit of success.', 1, true),
('contact', 'Contact Information', 'We''re always interested in hearing from readers, potential collaborators, and anyone who has been inspired by Adam Azam''s story. Whether you have questions about his book, want to discuss speaking opportunities, or simply want to share your own story of resilience, we''d love to connect with you.', 1, true);

-- Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to content and menu
CREATE POLICY "Public read access for website_content" ON website_content
  FOR SELECT USING (true);

CREATE POLICY "Public read access for menu_items" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "Public read access for published blogs" ON blogs
  FOR SELECT USING (published = true);

-- Create policies for admin access
CREATE POLICY "Admin full access for admin_users" ON admin_users
  FOR ALL USING (true);

CREATE POLICY "Admin full access for website_content" ON website_content
  FOR ALL USING (true);

CREATE POLICY "Admin full access for menu_items" ON menu_items
  FOR ALL USING (true);

CREATE POLICY "Admin full access for blogs" ON blogs
  FOR ALL USING (true);

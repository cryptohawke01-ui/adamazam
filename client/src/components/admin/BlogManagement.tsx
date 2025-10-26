import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBlogs, createBlog, updateBlog, deleteBlog, publishBlog, unpublishBlog } from '../../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BlogCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BlogDate = styled.span`
  color: ${props => props.theme.colors.accent};
  font-size: 0.85rem;
`;

const BlogStatus = styled.span<{ $isPublished: boolean }>`
  background-color: ${props => props.$isPublished ? '#44ff44' : '#ffaa00'};
  color: ${props => props.$isPublished ? '#000' : '#000'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const BlogActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' | 'publish' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.3s ease;
  
  ${props => {
    switch (props.$variant) {
      case 'edit':
        return `
          background-color: #0066cc;
          color: white;
          &:hover { background-color: #0052a3; }
        `;
      case 'delete':
        return `
          background-color: #ff4444;
          color: white;
          &:hover { background-color: #cc3333; }
        `;
      case 'publish':
        return `
          background-color: #44ff44;
          color: #000;
          &:hover { background-color: #33cc33; }
        `;
      default:
        return `
          background-color: ${props.theme.colors.border};
          color: ${props.theme.colors.text};
          &:hover { background-color: ${props.theme.colors.accent}; color: white; }
        `;
    }
  }}
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

// Removed unused styled components - they were defined but not used in the current implementation

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const BlogManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  // Removed unused activeTab state - tabs are not implemented in current version
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    slug: '',
    author: '',
    reading_time: '',
    featured: false,
    category: '',
    tags: ''
  });

  const queryClient = useQueryClient();

  const { data: blogs, isLoading, error } = useQuery('blogs', getBlogs, {
    retry: 1,
    refetchOnWindowFocus: false
  });

  const createBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      setIsModalOpen(false);
      resetForm();
    }
  });

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const publishBlogMutation = useMutation(publishBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const unpublishBlogMutation = useMutation(unpublishBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      published: false,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      slug: '',
      author: '',
      reading_time: '',
      featured: false,
      category: '',
      tags: ''
    });
    setEditingBlog(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlog) {
      updateBlogMutation.mutate({
        ...editingBlog,
        ...formData
      });
    } else {
      createBlogMutation.mutate({
        ...formData,
        id: Date.now(), // Temporary ID
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image_url: blog.image_url || '',
      published: blog.published || false,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      meta_keywords: blog.meta_keywords || '',
      slug: blog.slug || '',
      author: blog.author || '',
      reading_time: blog.reading_time || '',
      featured: blog.featured || false,
      category: blog.category || '',
      tags: blog.tags || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (blogId: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogMutation.mutate(blogId.toString());
    }
  };

  const handlePublishToggle = (blog: any) => {
    if (blog.published) {
      unpublishBlogMutation.mutate(blog.id.toString());
    } else {
      publishBlogMutation.mutate(blog.id.toString());
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Blog Management</Title>
          <AddButton onClick={handleAddNew}>
            + Add New Blog Post
          </AddButton>
        </Header>
        <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
          Error loading blogs: {error instanceof Error ? error.message : 'Unknown error occurred'}
        </div>
      </Container>
    );
  }

  const blogsList = blogs?.blogs || [];

  return (
    <Container>
      <Header>
        <Title>Blog Management</Title>
        <AddButton onClick={handleAddNew}>
          + Add New Blog Post
        </AddButton>
      </Header>

      <BlogGrid>
        {blogsList.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666'
          }}>
            <h3>No blog posts yet</h3>
            <p>Click "Add New Blog Post" to create your first blog post.</p>
          </div>
        ) : (
          blogsList.map((blog: any) => (
          <BlogCard key={blog.id}>
              {blog.image_url && (
                <BlogImage src={blog.image_url} alt={blog.title} />
              )}
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
            <BlogMeta>
                <BlogDate>{new Date(blog.created_at || blog.createdAt).toLocaleDateString()}</BlogDate>
              <BlogStatus $isPublished={blog.published}>
                {blog.published ? 'Published' : 'Draft'}
              </BlogStatus>
            </BlogMeta>
            <BlogActions>
              <ActionButton $variant="edit" onClick={() => handleEdit(blog)}>
                Edit
              </ActionButton>
              <ActionButton $variant="publish" onClick={() => handlePublishToggle(blog)}>
                {blog.published ? 'Unpublish' : 'Publish'}
              </ActionButton>
              <ActionButton $variant="delete" onClick={() => handleDelete(blog.id)}>
                Delete
              </ActionButton>
            </BlogActions>
          </BlogCard>
          ))
        )}
      </BlogGrid>

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
            </ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              ×
            </CloseButton>
          </ModalHeader>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Enter blog post title"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <TextArea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                required
                placeholder="Brief description of the blog post"
                style={{ minHeight: '100px' }}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="image_url">Featured Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="content">Content *</Label>
              <TextArea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                placeholder="Write your blog post content here..."
                style={{ minHeight: '300px' }}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                />
                {' '}Published
              </Label>
            </FormGroup>
            
            <SubmitButton type="submit">
              {editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
            </SubmitButton>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default BlogManagement;

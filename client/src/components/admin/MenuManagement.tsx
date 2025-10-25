import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAdminMenu, createMenu, updateMenu, deleteMenu } from '../../services/api';

const MenuContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const MenuCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  ${props => props.$variant === 'edit' && `
    background-color: ${props.theme.colors.accent};
    color: ${props.theme.colors.text};
  `}
  
  ${props => props.$variant === 'delete' && `
    background-color: ${props.theme.colors.error};
    color: ${props.theme.colors.text};
  `}
`;

const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const CancelButton = styled.button`
  background-color: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #555555;
  }
`;

const MenuManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    order_index: 0,
    is_active: true
  });

  const queryClient = useQueryClient();
  const { data: menu, isLoading } = useQuery('adminMenu', getAdminMenu);

  const createMutation = useMutation(createMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminMenu');
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation(updateMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminMenu');
      setIsModalOpen(false);
      setEditingMenu(null);
      resetForm();
    }
  });

  const deleteMutation = useMutation(deleteMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminMenu');
    }
  });

  const resetForm = () => {
    setFormData({
      label: '',
      url: '',
      order_index: 0,
      is_active: true
    });
  };

  const handleEdit = (item: any) => {
    setEditingMenu(item);
    setFormData({
      label: item.label,
      url: item.url,
      order_index: item.order_index,
      is_active: item.is_active
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMenu) {
      updateMutation.mutate({ id: editingMenu.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MenuContainer>
      <MenuTitle>Menu Management</MenuTitle>
      <AddButton onClick={() => setIsModalOpen(true)}>
        Add New Menu Item
      </AddButton>

      <MenuGrid>
        {menu?.menuItems?.map((item: any) => (
          <MenuCard key={item.id}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
              <CardActions>
                <ActionButton $variant="edit" onClick={() => handleEdit(item)}>
                  Edit
                </ActionButton>
                <ActionButton $variant="delete" onClick={() => handleDelete(item.id)}>
                  Delete
                </ActionButton>
              </CardActions>
            </CardHeader>
            <CardContent>
              <p><strong>URL:</strong> {item.url}</p>
              <p><strong>Order:</strong> {item.order_index}</p>
              <p><strong>Active:</strong> {item.is_active ? 'Yes' : 'No'}</p>
            </CardContent>
          </MenuCard>
        ))}
      </MenuGrid>

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalTitle>
            {editingMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
          </ModalTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="label">Label</Label>
              <Input
                type="text"
                id="label"
                name="label"
                value={formData.label}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="url">URL</Label>
              <Input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="order_index">Order Index</Label>
              <Input
                type="number"
                id="order_index"
                name="order_index"
                value={formData.order_index}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                Active
              </Label>
            </FormGroup>
            <ModalActions>
              <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">
                {editingMenu ? 'Update' : 'Create'}
              </SubmitButton>
            </ModalActions>
          </form>
        </ModalContent>
      </Modal>
    </MenuContainer>
  );
};

export default MenuManagement;

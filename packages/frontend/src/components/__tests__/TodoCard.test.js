import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2025-12-25',
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 25, 2025/)).toBeInTheDocument();
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  // User Story 1 Tests - Visual Identification of Overdue Todos
  describe('Overdue Visual Styling (User Story 1)', () => {
    it('should display overdue todo with danger color className', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const overdueTodo = {
        ...mockTodo,
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0
      };
      
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      const title = container.querySelector('.todo-title');
      
      expect(title).toHaveClass('overdue');
    });

    it('should display warning icon with aria-label for overdue todo', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const overdueTodo = {
        ...mockTodo,
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0
      };
      
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      const warningIcon = screen.getByLabelText('overdue');
      
      expect(warningIcon).toBeInTheDocument();
      expect(warningIcon).toHaveClass('warning-icon');
    });

    it('should NOT show overdue styling when due date is today', () => {
      const today = new Date().toISOString().split('T')[0];
      const todayTodo = {
        ...mockTodo,
        dueDate: today,
        completed: 0
      };
      
      const { container } = render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      const title = container.querySelector('.todo-title');
      
      expect(title).not.toHaveClass('overdue');
      expect(screen.queryByLabelText('overdue')).not.toBeInTheDocument();
    });

    it('should NOT show overdue styling when todo is completed with past due date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const completedOverdueTodo = {
        ...mockTodo,
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 1
      };
      
      const { container } = render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);
      const title = container.querySelector('.todo-title');
      
      expect(title).not.toHaveClass('overdue');
      expect(screen.queryByLabelText('overdue')).not.toBeInTheDocument();
    });

    it('should NOT show overdue styling when todo has no due date', () => {
      const noDateTodo = {
        ...mockTodo,
        dueDate: null,
        completed: 0
      };
      
      const { container } = render(<TodoCard todo={noDateTodo} {...mockHandlers} isLoading={false} />);
      const title = container.querySelector('.todo-title');
      
      expect(title).not.toHaveClass('overdue');
      expect(screen.queryByLabelText('overdue')).not.toBeInTheDocument();
    });
  });

  // User Story 2 Tests - Overdue Date Display
  describe('Days Overdue Display (User Story 2)', () => {
    it('should display "1 day overdue" for todo 1 day past due', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const overdueTodo = {
        ...mockTodo,
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0
      };
      
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('1 day overdue')).toBeInTheDocument();
    });

    it('should display "5 days overdue" for todo 5 days past due (plural)', () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const overdueTodo = {
        ...mockTodo,
        dueDate: fiveDaysAgo.toISOString().split('T')[0],
        completed: 0
      };
      
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('5 days overdue')).toBeInTheDocument();
    });

    it('should NOT display overdue text when due date is today', () => {
      const today = new Date().toISOString().split('T')[0];
      const todayTodo = {
        ...mockTodo,
        dueDate: today,
        completed: 0
      };
      
      render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/overdue/)).not.toBeInTheDocument();
    });

    it('should NOT display overdue text when todo has no due date', () => {
      const noDateTodo = {
        ...mockTodo,
        dueDate: null,
        completed: 0
      };
      
      render(<TodoCard todo={noDateTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/overdue/)).not.toBeInTheDocument();
    });

    it('should NOT display overdue text when completed todo has past due date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const completedOverdueTodo = {
        ...mockTodo,
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 1
      };
      
      render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/overdue/)).not.toBeInTheDocument();
    });
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from '../components/QuestionCard';

vi.mock('../components/BookmarkButton', () => ({
  default: () => <button data-testid="mock-bookmark-btn">Bookmark</button>,
}));

describe('QuestionCard Component', () => {
  const mockQuestion = {
    id: 'q1',
    concept_name: 'Percentage Basics',
    difficulty: 'Easy',
    question_text: 'What is 20% of 80?',
    options: {
      A: '16',
      B: '20',
      C: '24',
      D: '12'
    },
    correct_answer: 'A'
  };

  it('should render the question, category meta, difficulty badge, and bookmark button', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onSubmit={vi.fn()}
        submitted={false}
        selectedOption={null}
        onOptionSelect={vi.fn()}
      />
    );

    expect(screen.getByText('Percentage Basics')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('What is 20% of 80?')).toBeInTheDocument();
    expect(screen.getByTestId('mock-bookmark-btn')).toBeInTheDocument();
    
    // Check all options rendered
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should call onOptionSelect when clicking an option and not submitted', () => {
    const handleOptionSelect = vi.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        onSubmit={vi.fn()}
        submitted={false}
        selectedOption={null}
        onOptionSelect={handleOptionSelect}
      />
    );

    const optionBtn = screen.getByText('20').closest('button');
    fireEvent.click(optionBtn);

    expect(handleOptionSelect).toHaveBeenCalledWith('B');
  });

  it('should call onSubmit with chosen option when clicking submit button', () => {
    const handleSubmit = vi.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        onSubmit={handleSubmit}
        submitted={false}
        selectedOption="A"
        onOptionSelect={vi.fn()}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /submit answer/i });
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledWith('A');
  });

  it('should disable option selection and display correct feedback after submission', () => {
    const handleOptionSelect = vi.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        onSubmit={vi.fn()}
        submitted={true}
        selectedOption="A"
        onOptionSelect={handleOptionSelect}
      />
    );

    // Clicking option should not trigger onOptionSelect
    const optionBtn = screen.getByText('20').closest('button');
    expect(optionBtn).toBeDisabled();
    fireEvent.click(optionBtn);
    expect(handleOptionSelect).not.toHaveBeenCalled();

    // Correct answer feedback is shown
    expect(screen.getByText(/correct! watch the explanation below/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /submit answer/i })).not.toBeInTheDocument();
  });

  it('should display wrong answer feedback if submitted option is incorrect', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        onSubmit={vi.fn()}
        submitted={true}
        selectedOption="B"
        onOptionSelect={vi.fn()}
      />
    );

    expect(screen.getByText(/not quite\. correct answer: a/i)).toBeInTheDocument();
  });
});

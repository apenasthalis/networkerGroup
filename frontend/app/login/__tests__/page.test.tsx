import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../page';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

// Mock the API service
jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders the login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Token de Acesso/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('handles successful login with a valid token', async () => {
    (api.post as jest.Mock).mockResolvedValue({ status: 200 });

    render(<LoginPage />);

    const tokenInput = screen.getByLabelText(/Token de Acesso/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(tokenInput, { target: { value: 'valid-token-123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/validate-token', { token: 'valid-token-123' });
      expect(sessionStorage.getItem('userToken')).toBe('valid-token-123');
      expect(mockPush).toHaveBeenCalledWith('/cadastro-completo');
    });
  });

  it('displays an error message for an invalid token', async () => {
    (api.post as jest.Mock).mockRejectedValue({ response: { data: { error: 'Token inválido.' } } });

    render(<LoginPage />);

    const tokenInput = screen.getByLabelText(/Token de Acesso/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(tokenInput, { target: { value: 'invalid-token-456' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/validate-token', { token: 'invalid-token-456' });
      expect(sessionStorage.getItem('userToken')).toBeNull();
      expect(screen.getByText(/Token inválido./i)).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('displays a generic error message for API failure', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Network Error'));

    render(<LoginPage />);

    const tokenInput = screen.getByLabelText(/Token de Acesso/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(tokenInput, { target: { value: 'some-token' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/validate-token', { token: 'some-token' });
      expect(sessionStorage.getItem('userToken')).toBeNull();
      expect(screen.getByText(/Erro ao validar o token. Tente novamente./i)).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});

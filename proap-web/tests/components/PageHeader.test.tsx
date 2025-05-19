import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from '../../src/components/PageHeader';
import { vi } from 'vitest';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('PageHeader', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o título corretamente', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título de Teste" />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole('heading', { name: /Título de Teste/i }),
    ).toBeInTheDocument();
  });

  it('deve renderizar o subtítulo se fornecido', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título" subtitle="Subtítulo de Teste" />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Subtítulo de Teste/i)).toBeInTheDocument();
  });

  it('não deve renderizar o subtítulo se não fornecido', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título" />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/Subtítulo de Teste/i)).not.toBeInTheDocument();
  });

  it('deve renderizar o botão de voltar se backUrl for fornecido e chamar navigate na URL correta ao clicar', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título" backUrl="/pagina-anterior" />
      </BrowserRouter>,
    );
    const backButton = screen.getByRole('button', { name: /voltar/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/pagina-anterior');
  });

  it('deve chamar navigate com -1 quando backUrl é uma string vazia', () => {
    mockedNavigate.mockClear();

    render(
      <BrowserRouter>
        <PageHeader title="Título" backUrl="" />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /voltar/i }));

    expect(mockedNavigate).toHaveBeenCalledWith(-1);
    expect(mockedNavigate).not.toHaveBeenCalledWith('');
  });

  it('não deve renderizar o botão de voltar se backUrl não for fornecido (undefined)', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título" />
      </BrowserRouter>,
    );
    expect(
      screen.queryByRole('button', { name: /voltar/i }),
    ).not.toBeInTheDocument();
  });

  it('deve renderizar as ações se fornecidas', () => {
    const AcoesDeTeste = () => <button>Ação Teste</button>;
    render(
      <BrowserRouter>
        <PageHeader title="Título" actions={<AcoesDeTeste />} />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole('button', { name: /Ação Teste/i }),
    ).toBeInTheDocument();
  });

  it('não deve renderizar a área de ações se não fornecidas', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Título" />
      </BrowserRouter>,
    );
    expect(
      screen.queryByRole('button', { name: /Ação Teste/i }),
    ).not.toBeInTheDocument();
  });
});

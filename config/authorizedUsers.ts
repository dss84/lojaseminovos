// Lista de usuários autorizados a acessar a área administrativa
// Para adicionar novos usuários, inclua email e senha nesta lista

export interface AuthorizedUser {
  email: string;
  password: string;
  name: string;
}

export const AUTHORIZED_USERS: AuthorizedUser[] = [
  {
    email: 'admin@lucasseminovos.com.br',
    password: 'admin123',
    name: 'Administrador'
  },
  {
    email: 'vendedor@lucasseminovos.com.br',
    password: 'vendedor123',
    name: 'Vendedor Principal'
  },
  // Adicione mais usuários aqui conforme necessário
  // {
  //   email: 'outro@autopremium.com',
  //   password: 'senha123',
  //   name: 'Outro Vendedor'
  // }
];

// Função para validar credenciais
export const validateCredentials = (email: string, password: string): boolean => {
  return AUTHORIZED_USERS.some(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
};

// Função para obter nome do usuário
export const getUserName = (email: string): string | null => {
  const user = AUTHORIZED_USERS.find(
    user => user.email.toLowerCase() === email.toLowerCase()
  );
  return user ? user.name : null;
};

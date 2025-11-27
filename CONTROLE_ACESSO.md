# Sistema de Controle de Acesso

## Como funciona

O sistema agora possui um controle de acesso restrito. Apenas usuários previamente cadastrados no arquivo `config/authorizedUsers.ts` podem acessar a área administrativa.

## Usuários Autorizados Padrão

- **Email:** admin@lucasseminovos.com.br  
  **Senha:** admin123  
  **Nome:** Administrador

- **Email:** vendedor@lucasseminovos.com.br  
  **Senha:** vendedor123  
  **Nome:** Vendedor Principal

## Como Adicionar Novos Usuários

1. Abra o arquivo `config/authorizedUsers.ts`
2. No array `AUTHORIZED_USERS`, adicione um novo objeto com o formato:

```typescript
{
  email: 'novousuario@lucasseminovos.com.br',
  password: 'senhaSegura123',
  name: 'Nome do Vendedor'
}
```

### Exemplo:

```typescript
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
  {
    email: 'joao@lucasseminovos.com.br',
    password: 'joao456',
    name: 'João Silva'
  },
  {
    email: 'maria@lucasseminovos.com.br',
    password: 'maria789',
    name: 'Maria Santos'
  }
];
```

## Segurança

⚠️ **IMPORTANTE:** Este é um sistema de demonstração. Para produção, você deve:

1. **Nunca armazenar senhas em texto puro**
2. Implementar um backend com autenticação JWT ou OAuth
3. Usar hash de senhas (bcrypt, argon2, etc.)
4. Implementar rate limiting para prevenir ataques de força bruta
5. Adicionar autenticação de dois fatores (2FA)
6. Usar HTTPS em produção

## Como Remover um Usuário

Simplesmente remova o objeto correspondente do array `AUTHORIZED_USERS` no arquivo `config/authorizedUsers.ts`.

## Testando

1. Tente fazer login com credenciais não autorizadas - você verá uma mensagem de erro
2. Use uma das credenciais autorizadas - o acesso será permitido
3. O nome do usuário será exibido no painel administrativo

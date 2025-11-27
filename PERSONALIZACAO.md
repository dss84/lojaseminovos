# Guia de Personalização - AutoPremium Select

## 📋 Índice
- [Informações de Contato](#informações-de-contato)
- [Usuários Autorizados](#usuários-autorizados)
- [Imagem do Hero](#imagem-do-hero)
- [Localização no Mapa](#localização-no-mapa)

---

## 📞 Informações de Contato

Para atualizar as informações de contato da loja, edite o arquivo:
**`config/contactConfig.ts`**

### WhatsApp
```typescript
whatsapp: {
  number: '5511999999999', // Formato: 55 (Brasil) + DDD + Número
  defaultMessage: 'Olá! Gostaria de mais informações sobre os veículos.'
}
```

**Exemplo de números:**
- São Paulo: `5511999999999`
- Rio de Janeiro: `5521999999999`
- Belo Horizonte: `5531999999999`

### Telefone, Email e Endereço
```typescript
phone: '(11) 3000-0000',
email: 'contato@autopremium.com',
address: {
  street: 'Av. Paulista, 1000',
  neighborhood: 'Bela Vista',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100'
}
```

### Horário de Funcionamento
```typescript
businessHours: {
  weekdays: 'Segunda a Sexta: 9h - 18h',
  saturday: 'Sábado: 9h - 14h',
  sunday: 'Domingo: Fechado'
}
```

---

## 👥 Usuários Autorizados

Para gerenciar quem pode acessar a área administrativa, edite:
**`config/authorizedUsers.ts`**

### Adicionar Usuário
```typescript
export const AUTHORIZED_USERS: AuthorizedUser[] = [
  {
    email: 'admin@autopremium.com',
    password: 'admin123',
    name: 'Administrador'
  },
  // Adicione novos usuários aqui
  {
    email: 'novovendedor@autopremium.com',
    password: 'senha123',
    name: 'Nome do Vendedor'
  }
];
```

### Remover Usuário
Simplesmente delete o objeto correspondente do array.

**Alternativamente:**
Use a interface de gerenciamento de usuários dentro do painel administrativo (botão "Gerenciar Usuários").

---

## 🖼️ Imagem do Hero

Para trocar a imagem de fundo da seção Hero (banner principal), edite:
**`components/Hero.tsx`**

Localize a linha:
```typescript
backgroundImage: 'url(https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&h=900&fit=crop)',
```

Substitua pela URL da sua imagem:
```typescript
backgroundImage: 'url(SUA_IMAGEM_AQUI)',
```

### Dicas:
- Use imagens de alta qualidade (mínimo 1600x900px)
- Formatos recomendados: JPG, PNG, WebP
- Você pode hospedar a imagem em serviços como:
  - Unsplash (gratuito)
  - Imgur
  - Cloudinary
  - Seu próprio servidor

---

## 🗺️ Localização no Mapa

Para atualizar o mapa do Google Maps:

### 1. Obtenha o código de embed do Google Maps:
1. Acesse [Google Maps](https://www.google.com/maps)
2. Busque pelo endereço da sua loja
3. Clique em "Compartilhar"
4. Selecione "Incorporar um mapa"
5. Copie o código iframe

### 2. Extraia a URL do iframe:
Procure por `src="..."` no código e copie apenas a URL.

### 3. Atualize a configuração:
Edite **`config/contactConfig.ts`** e cole a URL:
```typescript
address: {
  // ... outros campos
  mapUrl: 'COLE_A_URL_DO_GOOGLE_MAPS_AQUI'
}
```

---

## 🎨 Cores e Branding

Para alterar as cores do tema, edite o arquivo **`index.css`** ou os componentes individuais.

### Cores Principais Atuais:
- **Azul (Principal):** `bg-blue-600`, `text-blue-600`
- **Verde (WhatsApp):** `bg-green-500`, `text-green-600`
- **Roxo (Admin):** `bg-purple-600`

Para mudanças globais, considere configurar o Tailwind CSS em `tailwind.config.js`.

---

## 🚀 Como Testar suas Alterações

1. Salve os arquivos editados
2. O servidor de desenvolvimento recarregará automaticamente
3. Verifique as mudanças no navegador

**Servidor de desenvolvimento:**
```bash
npm run dev
```

---

## ⚠️ Avisos Importantes

### Segurança
- **Nunca** compartilhe senhas em texto puro em produção
- Considere implementar autenticação JWT ou OAuth para produção
- Use HTTPS em ambiente de produção

### Backup
Faça backup dos arquivos de configuração antes de editá-los:
- `config/contactConfig.ts`
- `config/authorizedUsers.ts`

---

## 📱 Testando o WhatsApp

Para testar se o WhatsApp está funcionando:

1. Acesse a aplicação
2. Clique no botão flutuante verde (canto inferior direito)
3. Ou preencha o formulário "Vender Veículo"
4. Verifique se o WhatsApp abre com a mensagem correta

**Nota:** O número precisa estar no formato internacional correto para funcionar.

---

## 🆘 Suporte

Se encontrar problemas, verifique:
1. Console do navegador (F12) para erros
2. Terminal onde o servidor está rodando
3. Sintaxe dos arquivos de configuração (vírgulas, aspas, etc.)

---

**Última atualização:** Novembro 2025

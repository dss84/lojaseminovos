<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚗 AutoPremium Select - Sistema de Loja de Veículos

Sistema completo de gerenciamento e exibição de veículos para concessionárias e revendedoras.

## ✨ Funcionalidades

### 🏠 Área Pública
- **Hero Banner** com imagem da fachada da loja
- **Catálogo de Veículos** com filtros avançados (marca, preço, ano, tipo)
- **Detalhes do Veículo** com galeria de imagens e especificações completas
- **Formulário "Vender Veículo"** - envio direto via WhatsApp
- **Mapa de Localização** com Google Maps integrado
- **Informações de Contato** completas
- **Botão Flutuante WhatsApp** - acesso rápido em todas as páginas

### 🔐 Área Administrativa (Restrita)
- **Controle de Acesso** com autenticação de usuários autorizados
- **Dashboard** com listagem de veículos
- **Adicionar/Editar/Remover** veículos do estoque
- **Gerenciamento de Usuários** - adicionar, editar e remover vendedores
- **Upload de Imagens** com IA (Gemini) para descrições automáticas

### 🛠️ Tecnologias
- React + TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- LocalStorage para persistência
- Font Awesome para ícones

## 🚀 Como Executar

**Pré-requisitos:** Node.js

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure a API do Gemini:**
   - Edite o arquivo `.env.local`
   - Adicione sua chave: `GEMINI_API_KEY=sua_chave_aqui`

3. **Execute o projeto:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## 🔧 Personalização

Consulte o arquivo **[PERSONALIZACAO.md](PERSONALIZACAO.md)** para instruções detalhadas sobre:
- Alterar informações de contato e WhatsApp
- Adicionar/remover usuários autorizados
- Trocar imagem do Hero
- Configurar localização no mapa
- E muito mais!

## 👥 Usuários Padrão

Para acessar a área administrativa:

- **Email:** admin@autopremium.com  
  **Senha:** admin123

- **Email:** vendedor@autopremium.com  
  **Senha:** vendedor123

*Consulte [CONTROLE_ACESSO.md](CONTROLE_ACESSO.md) para gerenciar usuários.*

## 📞 Configuração de Contato

Edite o arquivo `config/contactConfig.ts` para atualizar:
- Número do WhatsApp
- Telefone e email
- Endereço completo
- Horário de funcionamento
- URL do Google Maps

## 📁 Estrutura do Projeto

```
├── components/         # Componentes React
│   ├── Hero.tsx       # Banner principal
│   ├── CarCard.tsx    # Card de veículo
│   ├── CarForm.tsx    # Formulário de veículo
│   ├── SellCarForm.tsx # Formulário de venda
│   ├── MapSection.tsx  # Seção de mapa
│   ├── WhatsAppButton.tsx # Botão flutuante
│   └── UserManagement.tsx # Gestão de usuários
├── config/            # Arquivos de configuração
│   ├── contactConfig.ts    # Contatos
│   └── authorizedUsers.ts  # Usuários autorizados
├── services/          # Serviços
│   ├── storageService.ts  # LocalStorage
│   └── geminiService.ts   # IA Gemini
└── types.ts           # TypeScript types
```

## 🔒 Segurança

⚠️ **IMPORTANTE:** Este projeto usa autenticação básica para demonstração.

Para produção, implemente:
- Backend com API REST
- Autenticação JWT ou OAuth
- Hash de senhas (bcrypt)
- HTTPS obrigatório
- Rate limiting
- Autenticação de dois fatores (2FA)

## 📱 Integração WhatsApp

O sistema possui duas integrações com WhatsApp:

1. **Botão Flutuante:** Contato rápido fixo no canto inferior direito
2. **Formulário de Venda:** Envia proposta formatada diretamente para o WhatsApp da loja

Configure o número no arquivo `config/contactConfig.ts`.

## 🗺️ Google Maps

O mapa é carregado via iframe do Google Maps. Para alterar:
1. Acesse Google Maps
2. Busque o endereço
3. Clique em Compartilhar > Incorporar mapa
4. Copie a URL do iframe
5. Cole em `config/contactConfig.ts`

## 🎨 Customização Visual

- **Cores:** Edite as classes Tailwind nos componentes
- **Logo:** Substitua o ícone em `Layout.tsx`
- **Imagem Hero:** Altere a URL em `Hero.tsx`

## 📄 Licença

Projeto desenvolvido para fins educacionais e demonstrativos.

---

View your app in AI Studio: https://ai.studio/apps/drive/1KfdxazTAL-Mpv0kmdVkPcEDEgokfjXxk

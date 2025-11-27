# 🚀 Deploy na Vercel - Lucas Seminovos

## 📋 Pré-requisitos

1. ✅ Conta no GitHub (gratuita)
2. ✅ Conta na Vercel (gratuita)
3. ✅ Supabase configurado (já feito!)

---

## 🔧 Passo 1: Preparar o Projeto no GitHub

### 1.1 Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Configure:
   - **Repository name:** `lucas-seminovos`
   - **Description:** `Site Lucas Seminovos - Loja de Veículos`
   - **Visibility:** ✅ Private (recomendado)
3. **NÃO** marque "Add a README file"
4. Clique em **"Create repository"**

### 1.2 Subir o Código para o GitHub

Abra o terminal no VS Code e execute:

```bash
# Inicializar Git (se ainda não foi)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Lucas Seminovos"

# Conectar com GitHub (substitua SEU-USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/lucas-seminovos.git

# Renomear branch para main
git branch -M main

# Enviar para GitHub
git push -u origin main
```

⚠️ **Importante:** O arquivo `.env` NÃO será enviado (está no .gitignore) - isso é correto!

---

## 🌐 Passo 2: Deploy na Vercel

### 2.1 Criar Conta e Conectar GitHub

1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize a Vercel a acessar seus repositórios

### 2.2 Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Procure por `lucas-seminovos` na lista
3. Clique em **"Import"**

### 2.3 Configurar o Projeto

**Configure assim:**

- **Framework Preset:** Vite ✅ (deve detectar automaticamente)
- **Root Directory:** `./` (deixar padrão)
- **Build Command:** `npm run build` ✅
- **Output Directory:** `dist` ✅

### 2.4 Adicionar Variáveis de Ambiente

⚠️ **MUITO IMPORTANTE!**

Na seção **"Environment Variables"**, adicione:

1. **Nome:** `VITE_SUPABASE_URL`
   **Valor:** `https://wtbkliucxcrbazvptbvc.supabase.co`

2. **Nome:** `VITE_SUPABASE_ANON_KEY`
   **Valor:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0YmtsaXVjeGNyYmF6dnB0YnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzU5NDksImV4cCI6MjA3OTc1MTk0OX0.N_lvKsD990DeFytOBoqu4--DryR8UAz0Ctq2p32iROQ`

### 2.5 Deploy!

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos ⏱️
3. 🎉 **Pronto!** Seu site está no ar!

A Vercel vai te dar uma URL tipo: `lucas-seminovos.vercel.app`

---

## 🔄 Atualizações Futuras

Sempre que você fizer alterações:

```bash
# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição da alteração"

# Enviar para GitHub
git push
```

✅ A Vercel vai **detectar automaticamente** e fazer o deploy!

---

## 🌍 Domínio Personalizado (Opcional)

Se o cliente tiver um domínio (ex: `www.lucasseminovos.com.br`):

1. Na Vercel, vá em **"Settings"** → **"Domains"**
2. Adicione o domínio
3. Configure os DNS conforme instruções da Vercel

---

## 📊 Monitoramento

**Dashboard da Vercel mostra:**
- ✅ Quantas visitas
- ✅ Tempo de carregamento
- ✅ Erros (se houver)
- ✅ Histórico de deploys

---

## 🆘 Problemas Comuns

### ❌ "Build failed"
**Solução:** Verifique se as variáveis de ambiente foram adicionadas

### ❌ "Site no ar mas vazio"
**Solução:** Verifique se a Output Directory está como `dist`

### ❌ "Imagens não aparecem"
**Solução:** Verifique se as variáveis do Supabase estão corretas

---

## 💰 Custos

- ✅ **Vercel:** Gratuito (100GB bandwidth/mês)
- ✅ **Supabase:** Gratuito (500MB storage)
- ✅ **GitHub:** Gratuito (repositórios privados ilimitados)

**Total: R$ 0,00/mês** 🎉

---

## 📞 Suporte

- Vercel: https://vercel.com/docs
- Deployment: https://vitejs.dev/guide/static-deploy.html

---

**Desenvolvido para Lucas Seminovos**  
Por: Siditech Digital

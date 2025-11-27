# 🚀 Configuração do Supabase - Lucas Seminovos

Este guia vai te ensinar a configurar o Supabase para armazenar os carros e imagens na nuvem.

## 📋 O que você vai precisar

1. Conta gratuita no Supabase (https://supabase.com)
2. 15 minutos do seu tempo
3. Acesso ao código do projeto

---

## 🎯 Passo 1: Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com sua conta GitHub ou Google
4. É **100% GRATUITO** para começar!

---

## 🏗️ Passo 2: Criar Novo Projeto

1. No painel do Supabase, clique em **"New Project"**
2. Preencha:
   - **Name:** `lucas-seminovos`
   - **Database Password:** Crie uma senha forte (anote ela!)
   - **Region:** `South America (São Paulo)` (mais próximo do Brasil)
3. Clique em **"Create new project"**
4. ⏱️ Aguarde 2-3 minutos (o projeto está sendo criado)

---

## 🗄️ Passo 3: Criar Tabela de Carros

1. No menu lateral, clique em **"Table Editor"**
2. Clique em **"Create a new table"**
3. Configure assim:

**Nome da tabela:** `cars`

**Colunas (clique em Add Column para cada uma):**

| Nome           | Tipo  | Configuração            |
| -------------- | ----- | ----------------------- |
| `id`           | text  | Primary Key, não nulo   |
| `make`         | text  | não nulo                |
| `model`        | text  | não nulo                |
| `year`         | int4  | não nulo                |
| `price`        | int8  | não nulo                |
| `mileage`      | int8  | não nulo                |
| `type`         | text  | não nulo                |
| `fuel`         | text  | não nulo                |
| `transmission` | text  | não nulo                |
| `color`        | text  | não nulo                |
| `description`  | text  | pode ser nulo           |
| `images`       | jsonb | não nulo, default: `[]` |
| `features`     | jsonb | não nulo, default: `[]` |
| `sellerId`     | text  | não nulo                |
| `createdAt`    | int8  | não nulo                |
| `location`     | text  | não nulo                |

4. **IMPORTANTE:** Desmarque "Enable Row Level Security (RLS)" por enquanto
5. Clique em **"Save"**

---

## 📸 Passo 4: Criar Storage para Imagens

1. No menu lateral, clique em **"Storage"**
2. Clique em **"Create a new bucket"**
3. Configure:
   - **Name:** `car-images`
   - **Public bucket:** ✅ MARQUE ESTA OPÇÃO (importante!)
4. Clique em **"Create bucket"**

### Configurar Permissões do Storage

1. Clique no bucket `car-images` que você criou
2. Clique em **"Policies"** (aba no topo)
3. Clique em **"New Policy"**
4. Escolha: **"Allow public read access"**
5. Clique em **"Use this template"** e depois **"Save"**

6. Crie outra política para upload:
   - Clique em **"New Policy"** novamente
   - Escolha: **"Allow public write access"**
   - Clique em **"Use this template"** e depois **"Save"**

---

## 🔑 Passo 5: Pegar Suas Credenciais

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá duas informações importantes:

### ⚠️ COPIE ESTES VALORES:

**Project URL:**

```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public (API Key):**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa...
```

---

## ⚙️ Passo 6: Configurar o Projeto

1. **Crie um arquivo `.env`** na raiz do projeto (mesma pasta do `package.json`)

2. **Cole este conteúdo** (substituindo pelos seus valores):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa...
```

3. **Salve o arquivo**

---

## 🧪 Passo 7: Testar

1. Abra o terminal no projeto
2. Execute:

```bash
npm run dev
```

3. Abra o navegador em `http://localhost:3001`
4. Faça login na área administrativa
5. Cadastre um novo carro
6. Abra o console do navegador (F12)
7. Você deve ver:

   - ✅ `Carro salvo no Supabase e localStorage`

8. Verifique no Supabase:
   - Vá em **Table Editor** → `cars`
   - Você deve ver o carro cadastrado!
   - Vá em **Storage** → `car-images`
   - Você deve ver as imagens!

---

## 🎉 Pronto!

Agora seu site está usando o Supabase para:

- ✅ Armazenar dados dos carros
- ✅ Fazer upload de imagens
- ✅ Sincronizar entre diferentes dispositivos
- ✅ Backup automático na nuvem

---

## 🆘 Problemas Comuns

### ❌ "Supabase não configurado"

**Solução:** Verifique se o arquivo `.env` está na raiz do projeto e se contém as variáveis corretas

### ❌ "Error: relation 'cars' does not exist"

**Solução:** Você não criou a tabela `cars` no Passo 3. Volte e crie ela.

### ❌ "Storage error: Bucket not found"

**Solução:** Você não criou o bucket `car-images` no Passo 4. Volte e crie ele.

### ❌ "Row Level Security policy violation"

**Solução:** Desmarcou o RLS? Se não, vá em Table Editor → cars → Configurações → Desmarque RLS

---

## 📊 Planos e Limites

**Plano Gratuito (Free Tier):**

- ✅ 500 MB de Storage
- ✅ 2 GB de transferência/mês
- ✅ 50.000 usuários autenticados/mês
- ✅ Backup automático

**Plano Pro ($25/mês):**

- ✅ 8 GB de Storage
- ✅ 50 GB de transferência/mês
- ✅ 100.000 usuários/mês

Para uma loja de veículos pequena/média, o **plano gratuito é suficiente** por vários meses!

---

## 🔒 Segurança

⚠️ **IMPORTANTE:** Nunca compartilhe seu arquivo `.env` com ninguém!

Adicione ao `.gitignore`:

```
.env
```

---

## 💡 Dicas

1. **Faça backup regularmente** exportando os dados da tabela
2. **Monitore o uso** no painel do Supabase
3. **Otimize imagens** antes do upload (max 1MB por imagem)
4. **Use o localStorage como fallback** - já está configurado!

---

## 📞 Suporte

- Documentação Supabase: https://supabase.com/docs
- Discord Supabase: https://discord.supabase.com

---

**Desenvolvido para Lucas Seminovos**
Por: Siditech Digital

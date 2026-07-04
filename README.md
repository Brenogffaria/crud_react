# Lista de Tarefas — CRUD em React

Aplicação de lista de tarefas com **criar, ler, editar e excluir** (CRUD), construída com React + Vite + Tailwind CSS.

## Funcionalidades

- **Create**: adicionar tarefa com título, descrição, prioridade e prazo
- **Read**: listar tarefas, com filtro por Todas / Pendentes / Concluídas
- **Update**: editar uma tarefa ou marcar/desmarcar como concluída
- **Delete**: excluir uma tarefa (com confirmação)

## Estrutura do projeto

```
lista-tarefas-react/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx        ← componente principal com o CRUD
    └── index.css
```

## Como rodar localmente (opcional, requer Node.js)

```bash
npm install
npm run dev
```

## Como gerar um link funcionando sem usar terminal

A forma mais simples é usar o **StackBlitz**, que roda o projeto direto do GitHub:

1. Suba todos os arquivos deste projeto para um repositório no GitHub (mantendo a mesma estrutura de pastas, incluindo a pasta `src`)
2. Acesse: `https://stackblitz.com/github/SEU-USUARIO/NOME-DO-REPOSITORIO`
   (troque pelo endereço do seu repositório)
3. O StackBlitz abre o projeto rodando automaticamente e gera uma prévia ao vivo
4. Copie o link da aba do navegador e envie junto com o link do repositório

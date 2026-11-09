# ZKPVP Frontend

Aplicação React + Vite + TypeScript.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Para produção, configure `VITE_API_BASE` para a URL pública da API e execute `npm run build`. O site compilado fica em `dist/`.


## Direção do produto — ZK Roleplay

O frontend foi reposicionado de PvP para Roleplay. A navegação pública prioriza a cidade, regras e whitelist.
A autenticação continua usando Discord OAuth. A whitelist registra solicitações no banco PostgreSQL e a equipe pode revisar
as entrevistas na aba **Whitelist RP** do painel staff (`/staff`). A aprovação final é conduzida pela equipe em call no Discord.

As regras publicadas em `src/pages/Regras.tsx` são um documento-base próprio e devem ser revisadas pela administração
para definir limites específicos dos sistemas efetivamente instalados (safe zones, organizações, ações e tempos).

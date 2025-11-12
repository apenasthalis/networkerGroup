Por favor, siga estas instruções cuidadosamente para iniciar o projeto!

1.  **Inicie o backend:**
    Abra um terminal e navegue até a pasta do backend:
    `cd /backend`
    Execute os seguintes comandos, um por um:
    `npm install`
    `npm run build`
    `npm start`

2.  **Inicie o Frontend**
    Abra *outro* terminal e navegue até a pasta do frontend:
    `cd /opt/gestao-networking/frontend`
    Execute os seguintes comandos, um por um:
    `npm install`
    `npm run build`
    `npm run dev`

3.  **Adicione as variáveis de ambiente**
    Crie o `.env` no backend e no frontend:

    frontend: 
    /frontend/.env
    `NEXT_PUBLIC_ADMIN_PASSWORD=senha do administrador`
    `NEXT_PUBLIC_API_URL=http://localhost:PORT`

    backend:
    /backend/prisma/.env
    `PORT_EXPRESS=PORT`
    passe os dados do banco dados como no exemplo abaixo:
    `DATABASE_URL=postgresql://postgres:root@192.168.1.108:5433/networking_group?schema=public`

4. **Rodar as migrates do prisma**
    `cd backend/ && npx prisma generate && npx prisma studio`
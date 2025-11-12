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

3.  **Inspecione a Requisição de Rede no Navegador:**
    Abra seu navegador e navegue para a página onde as intenções são listadas (provavelmente `http://localhost:3000/admin` ou a URL configurada para o seu frontend).
    Abra as Ferramentas de Desenvolvedor do navegador (geralmente F12 no Windows/Linux ou Cmd+Option+I no macOS).
    Vá para a aba 'Rede' (Network).
    Recarregue a página (Ctrl+R ou F5).
    Na lista de requisições, procure por uma requisição para `/intention` (o nome exato pode variar, mas procure por algo que contenha 'intention' e seja um GET request).
    Clique nesta requisição e vá para a aba 'Resposta' (Response) ou 'Pré-visualização' (Preview).
    Verifique o JSON retornado. O campo `status` deve estar presente em cada objeto de intenção.

Por favor, me diga o que você vê na resposta JSON da requisição `/intention`.
Se o `status` estiver presente no JSON, então o problema é na renderização do frontend.
Se o `status` *não* estiver presente no JSON, então o problema ainda está no backend.
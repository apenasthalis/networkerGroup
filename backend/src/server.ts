import app from "./index";

const PORT_EXPRESS = process.env.PORT_EXPRESS || 3004;

app.listen(PORT_EXPRESS, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT_EXPRESS}`);
});

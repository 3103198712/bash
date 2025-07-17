const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  const data = req.body;
  console.log('Dados recebidos do webhook:', data);

  // Lógica para processar os dados recebidos
  if (data.entry && data.entry[0] && data.entry[0].changes && data.entry[0].changes[0] && data.entry[0].changes[0].value && data.entry[0].changes[0].value.messages) {
    const messages = data.entry[0].changes[0].value.messages;
    messages.forEach(message => {
      if (message.type === 'text') {
        console.log('Mensagem de texto recebida:', message.text.body);
        // Aqui você pode responder à mensagem ou realizar outras ações
      }
    });
  }

  res.status(200).send('EVENT_RECEIVED');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

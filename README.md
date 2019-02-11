
Este projeto foi desenvolvido com babel para transpilar código es6 para es2015, gulp e npm para autmatização de tarefas. Foi criado também um LocalCache para salvar as tarefas no local storage e não perder as informações ao atualizar a página ou fechar a aba.

O css é feito através do pré-processador sass e ao rodar os comandos abaixo é criado o css minificado.

Para rodar o projeto é necessário executar o comando `npm install` para baixar as depenências e `npm start` para iniciar o desenvolvimento. Foi adicionado o browser-sync no projeto para fazer o recarregamento automático ao alterar os arquivos scss, html e js.

Para criar o build basta rodar `npm run build` e os arquivos serão gerados na pasta build.


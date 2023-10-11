## API Multi container

## Projeto criado para testar como funciona o deploy de  maquinas sendo elas: 

Nginx: Responsavel pelo proxy do backend e do frontend
Server: Aplicação feita em nodejs e express
PG: Banco de dados postgress (persistencia de dados)
Redis: Cache de valores Inputados pelo frontend
Worker: Responsavel por realizar os calculos do redis
Client: Frontend React simples somente para visualização de dados.

O cunho central é entender como o Docker + TravisCI + AWS é possivel montar uma pipeline de desenvolvimento + deploy e em quanto tempo e custo demora para essa tarefa ficar em ambiente de produção. A estratégia usada foi.


- [x] Push code to Github (branch master prod)
- [x] Travis CI pull branch repository
- [x] Travis CI Test Image --coverage application (React or Nodejs)
- [x] Travis CI Build Image Docker Production
- [x] Travis CI Push project to Docker/Hub
- [ ]  AWS EB - Pull Docker Image 

Utilizando a estratégia acima podemos retirar a resposabilidade da maquina da AWS e deixa-la somente para puxar o ambiente já pronto diretamente, do nosso dockerhub pessoal. Pois o tempo de build é equivalente a 6 minutos ou até mais, logo se o ambiente de produção efetuar somente o pull das alterações o tempo cai drasticamente  e a alteração é instantânea.

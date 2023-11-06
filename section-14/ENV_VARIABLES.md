# Como Trabalhar com Senhas Criptografadas Dentro do Kubernetes

Quando se trata de gerenciamento de senhas e manipulação de dados sensíveis, todo cuidado é pouco, e no Kubernetes não é diferente. Uma má prática, ou até mesmo um esquecimento, é armazená-las em 'plain_text' (texto simples). Esses tipos de gerenciamentos podem e irão causar muita dor de cabeça se caírem em mãos erradas.

## Gerenciamento de Senhas com Kubernetes

O Kubernetes trabalha de maneira muito inteligente com o gerenciamento de senhas, utilizando criptografia eficaz que funciona para a maioria das aplicações. Além disso, é fácil gerenciá-las em ambientes de nuvem, como __AWS, GCP, Azure__, etc.

### O que São Secrets

O objetivo dos __'Secrets'__ (segredos) é armazenar com segurança uma ou mais informações dentro do seu cluster. Um bom exemplo de uso é o armazenamento de chaves de API, chaves de banco de dados e até mesmo uma chave SSH, ou qualquer tipo semelhante de informação secreta que não queremos que o mundo externo tenha fácil acesso.

#### Configuração

A comunidade Kubernetes recomenda sempre usar um arquivo de configuração e permitir que o próprio Kubernetes administre as coisas para nós. No entanto, para a senha, criaremos um arquivo e utilizaremos um comando imperativo que criará o segredo para nós. Ao utilizar essa abordagem, quando abstrairmos as configurações para o ambiente de produção, também precisamos garantir que criemos outro segredo manualmente no ambiente.

Comando padrão:


- `create`: cria um novo arquivo de configuração.
- `secret`: tipo do arquivo de configuração.
- `generic`: indica que estamos salvando um número arbitrário de chaves e valores.

[Leia mais 🔗](https://kubernetes.io/pt-br/docs/tasks/configmap-secret/managing-secret-using-kubectl/)

`secret_name`: A propriedade `name` é como nos referimos ao segredo em algum momento futuro, se desejarmos consumi-lo e utilizá-lo dentro de uma configuração de POD.

`--from-literal`: Significa que escreveremos as informações a serem armazenadas dentro do segredo, em vez de tentar gravar as informações dentro de um arquivo e depois carregá-las.

`key=value`: Codificação da senha. No exemplo que utilizaremos, será a referência da senha do banco de dados `PGPASSWORD=senha_do_banco`.

**Observação:** `PGPASSWORD` é uma referência da senha, caso haja a necessidade de utilizá-la no futuro. "Ei, Kubernetes, pegue aquela senha com a referência `PGPASSWORD` para mim?"

### Comando Completo

Input:

`
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345asdf
`

Output:
`
secret/pgpassword created
`

Para verificar os segredos que criamos:

### Utilização da Senha como Variáveis de Ambiente

📁 Arquivo `api.yaml`:

```yaml
env:
  - name: PGPASSWORD
    valueFrom:
      secretKeyRef:
        name: pgpassword
        key: PGPASSWORD
```

📁 Arquivo banco.yaml:
POSTGRES_PASSWORD: de acordo com a nova atualização do Postgres, a variável de senha é utilizada com underscore `POSTGRES_PASSWORD`:

```yaml
env:
  - name: POSTGRES_PASSWORD
    valueFrom:
      secretKeyRef:
        name: pgpassword
        key: PGPASSWORD

```

__Aplicar as configurações__
```
<!-- Input -->
kubectl apply -f k8s

<!-- Input -->
filename_config configured
```

Esse foi um tutorial básico de como iniciar e trabalhar com senhas dentro do kubernets, deixo o link para a documentação de referenca, clicando [aqui](https://kubernetes.io/pt-br/docs/concepts/configuration/secret/).

Até logo.
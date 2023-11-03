
## Como o Kubernets Manipula Banco de dados ?


### Volumes 
Mecanismo de armazenamento de dados que permite que um container armazene dados fora de seu pequeno sistema de arquivos. Contando com Kubernets a terminologia é outra sendo ela a referência a um tipo muito particular de objeto. Para esse tipo de terminologia temos que escrever um arquivo de configuração chamado de "volume" que sera responsável por armazenar nossos dados persistentes dentro dos nossos pods. A vantagem de utilizar os volumes dentro do kubernets é que temos os dados acoplados dentro do pod para responder diretamente os serviços (docker dentro dele)

 ______________________________
|           POD                | 
|      [APP] -> [Data]         |
|______________________________|

Porem a desvantagem dessa estratégia é que, se por algum motivo ou necessidade para reiniciar os pods, os dados acoplados para ele acabam sendo apagados.

### Persistent Volume

Antagonico a Volumes' o persistent volume, é criado quando estamos trabalhando com tipo de armazenamento durável a longo prazo, e também não esta vinculado a nenhum POD especifico a nenhum container. Ou seja o mesmo esta fora do POD.
Logo se o pod travar, ou crachar ou cair, os dados não são perdidos, seu ciclo de vida é persistente.

### Persistent volume Claim x persistent volume

PersistentVolume(PV) e PersistentVolumeClaim(PVC) são as APIs de recursos fornecidas pelo Kubernetes. PV é um pedaço de armazenamento que deveria ser pré-alocado por um administrador. E o PVC é uma solicitação de armazenamento por parte de um usuário.

PV e PVC são muito parecidos, enquanto um trabalha em tempo real sobre demanda de volumes, o outro já tem os valores pre configurados e pronto a ser usado. Funciona como uma compra de produtos em uma loja. 
    Persistent Volume
        cenário 1
            - o comprador ve o cartaz hd500gb e hd 1tb
            - entra na loja
            - pede para o vendedor o de 500gb
            - vendedor tras entrega para o comprador
            - comprador paga e sai da loja
        cenário 2
            - comprador volta pedindo um de 1TB
            - vendedor verifica no estoque
            - estoque sem o HD de 1TB
            - liga para o fornecedor
            - fornecedor fabrica o HD
            - entrega ao vendedor
            - vendedor entrega ao cliente
    Persistent Volume Claim
        cenario 1
            - o comprador ve o cartaz hd500gb e hd 1tb
            - comprador entra na loja
            - pede HD de 500GB
            - vendedor verifica o estoque
            - pega o HD de 500gb e leva ao comprador
            - comprador entrega ao cliente
            - caso o cliente mude de ideia antes de sair da loja e solicitar um HD de 1TB, o comprador consegue fabricar em tempo real, ou fabrica-lo com antecedencia.     


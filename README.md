### Clean architeture with NodeJS

- Domain - descreve toda a parte de "entities" que não tem contato com framework.
  - Entity - descreve a interface do seu produto, ali deve ter o modelo de negócio.
  - Gateway - o gateway é uma interface de saída do domínio para fora.
- Use case - descreve a parte de "use-case" que também não tem contato com framework.
  - Use-case - é um pattern, uma abstração do que todos os use-cases são, é a porta de entrada que a  camada verde vai usar para acessar os casos de uso.
    - Use-case (module) - é responsável por gerenciar o fluxo, ele quem manda criar, ele quem decide o que retornar, etc.
- Infra - descreve a parte de "controllers, gateways e presenters" que tem contato com framework.
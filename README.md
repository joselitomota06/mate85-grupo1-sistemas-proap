# mate85-grupo1-sistemas-proap
Trabalho da disciplina MATE85 - Tópicos em Sistemas de Informação e Web I 

[Documento de visão e Requisitos](https://docs.google.com/document/d/1m9wSqd6X_1-cIYyQlSkXVTLkZj8PFWPeTRYjBZ5t95s/edit?usp=sharing)


# Informações da API

### Configuração relacionada ao banco de dados para desenvolvimento local da API

No arquivo `src/main/resources/application.propoerties` adicione as declarações abaixo:

* spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
* spring.datasource.url=jdbc:mysql://url_db
* spring.datasource.username=nome\_usuario\_db
* spring.datasource.password=senha_db

Configuração adicional para geração das tabelas de forma automática:

* spring.jpa.hibernate.ddl-auto=update
* spring.jpa.hibernate.generateDdl=true

### [Link para documentação da API](https://proap-api.herokuapp.com/proap-api/swagger-ui.html#/)
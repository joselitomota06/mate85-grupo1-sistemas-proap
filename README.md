# Sistema para apoio ao PROAP - Programa de Apoio à Pós-Graduação

O sistema para apoio ao **PROAP - Programa de Apoio à Pós-Graduação** está inserido em um dos sistemas utilizados pelo **Instituto de Computação da Universidade Federal da Bahia** para auxiliar estudantes, professores e funcionários que atuam na gerência de recursos oriundos da Pós-Graduação. A solicitação deste sistema foi realizada com o intuito de organizar, automatizar e gerar celeridade nos processos de cadastros, solicitações e acompanhamento de recursos voltados para publicações em eventos ou periódicos do programa de Pós-graduação do instituto.

## Descrição do cenário

A partir das necessidades do Instituto de Computação da Universidade Federal da Bahia foi constatado que existia uma ausência de um sistema totalmente automatizado para apoiar o cadastro das solicitações de apoio para os estudantes de pós-graduação e verificação dessas solicitações pelos professores do programa. Hoje a solicitação e verificação dos dados dos alunos e das conferências são realizadas de forma manual por meio de um formulário em que os alunos precisam anexar os documentos e os professores precisam validar documentos, conferências e periódicos e outros dados de maneira manual.

## Perspectiva do Produto

-   Ser de acesso exclusivo ao Programa de Pós-Graduação do Instituto de Computação da Universidade Federal da Bahia, como alunos, professores e funcionários.
    
-   Possuir sistema de login e criação de contas para os alunos solicitantes, professores e funcionários.
    
-   Na tela de Home deve possuir duas abas para acompanhamento de solicitações ou criar nova solicitação.
    
-   O formulário deve conter os campos necessários para que o aluno solicitante possa preencher os seus dados, dados de custos e diárias solicitadas e anexar arquivos para comprovações e consultas.
    
-   Deve existir um sistema de verificação de qualis das conferências e periódicos adicionado pelo solicitante

# Processos de Negócios Envolvidos

O desenvolvimento do sistema para apoio ao **PROAP - Programa de Apoio à Pós-Graduação do Instituto de Computação da Universidade Federal da Bahia** está inserido e seguirá o modelo de processos de negócios evolucionário, onde existe a necessidade de construção de protótipos e uma primeira versão para tomada de decisão do stakeholder.

A cada nova funcionalidade (incremento), o stakeholder deve validar o refinamento realizado no produto para que uma nova fase de desenvolvimento possa ser iniciada. Assim, será apresentado os protótipos iniciais para validação e iniciada a primeira versão do produto.

Este sistema segue a metodologia ágil para gestão e planejamento de projetos de software, com utilização de conceitos como Scrum: reuniões semanais(weekly meeting), quadro Kanban, conceitos como Extreme Programming (XP), dentre outros.

# **Stakeholders**

| **Nome** | **Descrição** |
|--|--|
| Instituto de Computação da Universidade Federal da Bahia | Instituto responsável por cursos de graduação e pós-graduação de Computação na Universidade Federal da Bahia. O sistema deve apoiar alunos que possuam artigos ou periódicos aceitos em conferências qualificadas, professores e funcionários que estão responsáveis pela gerência do programa da Pós-Graduação. |


## **Stakeholder Requests**

-   Sistema multi-usuário que engloba os alunos solicitantes, professores e funcionários participantes no sistema de apuração da solicitação.
    
-   Deve possuir formulários para adição das informações do aluno, valor das diárias, evento a ser solicitado.
    
-   Deve possuir um sistema para verificação do qualis da conferência adicionada.
    
-   Deve possuir sistema para verificação de documentos e informações adicionadas pelos solicitantes para que os professores e funcionários possam verificar todos os dados.
    
-   Deve possuir tela para acompanhamento de processo.
    
-   Deve ser um sistema web hospedado em nuvem.

## Documentos

[1. Documento de visão e Requisitos](https://docs.google.com/document/d/1m9wSqd6X_1-cIYyQlSkXVTLkZj8PFWPeTRYjBZ5t95s/edit?usp=sharing)

[2. Prototipação do Sistema](https://www.figma.com/proto/nQ0GpxrbdcIztxa0ZLD0EM/Proap?page-id=29%3A397&node-id=29%3A564&viewport=1703%2C588%2C0.51&scaling=min-zoom&starting-point-node-id=29%3A564)

[3. Diagrama do sistema e suas entidades](https://lucid.app/lucidchart/5cbcb706-400f-424b-b785-d208385853b4/edit?viewport_loc=-172%2C-270%2C1910%2C1554%2C0_0&invitationId=inv_daec2f49-66e4-4959-bf80-d3cdc1f55ec2#)

[4. Link para documentação da API](https://proap-api.herokuapp.com/proap-api/swagger-ui.html#/)


# Infraestrutura Tecnológica

O sistema de apoio ao **PROAP - Programa de Apoio à Pós-Graduação do Instituto de Computação da Universidade Federal da Bahia** opera em um sistema Web responsivo hospedados em nuvem. As informações poderão ser acessadas a partir de computadores e smartphones com acesso a internet.

O desenvolvimento do sistema de apoio ao **PROAP - Programa de Apoio à Pós-Graduação do Instituto de Computação da Universidade Federal da Bahia** apresenta e coleta dados de tabelas de qualis da Capes, dados do [site](https://pgcomp.ufba.br/) do Programa de Pós-Graduação em Computação da Universidade Federal da Bahia.

# Tecnologias utilizadas

- **Front-end:** React 
- **Banco de dados:** PostgreSQL 
- **Back-end:** JAVA 
- **Cloud APP Plataform:** Heroku

# Time

**Gerencia do projeto:**

Joselito Júnior  
Lucas Yan 

**Desenvolvedores:**

Airton Serra

Felipe Araújo 

Itamar Joire Oliveira

João Pedro Brito

Júlio César 

Matheus Sandes 


# Informações da API

### Configuração relacionada ao banco de dados para desenvolvimento local da API

No arquivo `src/main/resources/application.propoerties` adicione as declarações abaixo:

* spring.datasource.driver-class-name=org.postgresql.Driver
* spring.datasource.url=jdbc:postgresql://url_db:port_db/schema
* spring.datasource.username=nome\_usuario\_db
* spring.datasource.password=senha_db

Configuração adicional para geração das tabelas de forma automática:

* spring.jpa.hibernate.ddl-auto=update
* spring.jpa.hibernate.generateDdl=true

### Comandos para deploy no heroku

- Primeiro gere uma nova build na raiz do projeto da api:

`mvn clean package`

- Execute o comando abaixo para subir no Heroku o novo .war gerado.

`heroku deploy:jar target/*.war --app proap-api`

### Comandos para rodar o projeto REACT

`npm install`
`npm run dev`

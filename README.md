# API de Cotação e Conversão de Moedas

## Descrição

Este projeto é uma API RESTful desenvolvida em Java com Spring Boot que fornece cotações de moedas e permite a conversão de valores entre diferentes moedas. Os dados de cotação são obtidos em tempo real da API pública [Frankfurter.app](https://www.frankfurter.app/).

Este projeto foi desenvolvido como parte de um estudo prático sobre desenvolvimento back-end com Java e Spring Boot, focando em integrações com APIs externas, criação de DTOs, serviços e controllers REST.

## Funcionalidades Principais

* **Buscar Últimas Cotações:** Permite obter as taxas de câmbio mais recentes para uma moeda base especificada.
* **Converter Moedas:** Permite converter um valor de uma moeda de origem para uma moeda de destino com base nas cotações atuais.

## Tecnologias Utilizadas

* **Java 21** 
* **Spring Boot 3.5.0** 
* **Maven** (Gerenciador de dependências e build)
* **Spring Web** (Para construção de APIs RESTful)
* **RestTemplate** (Para consumir a API externa)
* **Jackson** (Para manipulação de JSON, inclusa no Spring Web)
* **Lombok** (Para reduzir código boilerplate)
* **Frankfurter.app API** (Fonte externa para dados de cotação)
* **SLF4J** (Para logging)

## Endpoints da API

A base URL da API é `http://localhost:8080` 

---

### 1. Buscar Últimas Cotações

Retorna as taxas de câmbio mais recentes para a moeda base fornecida.

* **Método:** `GET`
* **URL:** `/api/v1/rates/latest`
* **Parâmetros da Query:**
    * `base` (String, opcional, padrão: "USD"): O código da moeda base (ex: `USD`, `BRL`, `EUR`).
* **Exemplo de Requisição:**
  `GET http://localhost:8080/api/v1/rates/latest?base=BRL`
* **Exemplo de Resposta de Sucesso (200 OK):**
    ```json
    {
        "amount": 1.0,
        "base": "BRL",
        "date": "2025-06-03", // Data atual da cotação
        "rates": {
            "AUD": 0.2708,
            "BGN": 0.30082,
            // ... outras moedas
            "USD": 0.17564 
        }
    }
    ```
* **Exemplo de Resposta de Erro (503 Service Unavailable - se a API externa falhar):**
    ```json
    // (O corpo pode variar, mas o status será 503)
    // "Serviço temporariamente indisponível ou erro ao obter cotações: [mensagem de erro]" 
    ```

---

### 2. Converter Moedas

Converte um valor de uma moeda de origem para uma moeda de destino.

* **Método:** `GET`
* **URL:** `/api/v1/rates/convert`
* **Parâmetros da Query:**
    * `amount` (BigDecimal, obrigatório): A quantia a ser convertida (ex: `150.75`).
    * `from` (String, obrigatório): O código da moeda de origem (ex: `USD`).
    * `to` (String, obrigatório): O código da moeda de destino (ex: `EUR`).
* **Exemplo de Requisição:**
  `GET http://localhost:8080/api/v1/rates/convert?amount=120.50&from=EUR&to=JPY`
* **Exemplo de Resposta de Sucesso (200 OK):**
    ```json
    {
        "originalAmount": 120.50,
        "fromCurrency": "EUR",
        "toCurrency": "JPY",
        "convertedAmount": 19234.5678 // Exemplo de valor, com 4 casas decimais
    }
    ```
* **Exemplo de Resposta de Erro (400 Bad Request - ex: moeda de destino inválida):**
    ```
    "Moeda de destino 'XYZ' não disponível para conversão a partir de 'EUR'."
    ```
* **Exemplo de Resposta de Erro (400 Bad Request - ex: 'amount' negativo):**
    ```
    "O valor (amount) deve ser um número positivo."
    ```
* **Exemplo de Resposta de Erro (503 Service Unavailable - se a API externa falhar durante a busca de taxas):**
    ```json
    // (O corpo pode variar, mas o status será 503)
    // "Serviço temporariamente indisponível ou erro ao obter cotações: [mensagem de erro]"
    ```

---

## Como Executar Localmente

**Pré-requisitos:**
* Java JDK 21 instalado.
* Maven instalado (ou use o Maven Wrapper `mvnw` incluso no projeto).
* Uma IDE de sua preferência (IntelliJ IDEA, Eclipse, VS Code com extensões Java).
* Acesso à internet (para que a aplicação possa consumir a API da Frankfurter.app).

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_GITHUB_AQUI]
    cd currency-converter-api 
    ```

2.  **Compile e execute a aplicação usando Maven:**
    * Se você tem Maven instalado globalmente:
        ```bash
        mvn spring-boot:run
        ```
    * Usando o Maven Wrapper (recomendado, pois usa a versão do Maven definida no projeto):
        * No Linux/Mac:
            ```bash
            ./mvnw spring-boot:run
            ```
        * No Windows:
            ```bash
            mvnw.cmd spring-boot:run
            ```

3.  A aplicação estará disponível em `http://localhost:8080`.

## Como Usar

Após iniciar a aplicação, você pode usar um navegador web, Postman, Insomnia ou qualquer cliente HTTP para interagir com os [Endpoints da API](#endpoints-da-api) descritos acima.

## Autor


* GitHub: `https://github.com/Scorpionx7`
* LinkedIn: `https://www.linkedin.com/in/estherrezende/`

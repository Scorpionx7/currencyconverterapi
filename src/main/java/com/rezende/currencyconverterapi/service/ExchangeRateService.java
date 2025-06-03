package com.rezende.currencyconverterapi.service;

import com.rezende.currencyconverterapi.dto.ExchangeRateResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
public class ExchangeRateService {

    private static final Logger log = LoggerFactory.getLogger(ExchangeRateService.class);
    private final RestTemplate restTemplate;
    private final String frankfurterApiBaseUrl = "https://api.frankfurter.app";

    public ExchangeRateService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ExchangeRateResponse getLatestRates(String baseCurrency) {
        String url = frankfurterApiBaseUrl + "/latest?from=" + baseCurrency;
        log.info("Requisitando cotações da API externa: {}", url);

        try {
            ExchangeRateResponse response = restTemplate.getForObject(url, ExchangeRateResponse.class);

            if (response != null) {
                log.info("Resposta recebida da API externa para base {}: {}", baseCurrency, response);


                if (response.getBase() == null || !response.getBase().equalsIgnoreCase(baseCurrency)) {
                    log.warn("A moeda base na resposta ({}) não corresponde à solicitada ({}).", response.getBase(), baseCurrency);


                }
            } else {
                log.warn("Resposta nula da API externa para base {}", baseCurrency);


            }
            return response;

        } catch (HttpClientErrorException e) {
            log.error("Erro do cliente HTTP ao buscar cotações para {}: {} - {}", baseCurrency, e.getStatusCode(), e.getResponseBodyAsString(), e);


            throw e;
        } catch (RestClientException e) {
            log.error("Erro geral do RestClient ao buscar cotações para {}: {}", baseCurrency, e.getMessage(), e);
            throw e;
        }
    }

    public BigDecimal convertCurrency(BigDecimal amount, String fromCurrency, String toCurrency) {
        log.info("Iniciando conversão de {} {} para {}", amount, fromCurrency, toCurrency);

        if (fromCurrency.equalsIgnoreCase(toCurrency)) {
            log.info("Moedas de origem e destino são iguais. Nenhum cálculo necessário.");
            return amount;
        }
        ExchangeRateResponse exchangeRateData = getLatestRates(fromCurrency);

        if (exchangeRateData == null || exchangeRateData.getRates() == null || exchangeRateData.getRates().isEmpty()) {
            log.error("Não foi possível obter dados de cotação válidos para a moeda base: {}", fromCurrency);
            throw new RuntimeException("Dados de cotação indisponíveis para " + fromCurrency);
        }
        BigDecimal conversionRate = Optional.ofNullable(exchangeRateData.getRates().get(toCurrency.toUpperCase()))
                .orElseThrow(() -> {
                    log.error("Taxa de conversão para {} não encontrada nas cotações de {}", toCurrency.toUpperCase(), fromCurrency);
                    return new IllegalArgumentException("Moeda de destino '" + toCurrency.toUpperCase() + "' não disponível para conversão a partir de '" + fromCurrency + "'.");
                });

        log.info("Taxa de conversão de {} para {}: {}", fromCurrency, toCurrency.toUpperCase(), conversionRate);

        BigDecimal convertedAmount = amount.multiply(conversionRate).setScale(4, RoundingMode.HALF_UP);
        log.info("Valor convertido: {} {} = {} {}", amount, fromCurrency, convertedAmount, toCurrency.toUpperCase());

        return convertedAmount;
    }
}
package com.rezende.currencyconverterapi.controller;

import com.rezende.currencyconverterapi.dto.ConversionResponseDto;
import com.rezende.currencyconverterapi.dto.ExchangeRateResponse;
import com.rezende.currencyconverterapi.service.ExchangeRateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/rates")
public class ExchangeRateController {

    private static final Logger log = LoggerFactory.getLogger(ExchangeRateController.class);
    private final ExchangeRateService exchangeRateService;

    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @GetMapping("/latest")
    public ResponseEntity<ExchangeRateResponse> getLatestRates(
            @RequestParam(name = "base", defaultValue = "USD") String baseCurrency) { // Pega "base" da query string, com USD como padrão
        log.info("Recebida requisição para buscar últimas cotações para a moeda base: {}", baseCurrency);
        try {
            ExchangeRateResponse response = exchangeRateService.getLatestRates(baseCurrency);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                log.warn("Serviço retornou nulo para a moeda base: {}", baseCurrency);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Erro ao processar a requisição de cotações para {}: {}", baseCurrency, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/convert")
    public ResponseEntity<?> convertCurrency(
            @RequestParam BigDecimal amount, // Spring consegue converter String para BigDecimal
            @RequestParam String from,
            @RequestParam String to) {

        log.info("Recebida requisição para converter {} de {} para {}", amount, from.toUpperCase(), to.toUpperCase());

        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            log.warn("Valor 'amount' inválido: {}", amount);
            return ResponseEntity.badRequest().body("O valor (amount) deve ser um número positivo.");
        }
        if (from == null || from.trim().isEmpty() || to == null || to.trim().isEmpty()) {
            log.warn("Moedas 'from' ou 'to' inválidas. From: {}, To: {}", from, to);
            return ResponseEntity.badRequest().body("As moedas de origem (from) e destino (to) são obrigatórias.");
        }

        try {
            BigDecimal convertedAmount = exchangeRateService.convertCurrency(amount, from.toUpperCase(), to.toUpperCase());

            ConversionResponseDto responseDto = new ConversionResponseDto(
                    amount,
                    from.toUpperCase(),
                    to.toUpperCase(),
                    convertedAmount
            );
            return ResponseEntity.ok(responseDto);

        } catch (IllegalArgumentException e) {
            // Esta exceção é lançada pelo serviço se a moeda de destino não for encontrada
            log.warn("Erro de conversão (argumento inválido): {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage()); // 400 Bad Request
        } catch (RuntimeException e) {
            // Outras exceções de runtime do serviço (ex: dados de cotação indisponíveis)
            log.error("Erro de runtime durante a conversão: {}", e.getMessage(), e);
            // Poderia ser um 503 Service Unavailable se for um problema com a API externa
            return ResponseEntity.status(503).body("Serviço temporariamente indisponível ou erro ao obter cotações: " + e.getMessage());
        } catch (Exception e) {
            // Qualquer outra exceção inesperada
            log.error("Erro inesperado durante a conversão: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Ocorreu um erro inesperado."); // 500 Internal Server Error
        }
    }
}

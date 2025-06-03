package com.rezende.currencyconverterapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRateResponse {

    private BigDecimal amount;
    private String base;
    private LocalDate date;
    private Map<String, BigDecimal> rates;
}

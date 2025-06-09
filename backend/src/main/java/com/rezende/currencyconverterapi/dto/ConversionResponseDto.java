package com.rezende.currencyconverterapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversionResponseDto {

    private BigDecimal originalAmount;
    private String fromCurrency;
    private String toCurrency;
    private BigDecimal convertedAmount;
}

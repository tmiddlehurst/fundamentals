package com.example.demo;

import lombok.Data;
import java.time.Instant;



@Data public class MarketDataUpdate {
  private String event;
  private String symbol;
  private String currency;
  private String exchange;
  private String micCode;
  private String type;
  private Long timestamp;
  private double price;
}
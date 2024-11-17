package com.example.demo.model;

import lombok.Data;

import java.sql.Date;



@Data public class MarketDataUpdate extends SocketMessage {
  private String event;
  private String symbol;
  private String currency;
  private String exchange;
  private String micCode;
  private double price;
}
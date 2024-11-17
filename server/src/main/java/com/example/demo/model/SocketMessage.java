package com.example.demo.model;

import java.sql.Date;

import lombok.Data;

@Data
public class SocketMessage {
  String type;
  Long ts;
}

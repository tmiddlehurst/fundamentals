package com.example.demo;

import java.util.Timer;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.TimerTask;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Send mock data to the client
        session.sendMessage(new TextMessage("Hello, this is mock data!"));

        TimerTask sendUpdate = new TimerTask() {
            @Override
            public void run() {
                try {
                    session.sendMessage(new TextMessage("Update: " + System.currentTimeMillis()));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };

        new Timer().scheduleAtFixedRate(sendUpdate, 0, 500);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle messages received from the client if needed
    }
}
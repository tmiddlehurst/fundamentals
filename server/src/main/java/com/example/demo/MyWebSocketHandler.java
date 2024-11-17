package com.example.demo;

import java.util.Map;
import java.util.Timer;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.demo.model.MarketDataUpdate;
import com.example.demo.model.SocketMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

public class MyWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> subscriptions = new ConcurrentHashMap<>();
    private final Map<String, Double> prices = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();


    private MarketDataUpdate generateMarketUpdate(String symbol) {
        double newPrice = randomPriceCloseTo(prices.get(symbol));
        prices.put(symbol, newPrice);
        MarketDataUpdate mdu = MarketDataUpdateGenerator.generateRandomMarketDataUpdate(symbol, newPrice);
        return mdu;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        TimerTask sendUpdate = new TimerTask() {
            @Override
            public void run() {
                if (subscriptions.size() > 0) {
                    try {
                        String randomSubscribedSymbol = subscriptions.keySet()
                                                                      .stream()
                                                                      .skip(ThreadLocalRandom.current().nextInt(subscriptions.size()))
                                                                      .findFirst()
                                                                      .orElse(null);
                        MarketDataUpdate newMessage = generateMarketUpdate(randomSubscribedSymbol);
                        String jsonMessage = objectMapper.writeValueAsString(newMessage);
                        session.sendMessage(new TextMessage(jsonMessage));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        TimerTask sendHearbeat = new TimerTask() {
            @Override
            public void run() {
                try {
                    if (session.isOpen()) {
                        SocketMessage heartbeatMessage = new SocketMessage();
                        heartbeatMessage.setTs(System.currentTimeMillis());
                        heartbeatMessage.setType("Heartbeat");
                        String jsonMessage = objectMapper.writeValueAsString(heartbeatMessage);
                        session.sendMessage(new TextMessage(jsonMessage));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };

        new Timer().schedule(sendHearbeat, 0, 1000);
        new Timer().schedule(sendUpdate, 0, 50);
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle subscription messages
        String payload = message.getPayload();
        if (payload.startsWith("subscribe:")) {
            String symbol = payload.substring("subscribe:".length()).trim();
            if (!subscriptions.containsKey(symbol)) {
                System.out.println("subscribing to "+symbol);
                subscriptions.put(symbol, session);
                double currentPrice = fetchCurrentPrice(symbol);
                prices.put(symbol, currentPrice);
                session.sendMessage(new TextMessage("subscription-added:" + symbol));
            } else {
                session.sendMessage(new TextMessage("Already subscribed to " + symbol));
            }
        }
        if (payload.startsWith("unsubscribe:")) {
            String symbol = payload.substring("subscribe:".length()).trim();
            if (subscriptions.containsKey(symbol)) {
                subscriptions.remove(symbol);
                session.sendMessage(new TextMessage("subscription-removed:" + symbol));
            } else {
                session.sendMessage(new TextMessage("Not subscribed to  " + symbol));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove the session from subscriptions when the connection is closed
        subscriptions.clear();
        prices.clear();
    }


    // When we can't get a price
    private double fetchCurrentPrice(String symbol) {
        return randomPriceCloseTo(180.50);
    }

    private double randomPriceCloseTo(Double level) {
        return level + ThreadLocalRandom.current().nextDouble(-0.1, 0.1);
    }
    
    // private double fetchCurrentPrice(String symbol) throws Exception {
    //     // String apiKey = "your_api_key";
    //     String apiKey = System.getenv("TWELVE_API_KEY");
    //     String urlString = String.format("https://api.twelvedata.com/price?symbol=%s&apikey=%s", symbol, apiKey);
    //     System.out.println(urlString);
    //     URL url = new URI(urlString).toURL();
    //     HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    //     connection.setRequestMethod("GET");

    //     int responseCode = connection.getResponseCode();
    //     if (responseCode == HttpURLConnection.HTTP_OK) {
    //         BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
    //         String inputLine;
    //         StringBuilder response = new StringBuilder();

    //         while ((inputLine = in.readLine()) != null) {
    //             response.append(inputLine);
    //         }
    //         in.close();

    //         ObjectMapper objectMapper = new ObjectMapper();
    //         Map<String, String> responseMap = objectMapper.readValue(response.toString(), Map.class);
    //         return Double.parseDouble(responseMap.get("price"));
    //     } else {
    //         throw new RuntimeException("Failed to fetch price: HTTP error code : " + responseCode);
    //     }
    // }
}
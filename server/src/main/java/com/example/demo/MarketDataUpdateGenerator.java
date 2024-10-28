package com.example.demo;

import java.util.Random;

public class MarketDataUpdateGenerator {

    private static final String CURRENCY = "USD";
    private static final String TYPE = "COMMON_STOCK";
    private static final String[] EVENTS = {"TRADE", "QUOTE"};
    private static final String[] MIC_CODE = {"XLON", "XNAS"};
    private static final String[] EXCHANGES = {"NASDAQ", "LSE", "NYSE"};

    private static final Random RANDOM = new Random();

    public static MarketDataUpdate generateRandomMarketDataUpdate(String symbol, double price) {
        MarketDataUpdate update = new MarketDataUpdate();
        
        update.setEvent(EVENTS[RANDOM.nextInt(EVENTS.length)]);
        update.setSymbol(symbol);
        update.setCurrency(CURRENCY);
        update.setType(TYPE);
        update.setExchange(MIC_CODE[RANDOM.nextInt(MIC_CODE.length)]);
        update.setMicCode(MIC_CODE[RANDOM.nextInt(MIC_CODE.length)]);
        update.setTimestamp(System.currentTimeMillis());
        update.setPrice(price); // Random price between 0 and 1000

        return update;
    }
}
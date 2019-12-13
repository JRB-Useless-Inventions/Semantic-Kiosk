# Semantic Kiosk
The idea is simple.
- Someone pushes a button
- Collect the data
- ... profit???

# Scenario
Your business owns a handful of toilet cubicles across a plaza. You want to know how clean they are from customer satisfaction reviews. But instead of hanging around a public toilet asking customers how they're visit was, why not use a Kiosk? Granted the sanitary factor of this is very low, and actually poses a risk to customers Health & Saftey... so maybe use it for someting else.... The world's your hygenic oyster.

# How It Works
This project is comprised of three endpoints.
- [Kiosk Endpoint](#Kiosk-Endpoint)
- [API Endpoint](#API-Endpoint)
- [Dashboard](#Dashboard)


# Kiosk Endpoint
This endpoint allows for the user to interface with a series of buttons containing random semantics.

The semantic words are distributed by the API Endpoint.

```
cd ./kiosk
npm i
npm start
```

# API Endpoint
This endpoint collects the data given from each Kiosk endpoint and stores it in the desired databse set in `ormconfig.json`

This endpoint uses typeorm to manage database migrations. If the desired Database is not active / online, the server will not load and will most likely produce an error.

```
cd ./server/api_vendor
npm i
npm start
```

# Dashboard
This endpoint communicates with the API Endpoint via `WebSocket` to relay data in realtime.
```
cd ./dashboard
npm i
npm start
```
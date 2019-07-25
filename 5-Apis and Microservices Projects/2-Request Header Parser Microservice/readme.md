# Request Header Parser Microservice
This microservice will get the page visitors;

* IP address
* languages the client is able to understand, and which locale variant is preferred and
* which web browser the visitor is using

The service will output the data in a json format:

> {"ipaddress":"::ffff:159.20.14.100","language":"en-US,en;q=0.5", "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}

##  Example
https://valley-lasagna.glitch.me/api/whoami

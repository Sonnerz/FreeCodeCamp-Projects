# Exercise Tracker REST API

A microservice where a user can create an account and keep a log of their exercise workouts.

1.  A user can create an account and get a unique user id
<br/>https://sour-forgery.glitch.me
2.  Users can see a list of pre-existing accounts <br/>
https://sour-forgery.glitch.me/api/exercise/users
3.  A user can add an exercise to their account using their user id. <br/>https://sour-forgery.glitch.me
4.  A user can retrieve their full exercise log: <br/>
https://sour-forgery.glitch.me/api/exercise/log?userId=
5.  A user can retrieve part of the log of any user by also passing along optional parameters of **from** & **to** or **limit**. (Date format yyyy-mm-dd, limit = int) <br/>
https://sour-forgery.glitch.me/api/exercise/log?userId=&from=&to=&limit=



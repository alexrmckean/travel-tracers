# Travel Tracer
Welcome to Travel Tracer, your ultimate companion for managing all your travel needs! From itinerary planning to budget tracking, packing lists, and accommodations, Travel Tracer has got you covered. Say goodbye to travel stress and hello to seamless journeys with Travel Tracer!

Team:

* William Reeves
* Ben Austin 
* Alex McKean
* Justin Ryu
* Kaitlyn Padermos

## Getting Started

**Make sure you have Docker, Git, and Node.js Bullseye or above**

1. Fork this repository.

2. Clone the forked repository onto your local computer:
git clone <https://gitlab.com/travel-tracers/travel-tracers-gamma.git>

3. Build and run the project using Docker with these commands:
```
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:5173/

![Img](/ghi/src/images/Homepage.png)
![Img](/ghi/src/images/Itinerary.png)

## Design

Travel Tracer is a monolithic application made up of 5 models which work together to help you keep track during your travels.

- **Account**
- **Itinerary**
- **Budget**
- **Packing List**
- **Accommodations**


## Functionality

When visiting the app, users should be taken to the homepage. The homepage should be filled with information about our application and there should show some tabs up in the navigation bar. None of the tabs other than Home are navigable until users are logged in.
There are options to sign up a new user and login existing users. Once logged in, users should be able to see a Logout button and are navigated to our landing page, the Itinerary page. There, users are able to view pre-existing trip itineraries sorted in a 1 week calendar.
Users can click on itineraries can view details, edit, and delete them. On the landing page there is a button to add a new itinerary. The budget, packing list, and accommodations have the same functionality, where the tabs navigate to the respective list all pages. On those pages, users are able to create, edit, and delete new items. Except for the budget page, they also have a details button which retrieves the details for specific items.


## Diagram

![Img](/ghi/src/images/Wireframe.png)

## Integration - Value Objects

Our Account, Itinerary, Budget, Packing List, and Accommodations models work together to make everything here at **Travel Tracer** possible.

## Account model, a brief intro

The account model allows us to have data that is only accessible after a user has signed up and logged in. An account will have the attributes of:
- id
- email
- password
- fullname

## Itinerary model, a brief intro

The itinerary model will show details of a week-long travel itinerary. An Itinerary will have the attributes of:
- id
- name
- destination
- from_date
- to_date
- num_travelers

## Budget model, a brief intro

The budget model will show details of a budget in the form of a table. A budget will have the attributes of:
- id
- description
- amount
- date
- payment_method

## Packing List model, a brief intro


The packing list model will show a list of packing list items.  A packing list will have the attributes of:
- id
- item
- quantity
- category
- priority
- checklist_status
- notes
- deadline

## Accommodations model, a brief intro


The accommodations model will show a list of accommodations.  An accommodation will have the attributes of:
- id
- hotel
- flight_number
- flight_number_2
- from_date
- to_date
- notes



## Accessing Endpoints to Send and View Data: Access Through FastAPI Swagger & Your Browser


## Account model
Method | URL | What it does
| ------ | ------ | ------ |
GET | localhost:5173/token | Get token
POST | localhost:5173/token | Login
DELETE | localhost:5173/token | Logout
POST | localhost:5173/api/accounts | Create Account



JSON Body to input into FastAPI Swagger:
Create an account (SEND THIS JSON BODY):

```
{
  "email": "spoon@gmail.com",
  "password": "spoons 4lyfe",
  "full_name": "Spoon Jones"
}

```

Creating an account return value:

```
{
  "access_token": "asdfghjkl76543wasxdcfghjkjuytredsfghjbvcdfghyjk7654edfgh",
  "token_type": "Bearer",
  "account": {
    "id": "1",
    "email": "spoon@gmail.com",
    "full_name": "Spoon Jones"
  }
}

```

## Itinerary model
Method | URL | What it does
| ------ | ------ | ------ |
GET | localhost:5173/itinerary | Get All
GET | localhost:5173/itinerary/{id} | Get Itinerary
GET | localhost:5173/itinerary/weekly_calendar | Get Weekly Calendar
POST | localhost:5173/itinerary | Create Itinerary
DELETE | localhost:5173/itinerary/{id} | Delete Itinerary
PUT | localhost:5173/api/itinerary/{id} | Update Itinerary

JSON Body to input into FastAPI Swagger:
Create an itinerary (SEND THIS JSON BODY):

```
{
  "name": "Birthday Trip",
  "destination": "New York City",
  "from_date": "2024-03-21",
  "to_date": "2024-03-25",
  "num_travelers": "5"
}

```
Creating an itinerary return value:
```
{
  "id": 1,
  "name": "Birthday Trip",
  "destination": "New York City",
  "from_date": "2024-03-21",
  "to_date": "2024-03-25",
  "num_travelers": "5"
}

```

## Budget model
Method | URL | What it does
| ------ | ------ | ------ |
GET | localhost:5173/budgets | Get All
GET | localhost:5173/budgets/{budget_id} | Get One Budget
POST | localhost:5173/budgets | Create Budget
DELETE | localhost:5173/budgets/{budget_id} | Delete Budget
PUT | localhost:5173/api/budgets/{budget_id} | Update Budget

JSON Body to input into FastAPI Swagger:
Create a budget (SEND THIS JSON BODY):

```
{
  "description": "Birthday Hat",
  "amount": 10.00,
  "date": "2024-03-21",
  "payment_method": "Credit Card"
}

```
Creating a budget return value:

```
{
  "id": 1,
  "description": "Birthday Hat",
  "amount": 10.00,
  "date": "2024-03-21",
  "payment_method": "Credit Card"
}
```

## Packing List model
Method | URL | What it does
| ------ | ------ | ------ |
GET | localhost:5173/packing_list | Get All
GET | localhost:5173/packing_list/{packing_list_id} | Get One Packing List
POST | localhost:5173/packing_list | Create Packing List
DELETE | localhost:5173/packing_list/{packing_list_id} | Delete Packing List
PUT | localhost:5173/api/packing_list/{packing_list_id} | Update Packing List

JSON Body to input into FastAPI Swagger:
Create a packing list (SEND THIS JSON BODY):
```
{
  "item": "Birthday Candles",
  "quantity": 30,
  "category": "Party Supplies",
  "priority": 1,
  "checklist_status": false,
  "notes": "Don’t forget the candles!",
  "deadline": "2024-03-21"
}
```
Creating a packing list return value:
```
{
  "id": 1,
  "item": "Birthday Candles",
  "quantity": 30,
  "category": "Party Supplies",
  "priority": 1,
  "checklist_status": false,
  "notes": "Don’t forget the candles!",
  "deadline": "2024-03-21"
}
```

## Accommodations model
Method | URL | What it does
| ------ | ------ | ------ |
GET | localhost:5173/accommodations | Get All
GET | localhost:5173/accommodations/{accommodations_id} | Get One Accommodations
POST | localhost:5173/accommodations | Create Accommodations
DELETE | localhost:5173/accommodations/{accommodations_id} | Delete Accommodations
PUT | localhost:5173/api/accommodations/{accommodations_id} | Update Accommodations

JSON Body to input into FastAPI Swagger:
Create a accommodation (SEND THIS JSON BODY):

```
{
  "hotel": "Hilton",
  "flight_number": "B3453",
  "flight_number_2": "B2345",
  "from_date": "2024-03-21",
  "to_date": "2024-03-25",
  "notes": "Get to the airport early!"
}

```
Creating a accommodation return value:
```
{
  "id": 1,
  "hotel": "Hilton",
  "flight_number": "B3453",
  "flight_number_2": "B2345",
  "from_date": "2024-03-21",
  "to_date": "2024-03-25",
  "notes": "Get to the airport early!"
}

```


On the backend, Travel Tracer comprises 5 models—Account, Itinerary, Budget, Packing List, and Accommodations—each serving a unique purpose to keep users organized during their travels.


Unit Tests:
Ben - test_packing_list.py
Justin - test_accommodations.py
Kaitlyn - test_get_itineraries.py
Alex - test_budgets.py
William - test_get_one_itinerary.py

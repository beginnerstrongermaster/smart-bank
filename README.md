# Overview

This is an online bank based on Django

The backend uses DRF to generate RESTful API, and the frontend uses Javascript, HTML, and CSS to create a webpage

# Tech Stack

## Frontend

Javascript, HTML, CSS

## Backend

Python, Django

## Version Control

Git

## Database

MySQL

# Installation

You can install the project by downloading the zip
![project_download](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/40d952cb-b736-4aad-be95-1660d94e1928)


or you can clone this project

```
  git clone https://github.com/beginnerstrongermaster/Smart-Bank-Django.git
```

# Preparation

## Virtual environment

You need to start a venv

```
  pipenv install
```

and activate it

```
  pipenv shell
```

## Database

You need to set your database in wiseclone.settings.dev
![db](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/de1bc476-fbc0-4abf-abd7-22167d54d3f8)


## migrate

migrate all migrations to the database

```
python manage.py migrate
```

## Create currency instances

For this project, you need 7 hard currencies, and you need to add them manually:

- AUD
- CAD
- JPY
- USD
- GBP
- CHF
- EUR

You need superuser permission to create them

```
python manage.py createsuperuser
```

Then start the server

```
python manage.py runserver
```

Go to the auth login to get a token for the superuser

```
http://localhost:8000/auth/token/login
```

Then add that token to headers and go to

```
http://localhost:8000/bank/currencies/
```

send post requests to the endpoint and create currencies

### headers

You can use a browser extension called ModHeader to send a token in the headers
![headers](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/532e64d8-f14c-40f4-aee8-19bf1cc71b3d)


# Showcase

## Entrance

The index.html is the entrance
![home_page](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/1a3676d4-d05d-411a-8914-9f9e982be668)

you can go to the homepage from it

## Authentication

If you are not authenticated, all functional pages won't open for you, you must log in first
![auth](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/fa1f582f-baab-46f8-ab19-8b91ab79656c)


## Login

If you have an account, you can log in, otherwise, you need to sign up
![login](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/3776ef04-69f8-4f2b-9761-b475389d012e)


## Signup

You can sign up here if you don't have an account
![signup](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/7555a71a-60cd-4d33-89b0-06dffea796c6)

## Home
![home](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/4a678148-6388-41bb-aad6-d8c15705df60)

## Transactions
![transactions](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/71b5edda-9965-4cb2-a471-0965f4cd6a34)

Your transactions include records that you as a receiver or sender


## Recipients

You can transfer money to other users, you can search recipients by their phones or emails
![transfer](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/d79f48d2-e63e-4940-8a88-048e5ff9be8f)


## Wallets

You can add wallets, one wallet can only have one currency, and you can not have duplicate wallets
![wallets](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/f5fda9ce-0282-46a4-8df0-1d61a6c87389)


## Profile

Click your avatar/username to change your profile
![profile1](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/a3e1469f-f1e6-42bb-9e21-10ba04754a21)
![profile2](https://github.com/beginnerstrongermaster/smart-bank/assets/155662880/5f2a1f46-ddf3-4142-922c-31c5c6f622bc)

# Shopping list API 📝 🛒

A REST API developed using TDD (Test-Driven-Development).

#### Tech:

- Node.js
- Express.js
- PostgreSQL [Sequelize]
- Jest & Supertest
- Docker

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height=70 width=70 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height=70 width=70 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=70 width=70 /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" height=70 width=70 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height=70 width=70 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=70 width=70/>
<img src="https://raw.githubusercontent.com/docker/compose/v2/logo.png" height=70 width=70 />

----

#### TDD

🧪 Write the test

🟢 Write the code that passes the test

:recycle: Refactor the code

Note: TDD was applied to the controllers [not to utils]

---

#### Features:

User :

`/signup`&`/login`

`/account` (protected)

- [x] User Signup
- [x] User Login
- [x] Auth using jsonwebtokens
- [x] Display account details
- [x] Update account

Shoppinglist - Item (routes protected) :

`/shoppinglist/items` & `/shoppinglist/items/:id`

- [x] Add an item to the list
- [x] Get all items (shopping list)
- [x] Update a specific item (name and/or status)
- [x] Delete all items (clear shopping list)
- [x] Delete a specific item (remove from the shopping list)

---

#### :whale:

- [x] Dockerized

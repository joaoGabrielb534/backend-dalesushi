# Está API se refere a um sistema de supermercado, onde tem como ocorre um CRUD completo.

## Comandos necessários para iniciar o servidor

### -> npm i ou npm install (Instalar dependências)
### -> npx prisma generate (Gerar modelos)
### -> npm start (Rodar servidor)

## Rotas

### Auth

#### POST /api/auth
##### -> Rota pertecente a autenticação do usuário
##### -> Será usado: email e password
<img src="/public/Auth/Login/Login.png">

#### POST /api/employees/register
##### -> Rota pertecente a criação do funcionário
##### -> Será usado: name, birthday, cpf, email, password
<img src="/public/Auth/Create employee/Body.png">

#### POST /api/clients/register
##### -> Rota pertecente a criação do cliente
##### -> Será usado: name, birthday, cpf, email, password
<img src="/public/Auth/Create client/Body.png">

### Category
##### -> Todas as rotas precisa está autenticado ao token de funcionário

#### GET /api/categories
##### -> Rota pertecente a listar todas as categorias

#### POST /api/category/register
##### -> Rota pertecente a criação da categoria
##### -> Será usado: name
<img src="/public/Category/Create category/Body.png">

#### GET /api/categories/:id
##### -> Rota pertecente a recuperar de uma única categoria
##### -> Será usado: id
<img src="/public/Category/Find category/Query.png">

#### PUT /api/categories/:id
##### -> Rota pertecente a atualizar a categoria
##### -> Será usado: id, name é opcional
<img src="/public/Category/Update category/Query.png">
<img src="/public/Category/Update category/Body.png">

#### DELETE /api/categories/:id
##### -> Rota pertecente a deletar a categoria
##### -> Será usado: id
<img src="/public/Category/Delete category/Query.png">

### Client

#### GET /api/clients
##### -> Para o uso é necessário a autenticação do cliente
##### -> Rota pertecente a listar todos os clients

#### GET /api/clients/:id
##### -> Rota pertecente a recuperar apenas um cliente
##### -> É necessário a autenticação do cliente
<img src="/public/Client/Find client/Query.png">

#### PUT /api/clients/:id
##### -> Rota pertecente a atualizar o cliente
##### -> É necessário a autenticação do cliente
##### -> Será usado: id, (name, birthday, cpf, email, password): são opcionais
<img src="/public/Client/Update client/Query.png">
<img src="/public/Client/Update client/Body.png">

#### DELETE /api/clients/:id
##### -> É necessário a autenticação do cliente
##### -> Rota pertecente ao cliente para deletar sua própria conta
<img src="/public/Client/Delete client/Query.png">

### Employee
##### -> Todas as rotas precisa está autenticado ao token de funcionário

#### GET /api/employees
##### -> Rota pertecente a listar todos os funcionário

#### GET /api/employees/:id
##### -> Rota pertecente a recuperar apenas um funcionário
<img src="/public/Employee/Find employee/Query.png">

#### PUT /api/employees/:id
##### -> Rota pertecente a atualizar o funcionário
##### -> Será usado: id, (name, birthday, cpf, email, password): são opcionais
<img src="/public/Employee/Find employee/Query.png">
<img src="/public/Employee/Find employee/Body.png">

#### DELETE /api/employees/:id
##### -> Rota pertecente ao funcionário para deletar sua própria conta
<img src="/public/Employee/Find employee/Query.png">

### Order
##### -> Todas as rotas precisa está autenticado ao token de cliente

#### POST /api/orders/register
##### -> Rota pertecente a criação de uma order
##### -> Será usado: productId, clientId, amount
<img src="/public/Order/Create order/Body.png">

#### GET /api/orders/:id
##### -> Rota pertecente a recuperar apenas uma order
<img src="/public/Order/Find order/Query.png">

#### PUT /api/orders/:id
##### -> Será usado: id, (productId, clientId, amount): são opcionais
<img src="/public/Order/Update order/Query.png">
<img src="/public/Order/Update order/Body.png">

#### DELETE /api/orders/:id
##### -> Rota pertecente ao cliente deletar(cancelar) alguma compra feita
<img src="/public/Order/Delete order/Query.png">

### Product

#### GET /api/products
##### -> Rota pertecente a listar todos produto
##### -> É necessário a autenticação do client

#### POST /api/products/register
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a criação de um produto
##### -> Será usado: name, description, price, amount, categoryId, barCode, manufacturingDate, expirationDate
<img src="/public/Product/Create product/Body.png">

#### GET /api/products/:id
##### -> É necessário a autenticação do client
##### -> Rota pertecente a recuperar um produto
##### -> Será usado: id
<img src="/public/Product/Find product/Query.png">

#### PUT /api/products/:id
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a atualizar um produto
##### -> Será usado: id, (name, description, price, amount, categoryId, barCode, manufacturingDate, expirationDate): opcionais
<img src="/public/Product/Find product/Query.png">

#### DELETE /api/products/:id
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a deletar um produto
##### -> Será usado: id
<img src="/public/Product/Delete product/Query.png">

#### POST /api/products/:catregoryId/discount
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a aplicar um desconto em todos os produtos do tipo referente ao id
##### -> Será usado: id
<img src="/public/Product/Delete product/Query.png">

### Promotions

#### GET /api/promotions
##### -> É necessário a autenticação do client
##### -> Rota pertecente a recuperar todas as promoções

#### POST /api/promotions/register
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a criação de uma promoção
##### -> Será usado: name, percentage, startDate, endDate
<img src="/public/Promotion/Create promotion/Body.png">

#### GET /api/promotions/:id
##### -> É necessário a autenticação do client
##### -> Rota pertecente a recuperar uma promoção
##### -> Será usado: id
<img src="/public/Promotion/Find promotion/Query.png">

#### PUT /api/promotions/:id
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a atualizar uma promoção
##### -> Será usado: id, (name, percentage, startDate, endDate): opcionais
<img src="/public/Promotion/Find promotion/Query.png">

#### DELETE /api/promotions/:id
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a deletar uma promoção
##### -> Será usado: id
<img src="/public/Promotion/Delete promotion/Query.png">

### Promotions Client

#### GET /api/promotionClients
##### -> É necessário a autenticação do client
##### -> Rota pertecente a recuperar todas as promoções do client

#### POST /api/promotionClients/register
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a criação de uma promoção para o client
##### -> Será usado: promotionId, clientId
<img src="/public/Promotion Client/Create promotion client/Body.png">

#### GET /api/promotionClients/:promotionId
##### -> É necessário a autenticação do client
##### -> Rota pertecente a recuperar uma promoção do cliente
##### -> Será usado: id
<img src="/public/Promotion Client/Get promotion client/Query.png">

#### DELETE /api/promotionClients/:promotionId
##### -> É necessário a autenticação do funcionário
##### -> Rota pertecente a deletar uma promoção do cliente
##### -> Será usado: id
<img src="/public/Promotion Client/Delete promotion client/Query.png">

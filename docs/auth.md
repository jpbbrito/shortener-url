## 1.1 Criar Usuario
[Voltar para Pagina Principal](../README.md)

**Endpoint:** `https://shortener-url-ge5k.onrender.com/users`

**Description:** Criação de novo usuario.

**Method:** POST

**Headers:** 
```
{ 
    Content-Type: application/json
 }
 ```

**Body Params Type:** raw


``` 
{   
    "email": "novo_usuario@mail.com",
    "password": "senha_novo_usuario",
    "name": "Novo Usuario",
}
```
<details>
<summary>201 - Created</summary>

**Status:** Created - **Code:** 201

``` 
{
    "id": "789497eb-f906-47e3-878e-14721e01c290",
    "email":  "novo_usuario@mail.com",
    "name": "Novo Usuario",
    "status_history": [
        {
            "createdAt": "2024-11-22T14:18:49.420Z",
            "status": "created",
            "updatedAt": "2024-11-22T14:18:49.420Z"
        }
    ],
    "created_at": "2024-11-22T14:18:49.760Z",
    "updated_at": "2024-11-22T14:18:49.760Z"
}
```
</details>

<details>
<summary>403 - Forbidden</summary>

**Status:** Forbidden - **Code:** 403

``` 
{
    "error": "Já existe um usuario com esse email"
}
```
</details>
</div>


<!-- **************************************************************************** -->

<br/>


<div id='1.1'> 

[Voltar para Pagina Principal](../README.md)
## 1.2 Autenticação


**Endpoint:** `https://shortener-url-ge5k.onrender.com/authenticate`

**Description:** Autenticação para acesso aos recursos da API

**Method:** POST

**Headers:** 
```
{ 
    api_key: d01890f2-8ebf-4771-9331-e366a949638e,
    Content-Type: application/json
 }
 ```

**Body Params Type:** raw

``` 
{
    "userName": "usuario",
    "password": "senha"
}
```
<details>
<summary>200 - Success</summary>

**Status:** OK - **Code:** 200

``` 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiYWRtaW4iLCJsZXZlbCI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjQ4MTk5MTI1LCJleHAiOjE2NDgyMDA5MjV9.qo-t28pvU4QTYiVRlJPrkMkFMq-U4SLvRu3uogKplTY"
}
```
</details>

<details>
<summary>400 - Bad Request</summary>

**Status:** Bad Request - **Code:** 400

``` 
{
    "error": "email e/ou password não foram enviados!"
}
```
</details>

<details>
<summary>403 - Forbidden</summary>

**Status:** Forbidden - **Code:** 403

``` 
{
    "error": "email ou password esta errado"
}
```
</details>

</div>

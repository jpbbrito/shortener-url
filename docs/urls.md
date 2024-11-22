# 2 - Criar e manipular URLs curtas
## 2.1 Criar URL
[Voltar para Pagina Principal](../README.md)

**Endpoint:** `https://shortener-url-ge5k.onrender.com/shortener`

**Description:** Criação de novo endereço curto.

**Method:** POST

**Headers:** 
```
{ 
    "Content-Type": "application/json"
    "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..." // Autenticação opcional
 }
 ```

**Body Params Type:** raw

``` 
{
	"urlDestination": "https://www.uol.com.br/"
}
```
<details>
<summary>200 - OK</summary>

**Status:** OK - **Code:** 200

``` 
{
    "short_id": "ZWJsLQ",
    "url_destination": "https://www.uol.com.br/",
    "count_clicks": 0,
    "user_id": "789497eb-f906-47e3-878e-14721e01c290",
    "status_history": [
        {
            "created_at": "2024-11-22T14:47:43.997Z",
            "status": "active",
            "updated_at": "2024-11-22T14:47:43.997Z"
        }
    ],
    "created_at": "2024-11-22T14:47:44.012Z",
    "updated_at": "2024-11-22T14:47:44.012Z",
    "url": "https://shortener-url-ge5k.onrender.com/ZWJsLQ"
}
```
</details>

<details>
<summary>503 - Service Unavailable</summary>

**Status:** Service Unavailable - **Code:**503

``` 
{
    "error": "Deu erro tente novamente!"
}
```
</details>
</div>
<!-- **************************************************************************** -->

## 2.2 Atualizar endereço URL
[Voltar para Pagina Principal](../README.md)

**Endpoint:** `https://shortener-url-ge5k.onrender.com/shortener/{short_id}`

**Description:** Atualizar endereço cadastro, somente usuarios autenticados.

**Method:** PUT

**Headers:** 
```
{ 
    "Content-Type": "application/json"
    "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..."
 }
 ```

**Body Params Type:** raw


``` 
{
	"urlDestination": "https://www.uol.com.br/"
}
```
<details>
<summary>200 - OK</summary>

**Status:** OK - **Code:** 200

``` 
{
    "short_id": "ZWJsLQ",
    "url_destination": "https://www.bol.uol.com.br/",
    "count_clicks": 0,
    "status": "active",
    "status_history": [
        {
            "created_at": "2024-11-22T14:47:43.997Z",
            "status": "active",
            "updated_at": "2024-11-22T14:47:43.997Z"
        }
    ],
    "created_at": "2024-11-22T14:47:44.012Z",
    "updated_at": "2024-11-22T14:59:02.810Z"
}
```
</details>

<details>
<summary>404 - Not Found</summary>

**Status:**  Not Found - **Code:** 404

``` 
{
    "message": "URL não encontrada!"
}
```
</details>
<details>
<summary>401 - Unauthorized</summary>

**Status:** Unauthorized - **Code:** 401

``` 
{
    "error": "token invalido!"
}
```
</details>
</div>
<!-- **************************************************************************** -->

## 2.3 Deletar endereço URL
[Voltar para Pagina Principal](../README.md)

**Endpoint:** `https://shortener-url-ge5k.onrender.com/shortener/{short_id}`

**Description:** Deletar endereço cadastro, somente usuarios autenticados.

**Method:** DELETE

**Headers:** 
```
{ 
    "Content-Type": "application/json"
    "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..."
 }
 ```

**Body Params Type:** raw


``` 
{
	"urlDestination": "https://www.uol.com.br/"
}
```
<details>
<summary>200 - OK</summary>

**Status:** OK - **Code:** 200

``` 
[
    {
        "short_id": "ZWJsLQ",
        "url_destination": "https://www.bol.uol.com.br/",
        "count_clicks": 0,
        "status": "deleted",
        "status_history": [
            {
                "created_at": "2024-11-22T14:47:43.997Z",
                "status": "active",
                "updated_at": "2024-11-22T14:47:43.997Z"
            },
            {
                "createdAt": "2024-11-22T15:03:22.457Z",
                "status": "deleted",
                "updatedAt": "2024-11-22T15:03:22.457Z"
            }
        ],
        "created_at": "2024-11-22T14:47:44.012Z",
        "updated_at": "2024-11-22T15:03:22.512Z"
    }
]
```
</details>

<details>
<summary>404 - Not Found</summary>

**Status:**  Not Found - **Code:** 404

``` 
{
    "message": "URL não encontrada!"
}
```
</details>
<details>
<summary>401 - Unauthorized</summary>

**Status:** Unauthorized - **Code:** 401

``` 
{
    "error": "token invalido!"
}
```
</details>
</div>
<!-- **************************************************************************** -->

## 2.4 Listar endereços URL
[Voltar para Pagina Principal](../README.md)

**Endpoint:** `https://shortener-url-ge5k.onrender.com/shortener`

**Description:** Listar endereços cadastros, somente usuarios autenticados.

**Method:** GET

**Headers:** 
```
{ 
    "Content-Type": "application/json"
    "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..."
 }
 ```

<details>
<summary>200 - OK</summary>

**Status:** OK - **Code:** 200

``` 
[
    {
        "short_id": "ouOQyY",
        "url_destination": "https://www.uol.com.br/",
        "count_clicks": 0,
        "status": "active",
        "created_at": "2024-11-22T15:08:40.240Z",
        "updated_at": "2024-11-22T15:08:40.240Z",
        "url": "https://shortener-url-ge5k.onrender.com/ouOQyY"
    },
    {
        "short_id": "rrmSZS",
        "url_destination": "https://www.uol.com.br/",
        "count_clicks": 0,
        "status": "active",
        "created_at": "2024-11-22T15:08:38.886Z",
        "updated_at": "2024-11-22T15:08:38.886Z",
        "url": "https://shortener-url-ge5k.onrender.com/rrmSZS"
    },
    {
        "short_id": "wxMyes",
        "url_destination": "https://www.uol.com.br/",
        "count_clicks": 0,
        "status": "active",
        "created_at": "2024-11-22T15:08:37.583Z",
        "updated_at": "2024-11-22T15:08:37.583Z",
        "url": "https://shortener-url-ge5k.onrender.com/wxMyes"
    },
    {
        "short_id": "ReyrMX",
        "url_destination": "https://www.uol.com.br/",
        "count_clicks": 0,
        "status": "active",
        "created_at": "2024-11-22T15:08:36.031Z",
        "updated_at": "2024-11-22T15:08:36.031Z",
        "url": "https://shortener-url-ge5k.onrender.com/ReyrMX"
    },
    {
        "short_id": "TgaSut",
        "url_destination": "https://www.uol.com.br/",
        "count_clicks": 0,
        "status": "active",
        "created_at": "2024-11-22T15:08:34.385Z",
        "updated_at": "2024-11-22T15:08:34.385Z",
        "url": "https://shortener-url-ge5k.onrender.com/TgaSut"
    }
]
```
</details>

<details>
<summary>401 - Unauthorized</summary>

**Status:** Unauthorized - **Code:** 401

``` 
{
    "error": "token invalido!"
}
```
</details>
</div>
<!-- **************************************************************************** -->
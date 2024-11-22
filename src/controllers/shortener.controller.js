import { findUrlByShortId, findUrlByShortIdAndUserId, saveNewUrl, countClicks, findAllUrls, deleteUrlByShortId, updateUrlByShortIdAndUserId, deleteUrlByShortIdAndUserId, findAllUrlsByUserId } from '../repositories/url.repositories.js'
import { findUserByEmail } from '../repositories/users.repositories.js'

export async function redirectUrl(request, response) {
    const { shortId } = request.params
    const result = await findUrlByShortId(shortId)
    if (!result) {
        return response.status(404).json('<h1> URL não encontrada! </h1>')
    }
    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }
    await countClicks(shortId)
    return response.redirect(result.url_destination)
}

export async function getUrl(request, response) {
    const { shortId } = request.params


    const result = await findUrlByShortId(shortId)

    if (!result) {
        return response.status(404).json({ message: 'URL não encontrada!' })
    }
    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }
    result.url = process.env.URL_HOST + '/' + shortId
    return response.json(result)
}

export async function deleteUrl(request, response) {
    const { shortId } = request.params
    const { email } = request.authenticatedUser

    const url = await findUrlByShortId(shortId)

    if (url.status === 'deleted') {
        return { message: 'Já deletada anteriormente!' }
    }

    const user = await findUserByEmail(email)

    const result = await deleteUrlByShortIdAndUserId(shortId, user.id)
    if (!result) {
        return response.status(404).json({ message: 'URL não encontrada!' })
    }
    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }
    return response.json(result)
}

export async function updateUrl(request, response) {
    const { shortId } = request.params
    const { url } = request.body
    const { email } = request.authenticatedUser

    const user = await findUserByEmail(email)

    const result = await updateUrlByShortIdAndUserId(shortId, user.id, url)

    if (!result || result.length === 0) {
        return response.status(404).json({ message: 'URL não encontrada!' })
    }
    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }
    result.url = process.env.URL_HOST + '/' + shortId
    return response.json(result)
}

export async function getAll(request, response) {
    const { limit, page } = request.query
    const { email } = request.authenticatedUser

    const user = await findUserByEmail(email)

    if (!limit || limit.length === 0) {
        request.query.limit = 10
    }
    if (!page || page.length === 0) {
        request.query.page = 1
    }
    console.log('[getAll] ->', request.query)
    console.log('[getAll] -> user', user)
    const result = await findAllUrlsByUserId(user.id, request.query.limit, request.query.page)

    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }

    const resultWithfullURrl = result.map((value) => {
        value.url = process.env.URL_HOST + '/' + value.short_id
        return value
    })
    return response.json(resultWithfullURrl)
}

export async function saveUrl(request, response) {
    const { urlDestination } = request.body
    const email = request.authenticatedUser?.email

    if (email) {
        let user = await findUserByEmail(email)
        const result = await saveNewUrl(urlDestination, user.id)
        if (result === 'code_error_db') {
            return response.status(503).json({ error: 'Deu erro tente novamente!' })
        }
        result.url = process.env.URL_HOST + '/' + result.short_id
        return response.json(result)
    }

    const result = await saveNewUrl(urlDestination)
    if (result === 'code_error_db') {
        return response.status(503).json({ error: 'Deu erro tente novamente!' })
    }
    result.url = process.env.URL_HOST + '/' + result.short_id
    return response.json(result)
}
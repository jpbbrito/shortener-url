import { randomUUID } from 'crypto'
import Database from '../services/database.js'
import { generateShortId } from '../functions/generate_shortid.js'

export async function findUrlByShortId(shortId) {
    try {
        const url = await Database
            .connection
            .select('')
            .from('urls')
            .where('short_id', '=', shortId)

        if (url.length === 0) {
            return false
        }
        return url[0]
    } catch (err) {
        console.log('[findUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function findUrlByShortIdAndUserId(shortId, userId) {
    try {
        const url = await Database
            .connection
            .select('')
            .from('urls')
            .where('short_id', '=', shortId)
            .andWhere('user_id', '=', userId)

        if (url.length === 0) {
            return false
        }
        return url[0]
    } catch (err) {
        console.log('[findUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function updateUrlByShortId(shortId, url) {
    const date = new Date()
    try {
        const result = await Database.connection('urls')
            .where('short_id', '=', shortId)
            .andWhere('status', '=', 'active')
            .update({
                updated_at: Database.connection.fn.now(),
                url_destination: url
            }).returning(['short_id', 'url_destination', 'count_clicks', 'status', 'status_history', 'created_at', 'updated_at'])
        return result
    } catch (err) {
        console.log('[deleteUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function updateUrlByShortIdAndUserId(shortId, userId, url) {
    const date = new Date()
    try {
        const result = await Database.connection('urls')
            .where('short_id', '=', shortId)
            .andWhere('user_id', '=', userId)
            .andWhere('status', '=', 'active')
            .update({
                updated_at: Database.connection.fn.now(),
                url_destination: url
            }).returning(['short_id', 'url_destination', 'count_clicks', 'status', 'status_history', 'created_at', 'updated_at'])
        return result
    } catch (err) {
        console.log('[deleteUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function deleteUrlByShortId(shortId) {
    const date = new Date()
    try {
        const url = await findUrlByShortId(shortId)

        url.status_history.push(
            {
                createdAt: date.toISOString(),
                status: 'deleted',
                updatedAt: date.toISOString()
            }
        )

        const result = await Database.connection('urls')
            .where('short_id', '=', shortId)
            .update({
                status: 'deleted',
                updated_at: Database.connection.fn.now(),
                status_history: JSON.stringify(url.status_history)
            }).returning(['short_id', 'url_destination', 'count_clicks', 'status', 'status_history', 'created_at', 'updated_at'])
        return result
    } catch (err) {
        console.log('[deleteUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function deleteUrlByShortIdAndUserId(shortId, userId) {
    const date = new Date()
    try {
        const url = await findUrlByShortId(shortId)

        url.status_history.push(
            {
                createdAt: date.toISOString(),
                status: 'deleted',
                updatedAt: date.toISOString()
            }
        )

        const result = await Database.connection('urls')
            .where('short_id', '=', shortId)
            .andWhere('user_id', '=', userId)
            .update({
                status: 'deleted',
                updated_at: Database.connection.fn.now(),
                status_history: JSON.stringify(url.status_history)
            }).returning(['short_id', 'url_destination', 'count_clicks', 'status', 'status_history', 'created_at', 'updated_at'])
        return result
    } catch (err) {
        console.log('[deleteUrlByShortId] -> err', err)
        return 'code_error_db'
    }
}

export async function findAllUrls(limit, page) {
    try {
        const problems = await Database.connection
            .select('short_id', 'url_destination', 'count_clicks', 'status', 'created_at', 'updated_at')
            .from('urls')
            .where('status', '=', 'active')
            .orderBy('created_at', 'desc')
            .limit(parseInt(limit))
            .offset((parseInt(page) - 1) * parseInt(limit))
        return problems
    } catch (error) {
        console.log('[findAllUrls]- error > ', error)
        return 'code_error_db'
    }
}

export async function findAllUrlsByUserId(userId, limit, page) {
    console.log('[findAllUrls]- error > ', userId)
    try {
        const problems = await Database.connection
            .select('short_id', 'url_destination', 'count_clicks', 'status', 'created_at', 'updated_at')
            .from('urls')
            .where('status', '=', 'active')
            .andWhere('user_id', '=', userId)
            .orderBy('created_at', 'desc')
            .limit(parseInt(limit))
            .offset((parseInt(page) - 1) * parseInt(limit))
        return problems
    } catch (error) {
        console.log('[findAllUrls]- error > ', error)
        return 'code_error_db'
    }
}

export async function countClicks(shortId) {
    const url = await findUrlByShortId(shortId)

    if (!url) {
        return false
    }
    if (url === 'code_error_db') {
        return 'code_error_db'
    }

    const newNumberClicks = url.count_clicks + 1
    try {
        const result = await Database.connection('urls')
            .where('short_id', '=', shortId)
            .update({
                count_clicks: newNumberClicks,
                updated_at: Database.connection.fn.now()
            })

    } catch (err) {
        console.log('[countClicks] -> err', err)
        return 'code_error_db'
    }
}


export async function saveNewUrl(urlDestination, userId = null) {
    const date = new Date()
    const shortId = generateShortId(6)
    const data = {
        id: randomUUID(),
        short_id: shortId,
        url_destination: urlDestination,
        count_clicks: 0,
        user_id: userId,
        status: 'active',
        status_history: JSON.stringify([
            {
                created_at: date.toISOString(),
                status: 'active',
                updated_at: date.toISOString()
            }
        ])
    }

    try {
        const result = await Database
            .connection('urls')
            .insert(data)
            .returning(['short_id', 'url_destination', 'count_clicks', 'user_id', 'status_history', 'created_at', 'updated_at'])
        console.log('[saveNewUser] -> result', result)
        return result[0]
    } catch (err) {
        console.log('[saveNewUser] -> err', err)
        return 'code_error_db'
    }
}

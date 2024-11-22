export async function usersSaveValidation(request, response, next) {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const {
        email,
        password,
        name,
    } = request.body

    const errors = []
    if (!name || name.length < 5) {
        errors.push({ name: 'Esse campo deve ter no minimo 6 caracteres' })
    }
    if (!password || password.length < 6) {
        errors.push({ password: 'Esse campo deve ter no minimo 6 caracteres' })
    }
    if (!email || !email.match(mailFormat)) {
        errors.push({ email: 'Esse campo deve ter o formato de email adequado ex: algum@mail.com' })
    }

    if (errors.length > 0) {
        return response.status(400).json({
            errors
        })
    }
    return next()
}

import * as jose from 'jose';

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.TOKEN_SECRET),
}


export const isAuthenticated = async req => {
    let token = req.cookies.get('token')?.value || ''

    if (token) {
        try {
            const decoded = await jose.jwtVerify(token, jwtConfig.secret)
            return decoded
        } catch (err) {
            console.error('isAuthenticated error: ', err)

            return false
        }
    } else {
        return false
    }
}


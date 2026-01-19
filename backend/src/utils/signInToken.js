import jsonwebtoken from "jsonwebtoken";

export const signInToken = (payload) => {
    return jsonwebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

export const verifySignInToken = (token) => {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}
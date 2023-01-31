import { CognitoJwtVerifier } from "aws-jwt-verify";

export async function handler(event) {
    // console.log(event.headers.authorization)
    const verfier = CognitoJwtVerifier.create({
        userPoolId: "ap-south-1_JOrIY5BPN",
        tokenUse: "access",
        clientId: "472qfaga3klur5t40iikm5ed0i",

        // @ts-expect-error
        // userPoolId: process.env.USER_POOL_ID,
        // tokenUse: process.env.TOKEN_USE,
        // clientId: process.env.CLIENT_ID,

    });

    try {
        const payload = await verfier.verify(event.headers.authorization)
        return {
            statusCode: 200,
            body: "you can access"
        }
    } catch (e) {
        return {
            statusCode: 401,
            body: "token is not valid"
        }
    }
}
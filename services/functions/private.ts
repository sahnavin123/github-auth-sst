import { APIGatewayProxyHandlerV2 } from "aws-lambda"

export const handler: APIGatewayProxyHandlerV2= async (event)=>{
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.jwt.claims.sub) {
        return {
            statusCode: 401,
            body: 'Unauthorized',
        };
    }

    return {
        statusCode: 200,
        body: `Hello this is private page!`,
    }
}
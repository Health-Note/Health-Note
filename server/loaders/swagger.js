const swaggerJSDoc = require('swagger-jsdoc');


const components = {
    res: {
        BadRequest: {
            description: '잘못된 요청',
            schema: {
                $ref: '#/components/errorResult/Error'
            }
        },
        Fobidden: {
            description: '권한이 없음',
            schema: {
                $ref: '#/components/errorResult/Error'
            }
        },
        NotFound: {
            description: '없는 리소스 요청',
            schema: {
                $ref: '#/components/errorResult/Error'
            }
        }
    },
    errorResult: {
        Error: {
            type: 'object',
            properties: {
                errMsg: {
                    type: 'string',
                    description: '에러 메시지 전달'
                }
            }
        }
    },
}

const swaggerDefinition = {
    info: {
        title: 'Health Note',
        version: '1.0',
        description: 'API doc with express',
    },
    host: 'localhost:8080',
    basePath: '/api',
    schema: ['http', 'https'],
    components: components,
}

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./api/routes/*']
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
import { request } from '../../utils/requests.js'
import { getCreateRestaurantRequestBody } from '../../utils/requestBodyGenerator/restaurant.js'
import { config } from '../../../config.js'
import schemaFile from '../../data/user/schema.json' with { type: 'json' }

export async function createRestaurant(csvBody = undefined) {
    it('Create Restaurant', async function () {
        const schema =  schemaFile;

        const requestBody = csvBody || await getCreateRestaurantRequestBody()
        await request(this, 'POST', '/restaurants', requestBody, true, 
            {
                statusCode : 201,
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'description', value: requestBody.description}
                                ],
                validateSchema: schema,
                executionVariables: [
                                        {path: '_id', name: 'restaurantId'},
                                        {path: 'name', name: 'restaurantName'}, 
                                        {path: 'description', name: 'restaurantDescription'}, 
                                        {path: 'user', name: 'userId'}
                                    ]
            }
        )
    })
}

export async function getRestaurant() {
    it('Get Restaurant', async function () {
        await request(this, 'GET', `/restaurants/${global.executionVariables.restaurantId}`, undefined, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: '_id', value: `${global.executionVariables.restaurantId}`},
                                    {path: 'user', value: `${global.executionVariables.userId}`},
                                    {path: 'name', value: `${global.executionVariables.restaurantName}`},
                                    {path: 'description', value: `${global.executionVariables.restaurantDescription}`},
                                ]
            }
        )
    })
}

export async function getRestaurants() {
    it('Get Restaurants', async function () {
        await request(this, 'GET', `/restaurants/`, undefined, true, 
            {
                statusCode : 200,
                expectedValuesInArrayOfObjects: {
                    key: '_id',
                    value: global.executionVariables.restaurantId,
                    fields: [
                        {path: 'name', value: global.executionVariables.restaurantName}
                    ]
                }
            }
        )
    })
}

export async function updateRestaurant() {
    it('Update Restaurant', async function () {
        const requestBody = await getCreateRestaurantRequestBody()
        await request(this, 'PATCH', `/restaurants/${global.executionVariables.restaurantId}`, requestBody, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'description', value: requestBody.description},
                                    {path: '_id', value: global.executionVariables.restaurantId},
                                    {path: 'user', value: global.executionVariables.userId}
                                ],
                executionVariables: [
                                    {path: 'name', name: 'restaurantName'}, 
                                    {path: 'description', name: 'restaurantDescription'}, 
                                ]
            }
        )
    })
}

export async function deleteRestaurant() {
    it('Delete Restaurant', async function () {
        await request(this, 'DELETE', `/restaurants/${global.executionVariables.restaurantId}`, undefined, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'message', value: 'Restaurant removed'},
                                ]
            }
        )
    })
}

export async function getDeletedRestaurant() {
    it('Get Deleted Restaurant', async function () {
        await request(this, 'GET', `/restaurants/${global.executionVariables.restaurantId}`, undefined, true, 
            {
                statusCode : 404,
                expectedValues: [
                                    {path: 'message', value: 'Cannot find restaurant'}
                                ]
            }
        )
    })
}

export async function deleteRemovedRestaurant() {
    it('Delete already deleted restaurant', async function () {
        await request(this, 'DELETE', `/restaurants/${global.executionVariables.restaurantId}`, undefined, true, 
            {
                statusCode : 404,
                expectedValues: [
                                    {path: 'message', value: 'Cannot find restaurant'}
                                ]
            }
        )
    })
}

export async function negativeCreateRestaurant(requestBody, testCaseName, messageValue) {
    it(testCaseName, async function () {
        await request(this, 'POST', '/restaurants', requestBody, true, 
            {
                statusCode : 400,
                expectedValues: [
                                    {path: 'message', value: messageValue}
                ]
            }
        )
    })
}

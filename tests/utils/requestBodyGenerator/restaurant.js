import restaurantRequestBody from '../../data/user/create_restaurant.json' with { type: 'json' }
import { generateRandomRestaurantDescription, generateRandomRestaurantName } from '../helpers.js'

export async function getCreateRestaurantRequestBody() {
    restaurantRequestBody.name = await generateRandomRestaurantName()
    restaurantRequestBody.description = await generateRandomRestaurantDescription()
    
    return restaurantRequestBody
}
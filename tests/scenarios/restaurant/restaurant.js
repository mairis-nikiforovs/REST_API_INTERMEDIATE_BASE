import { createUser, logInUser, deleteUser, deleteUserNoWrapper } from '../../steps/user/user.js'
import { createRestaurant, deleteRemovedRestaurant, deleteRestaurant, getDeletedRestaurant, getRestaurant, updateRestaurant, getRestaurants, negativeCreateRestaurant } from '../../steps/restaurant/restaurant.js'
import { generateTestData, readCsvFile } from '../../utils/helpers.js'
import negativeScenarios from '../../data/user/create_negative.json' with {type: 'json'}

before(async () => {
    await generateTestData()
    createUser()
    logInUser()
})

beforeEach(async () => {
})

after(async () => {
    deleteUserNoWrapper()
})

afterEach(async () => {
})

it('Restaurant', async () => {
    const requestBodies = await readCsvFile('tests/data/user/create.csv')

    describe.skip(`CRUD Restaurant`, () => {
        createRestaurant()
        getRestaurant()
        updateRestaurant()
        getRestaurants()
        deleteRestaurant()
        getDeletedRestaurant()
    })

    describe.skip(`Negative - remove already removed scenario`, () => {
        createRestaurant()
        deleteRestaurant()
        deleteRemovedRestaurant()
        getDeletedRestaurant()
    })

    describe(`Negative - Create restaurants from Json`, () => {
        for(const scenario of negativeScenarios){
            negativeCreateRestaurant(scenario.requestBody, scenario.testCaseName, scenario.message)
        }
    })

    for(const body of requestBodies){
        describe(`Create restaurants with csv data`, () => {
            createRestaurant(body)
            createRestaurant()
        })
    }
})

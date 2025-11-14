import { createUser, logInUser, deleteUser, createUserWithNoEmail, createUserWithNoPassword, createUserWithNoParamV2 } from '../../steps/user/user.js'
import { generateTestData } from '../../utils/helpers.js'

before(async () => {
    await generateTestData()
})

it('CRUD User', () => {
    describe(`CRUD User`, () => {
        createUser()
        logInUser()
        deleteUser()
    })

    describe(`Negative - create user with no password`, () => {
        createUserWithNoEmail()
    })

    describe(`Negative - create user with no password`, () => {
        createUserWithNoParamV2('password')
    })
})

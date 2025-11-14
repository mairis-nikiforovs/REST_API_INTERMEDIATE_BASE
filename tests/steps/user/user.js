import { request } from '../../utils/requests.js'
import { getCreateUserRequestBody } from '../../utils/requestBodyGenerator/customer.js'

export async function createUser() {
    it('Create user account', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'POST', '/user', requestBody, false, 
            {
                statusCode : 201,
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'surname', value: requestBody.surname},
                                    {path: 'email', value: requestBody.email}
                                ],
                executionVariables: [
                                        {path: 'email', name: 'userEmail'}, 
                                    ]
            }
        )
    })
}

export async function logInUser() {
    it('Log In the user', async function () {
        const requestBody = {
            email: global.executionVariables.userEmail,
            password: global.executionVariables.userPassword
            }
        await request(this, 'POST', '/login', requestBody, false, 
            {
                statusCode : 200,
                expectedFields: ['token'],
                expectedValues: [
                                    {path: 'message', value: 'Login successful'},
                                ],
                executionVariables: [
                                        {path: 'token', name: 'userToken'}, 
                                    ]

            }
        )
    })
}

export async function deleteUser() {
    it('Remove user account', async function () {
        await deleteUserNoWrapper()
    })
}

export async function deleteUserNoWrapper() {
    await request(this, 'DELETE', `/user`, undefined, true, 
        {
            statusCode : 200,
            expectedValues: [
                                {path: 'message', value: 'User and all associated restaurants and meals have been deleted.'},
                            ]
        }
    )
}

export async function createUserWithNoEmail() {
    it('Create user account with no email', async function () {
        const requestBody = await getCreateUserRequestBody()
        delete requestBody.email
        await request(this, 'POST', '/user', requestBody, false, 
            {
                statusCode : 400,
                expectedValues: [
                                    {path: 'message', value: 'User validation failed: email: Path `email` is required.'},
                                ]
            }
        )
    })
}

export async function createUserWithNoPassword() {
    it('Create user account with no password', async function () {
        const requestBody = await getCreateUserRequestBody()
        delete requestBody.password
        await request(this, 'POST', '/user', requestBody, false, 
            {
                statusCode : 400,
                expectedValues: [
                                    {path: 'message', value: 'Password not provided'},
                                ]
            }
        )
    })
}

export async function createUserWithNoParam(param) {
    it(`Create user account with no ${param}`, async function () {
        const requestBody = await getCreateUserRequestBody()
        delete requestBody[param]
        let message
        switch (param){
            case 'email':
                message = 'User validation failed: email: Path `email` is required.'
                break;
            case 'password':
                message = 'Password not provided'
                break;
        }

        await request(this, 'POST', '/user', requestBody, false, 
            {
                statusCode : 400,
                expectedValues: [
                                    {path: 'message', value: message},
                                ]
            }
        )
    })
}

export async function createUserWithNoParamV2(param) {
    it(`Create user account with no ${param}`, async function () {
        switch (param){
            case 'email':
                await createUserWithNoEmail();
                break;
            case 'password':
                await createUserWithNoPassword();
                break;
        }
    })
}

import accountRequestBody from '../../data/user/create_account.json' with { type: 'json' }
import accountLogInBody from '../../data/user/log_in_user.json' with { type: 'json' }
import { config } from '../../../config.js'
import { generateRandomEmail, generateRandomPassword } from '../helpers.js'

export async function getCreateUserRequestBody() {
    accountRequestBody.email = await generateRandomEmail()
    accountRequestBody.name = config[global.env].name
    accountRequestBody.surname = config[global.env].surname
    let password = await generateRandomPassword();
    accountRequestBody.password = password
    global.executionVariables.userPassword = password;
    
    return accountRequestBody
}

export async function getLogInUserRequestBody() {
    accountLogInBody.email = global.executionVariables.userEmail
    accountLogInBody.password = global.executionVariables.userPassword
    
    return accountRequestBody
}
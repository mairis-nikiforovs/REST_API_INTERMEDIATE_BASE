import { faker } from '@faker-js/faker';
import csv from 'csv-parser'
import fs from 'fs'

export async function generateTestData() {
    const env = process.env.npm_config_env || 'STG'
    global.env = env
}

function setEnvironment(env) {
    global.env = env
}

export async function generateRandomEmail() {
    //return faker.internet.email();
    // optionally:
    return faker.internet.email({
        provider: 'apimail.tdlbox.com'
    })
}

export async function generateRandomPassword() {
    return faker.internet.password();
}

export async function generateRandomRestaurantName() {
    return `${faker.food.adjective()} ${faker.food.ingredient()} ${Date.now()}`
}

export async function generateRandomRestaurantDescription() {
    return `${faker.food.description()}`
}

export async function generateRandomString(size) {
    return `${faker.string.alphanumeric(size)}`
}

export async function readCsvFile(filePath){
    return new Promise ((resolve, reject) => {
        const result = []

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => result.push(data))
        .on('end', () => resolve(result))
        .on('error', (err) => reject(err))
    })
}
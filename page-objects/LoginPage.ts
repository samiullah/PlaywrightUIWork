import { expect, Locator,Page } from "@playwright/test";

export class LoginPage {
    
// selectors

readonly page:Page
readonly loginEmail:Locator
readonly loginPassword: Locator
readonly loginButton: Locator


// initialise selector using constructors

constructor(page:Page){
    this.page=page
    this.loginEmail = page.locator('#login_email')
    this.loginPassword = page.locator('#login_password')
    this.loginButton = page.locator('#loginBtn')
}

// define login page methods

async visit() {
    await this.page.goto('https://dashboard.spenmo-staging.com/login')
    
}

async login(email,password){
    await this.loginEmail.fill(email)
    await this.loginPassword.fill(password)
    await this.loginButton.click()
}

}
import { expect, Locator,Page } from "@playwright/test";

export class SideBarofPage {
    
// selectors

readonly page:Page
readonly sideBarMenu:Locator
readonly remibursementLink:Locator
readonly loginPassword: Locator
readonly loginButton: Locator
// readonly errorMessage: Locator

// initialise selector using constructors

constructor(page:Page){
    this.page=page
    this.sideBarMenu = page.locator('.sidebar-menu')
    this.remibursementLink = page.locator('text=Reimbursement & Requests')
    this.loginPassword = page.locator('#login_password')
    this.loginButton = page.locator('#loginBtn')
    // this.errorMessage = page.locator('.alert-error')

}

// define login page methods

async expandSideBar(){
    await this.sideBarMenu.hover()
}

async  navigateToReimbursements(){
    await this.remibursementLink.hover()
    await this.remibursementLink.click()
}

}
import { expect, Locator, Page } from "@playwright/test";
import moment from "moment"

export class HomePage {

    readonly page: Page
    readonly expensesLocator: Locator
    readonly allotedTeamFundsLocator: Locator
    readonly availableTeamFundsLocator: Locator
    readonly availableUserFundsLocator: Locator


    constructor(page: Page) {
        this.page = page
        this.expensesLocator = page.locator('text=Expenses This Month')
        this.allotedTeamFundsLocator = page.locator('text=Allotted Team Fund')
        this.availableTeamFundsLocator = page.locator('text=Available Team Funds')
        this.availableUserFundsLocator = page.locator('text=Available User Funds')

    }

    async verifyAdminMenuOptions() {

        let actualExpensesText = await this.expensesLocator.innerText()
        let actualAllotedTeamFundsLocatorText = await this.allotedTeamFundsLocator.innerText()
        let actualAvailableTeamFundsLocatorText = await this.availableTeamFundsLocator.innerText()


        await expect(actualExpensesText).toEqual("Expenses This Month")
        await expect(actualAllotedTeamFundsLocatorText).toEqual("Allotted Team Fund")
        await expect(actualAvailableTeamFundsLocatorText).toEqual("Available Team Funds")

    }

    async verifyAdminMenuOptionsAreNotVisible() {

        await expect(this.expensesLocator).toBeHidden()
        await expect(this.allotedTeamFundsLocator).toBeHidden()
        await expect(this.availableTeamFundsLocator).toBeHidden()
        await expect(this.availableUserFundsLocator).toBeVisible()

    }

}
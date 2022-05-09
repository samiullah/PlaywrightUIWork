import { expect, Locator, Page } from "@playwright/test";
import moment from "moment"

export class RightSideBarPage {

    readonly page: Page
    readonly pendingText: Locator
    readonly requestType: Locator
    readonly requestDate: Locator
    readonly requestedAmount: Locator
    readonly requestedBy: Locator
    readonly merchant: Locator
    readonly requestCategory: Locator
    readonly requestNotes: Locator
    readonly closeButton: Locator


    constructor(page: Page) {
        this.page = page
        this.pendingText = page.locator('.reimburse-details__label--pending')
        this.requestType = page.locator('div.table-row-field.reimburse-details__title > h4')
        this.requestDate = page.locator('div.table-row-field.reimburse-details__title>p')
        this.requestedAmount = page.locator('div.reimburse-details__header > div.table-row-field > h4')
        this.requestedBy = page.locator('.reimburse-details__request-details > div:nth-child(1) > p')
        this.merchant = page.locator('.reimburse-details__request-details>div:nth-child(2)>p')
        this.requestCategory = page.locator('.reimburse-details__request-details>div:nth-child(3)>p')
        this.requestNotes = page.locator('.reimburse-details__request-details>div:nth-child(4)>p')
        this.closeButton = page.locator('//div[@class="icon side-section__close"]/img')
    



    }

    async verifyPendingText() {
        let actualText = await this.pendingText.innerText()
        await expect(actualText).toEqual("PENDING")
    }
    async verifyRequestType(expectedRequestType) {
        let requestType = await this.requestType.innerText()
        await expect(requestType).toEqual(expectedRequestType)
    }

    async verifyRequestDate() {
        let actualRequestDate = await this.requestDate.innerText()
        let dateArray = actualRequestDate.split('|')
        let date = dateArray[0].trim()
        let now = new Date();
        let dateString = moment(now).format('DD MMM YYYY');
        await expect(date).toEqual(dateString.toString())

    }

    async verifyRequestedAmount(expectedAmount) {
        let actualRequestedAmount = await this.requestedAmount.innerText()
        await expect(actualRequestedAmount).toEqual(expectedAmount)

    }

    async verifyRequestedBy(requestedByUser) {
        let actualRequestedBy = await this.requestedBy.innerText()
        await expect(actualRequestedBy).toEqual(requestedByUser)
    }

    async verifyMerchant(merchantName) {
        let actualMerchantName = await this.merchant.innerText()
        await expect(actualMerchantName).toEqual(merchantName)
        
    }

    async verifyRequestCategory(requestCategory) {
        let actualRequestCategory = await this.requestCategory.innerText()
        await expect(actualRequestCategory).toEqual(requestCategory)
        
    }

    async verifyRequestNotes(notesValue){
        let actualNotes = await this.requestNotes.innerText()
        await expect(actualNotes).toEqual(notesValue)
    }



    async closeRightSideBar(){
        await this.closeButton.click()
        
    }


}
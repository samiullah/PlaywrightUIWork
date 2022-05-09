import { expect, Locator, Page } from "@playwright/test";
import csvParser from "csv-parser";
import * as fs from 'fs'
// // import * as parse from 'node-csv'
// // import csv from csvParser
// // const csv = require('csv-parser')
// const fs = require('fs')



export class RequestsInboxPage {



    // selectors
    readonly page: Page
    readonly filterButton: Locator
    readonly statusBox: Locator
    readonly statusInStatusBoxPending: Locator
    readonly typeBox: Locator
    readonly reimbursementType: Locator
    readonly min: Locator
    readonly max: Locator
    readonly apply: Locator
    readonly approveButton: Locator
    readonly firstPending: Locator
    readonly statusApproved: Locator
    readonly firstApproved: Locator

    // initialise selector using constructors
    constructor(page: Page) {
        this.page = page
        this.filterButton = page.locator('#filterToggle')
        this.statusBox = page.locator('div.ant-row.filter--status>div:nth-child(2)>div')
        this.statusInStatusBoxPending = page.locator('.section-options__title >> text=Pending')
        this.statusApproved = page.locator('.section-options__title >> text=Approved')
        this.typeBox = page.locator('div.ant-row.filter--type>div:nth-child(2)>div')
        this.reimbursementType= page.locator('.section-options__title >> text=Reimbursement')
        this.min = page.locator('css=[placeholder="min amount"]')
        this.max = page.locator('css=[placeholder="max amount"]')
        this.apply = page.locator('.submit-btn')
        this.approveButton = page.locator('.approve-btn span >> text=Approve')
        this.firstPending = page.locator(' tbody > tr:nth-child(1) > td.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-ellipsis > span')
        this.firstApproved = page.locator('(//h4[@class="approvals-listing__status"])[1]')


    }

    async addFilters(){

        await this.filterButton.click()
        await this.statusBox.click()
        await this.statusInStatusBoxPending.click()
        await this.typeBox.click()
        await this.reimbursementType.click()

        await this.min.fill("102")
        await this.max.fill("104")

        await this.apply.click()

    }

    async getPendingCount(){
        const elements = await this.page.$$("//tr[@class='ant-table-row ant-table-row-level-0']");
        let count = elements.length
        return count
        
    }

   async approveFirstRequest(){
       await this.firstPending.click()
       await this.page.waitForSelector('.approve-btn span >> text=Approve')
       await this.approveButton.click()

   }

   async checkApproved(){
    await this.filterButton.click()
    await this.statusBox.click()
    await this.statusApproved.click()
    await this.apply.click()
   let firstDetail =  await this.firstApproved.innerText()
    expect(firstDetail).toEqual("Approved")


   }



   

}
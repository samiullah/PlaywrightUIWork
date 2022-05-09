import { expect, test } from "@playwright/test";
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import {SideBarofPage} from '../../page-objects/SideBarofPage'
import { RequestsPage } from '../../page-objects/RequestsPage'
import { RightSideBarPage } from '../../page-objects/RightSideBarPage'
import {RequestsInboxPage} from '../../page-objects/RequestsInboxPage'


test.describe('Validate Status of Reimbursement based on Pending  or Approved State', () => {

    let loginPage: LoginPage
    let homePage: HomePage
    let sideBarofPage: SideBarofPage
    let requestsPage: RequestsPage
    let rightSideBarPage: RightSideBarPage
    let requestsInboxPage: RequestsInboxPage

    test("Login as an admin and validate reimbursement to be false when status is Pending", async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        sideBarofPage = new SideBarofPage(page)
        requestsPage = new RequestsPage(page)
        rightSideBarPage = new RightSideBarPage(page)
        requestsInboxPage = new RequestsInboxPage(page)

        await loginPage.visit()
        await loginPage.login("admin@bd.com", "spenmo@123")
        await sideBarofPage.navigateToReimbursements()
        await requestsPage.addReimbursements('TestSAM100', '103', "Default Message new")
        await requestsInboxPage.addFilters()
        await requestsPage.navigateToRequestsInbox()
        await requestsInboxPage.getPendingCount()
        await requestsInboxPage.approveFirstRequest()
        await rightSideBarPage.closeRightSideBar()
        await requestsInboxPage.checkApproved()
    
    })

})


import { expect, test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { SideBarofPage } from "../../page-objects/SideBarofPage";
import { RequestsPage } from "../../page-objects/RequestsPage";
import { RightSideBarPage } from "../../page-objects/RightSideBarPage";

test.describe("Validate Reimbursement details in CSV", () => {
  let loginPage: LoginPage;
  let sidebar: SideBarofPage;
  let requestsPage: RequestsPage;
  let rightSideBarPage: RightSideBarPage;

  test("Login as an admin and validate reimbursement details in sidebar and  csv", async ({
    page,
  }) => {
    loginPage = new LoginPage(page);
    sidebar = new SideBarofPage(page);
    requestsPage = new RequestsPage(page);
    rightSideBarPage = new RightSideBarPage(page);

    await loginPage.visit();
    await loginPage.login("admin@bd.com", "spenmo@123");
    await sidebar.expandSideBar();
    await sidebar.navigateToReimbursements();
    await requestsPage.addReimbursements("TestSAM1", "100", "Default Message");
    await requestsPage.openRightSideBarforReimbursements();
    await rightSideBarPage.verifyPendingText();
    await rightSideBarPage.verifyRequestType("Reimbursement");
    await rightSideBarPage.verifyRequestDate();
    await rightSideBarPage.verifyRequestedAmount("SGD 100");
    await rightSideBarPage.verifyRequestedBy("admin");
    await rightSideBarPage.verifyMerchant("TestSAM1");
    await rightSideBarPage.verifyRequestCategory("Medical");
    await rightSideBarPage.verifyRequestNotes("Default Message");
    await rightSideBarPage.closeRightSideBar();
    await requestsPage.downloadCSV();
    await requestsPage.validatesCSVData();
  });
});

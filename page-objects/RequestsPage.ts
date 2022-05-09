import { expect, Locator, Page } from "@playwright/test";
import csvParser from "csv-parser";
import * as fs from "fs";

export class RequestsPage {
  // selectors
  readonly page: Page;
  readonly remibursementLink: Locator;
  readonly addReimbursementsButton: Locator;
  readonly merchantField: Locator;
  readonly categoryDropdown: Locator;
  readonly categoryField: Locator;
  readonly amountField: Locator;
  readonly reimburseField: Locator;
  readonly reimburseFromDropdown: Locator;
  readonly dateInput: Locator;
  readonly currentDate: Locator;
  readonly addMessage: Locator;
  readonly fileUpload: Locator;
  readonly addReimbursementsSubmit: Locator;
  readonly myRequests: Locator;
  readonly firstRecord: Locator;
  readonly csvDownloadButton: Locator;
  readonly requestsInboxLink: Locator;

  // initialise selector using constructors
  constructor(page: Page) {
    this.page = page;
    this.addReimbursementsButton = page.locator("#actionButton");
    this.remibursementLink = page.locator("text=Reimbursement & Requests");
    this.merchantField = page.locator("#merchant");
    this.categoryField = page.locator(".category-dropdown>div>div>span>input");
    this.categoryDropdown = page.locator(
      "xpath = //div[@class='ant-select-item ant-select-item-option' and @title ='Medical']"
    );
    this.amountField = page.locator(".select-amount__input-amount");
    this.reimburseField = page.locator("#team_id");
    this.reimburseFromDropdown = page.locator(
      ".ant-select-item-option>div:text('BEL DEL')"
    );
    this.myRequests = page.locator("div:text('My Requests')");
    this.dateInput = page.locator(".ant-picker-input>input");
    this.currentDate = page.locator(".ant-picker-cell-today");
    this.addMessage = page.locator("#notes");
    this.fileUpload = page.locator(".ant-upload>input");
    this.addReimbursementsSubmit = page.locator("#addReimbursementSubmit");
    this.firstRecord = page.locator(
      "(//tr[@class='ant-table-row ant-table-row-level-0']/td/span)[1]"
    );
    this.csvDownloadButton = page.locator("#downloadCSV > img");
    this.requestsInboxLink = page.locator("text=Requests Inbox");
  }

  async navigateToReimbursements() {
    await this.remibursementLink.click();
  }

  async addReimbursements(merchantValue, amountValue, message) {
    await this.addReimbursementsButton.click();
    await this.merchantField.fill(merchantValue);
    await this.categoryField.click();
    await this.categoryDropdown.click();
    await this.amountField.fill(amountValue);
    await this.reimburseField.click();
    await this.reimburseFromDropdown.focus();
    await this.reimburseFromDropdown.hover();
    await this.reimburseFromDropdown.click();
    await this.dateInput.click();
    await this.currentDate.click();
    await this.addMessage.fill(message);
    await this.fileUpload.setInputFiles(
      "/Users/sami/spenmoAssignment/test-files/demo.jpg"
    );
    await this.page.waitForSelector("#addReimbursementSubmit");
    await this.page.waitForTimeout(15000);
    await this.addReimbursementsSubmit.click();
    await this.page.waitForTimeout(15000);
    await expect(this.myRequests).toBeVisible();
    await this.myRequests.click();
  }

  async openRightSideBarforReimbursements() {
    await this.firstRecord.click();
  }

  async downloadCSV() {
    let reliablePath = "downloaded.csv";
    const [download] = await Promise.all([
      this.page
        .waitForEvent("download", { timeout: 90000 })
        .catch((error) => null),
      this.csvDownloadButton.click(),
    ]);

    // save into the desired path
    await download.saveAs(reliablePath);
    // wait for the download and delete the temporary file
    await download.delete();
  }

  async validatesCSVData() {
    const results = [];
    var request_date;
    var request_type;
    var request_time;
    var team_name;
    var status;
    var name;
    var amount;

    fs.createReadStream("downloaded.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // console.log(results);
        console.log(results[0]);
        request_date = Object.values(results[0])[0];
        request_time = Object.values(results[0])[1];
        request_type = Object.values(results[0])[2];
        team_name = Object.values(results[0])[3];
        status = Object.values(results[0])[4];
        name = Object.values(results[0])[6];
        amount = Object.values(results[0])[8];

        expect(name).toBe("admin");
        expect(request_type).toBe("reimbursement");
        expect(team_name).toBe("BEL DEL");
        expect(status).toBe("pending");
        expect(amount).toBe("100.00");
      });
  }

  async navigateToRequestsInbox() {
    await this.requestsInboxLink.click();
  }
}

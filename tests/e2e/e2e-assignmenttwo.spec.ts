import { expect, test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe(
  "Validate presence and absence of menu items for admin and non admin user",
  () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test("Login as an admin and validate presence of menu items", async ({
      page,
    }) => {
      loginPage = new LoginPage(page);
      homePage = new HomePage(page);

      await loginPage.visit();
      await loginPage.login("admin@bd.com", "spenmo@123");
      await homePage.verifyAdminMenuOptions();
    });

    test("Login as an Non admin user and validate absence of admin menu items", async ({
      page,
    }) => {
      loginPage = new LoginPage(page);
      homePage = new HomePage(page);

      await loginPage.visit();
      await loginPage.login("aisha@bd.com", "spenmo@123");
      await homePage.verifyAdminMenuOptionsAreNotVisible();
    });
  }
);

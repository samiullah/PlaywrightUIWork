import { test, expect} from '@playwright/test'

import {loadpage,assertTitle} from '../helpers'

test('My first test',async ({page}) => {
    await page.goto('http://www.example.com')
    const pageHeadline = await page.locator('h1')
    await expect(pageHeadline).toContainText('Example Domain')
    
})  

test('test for clicking',async ({page}) => {

    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert')
    
    await expect(errorMessage).toContainText('Login and/or password are wrong.')    
})

test.skip('example of selector types',async ({page}) => {

   // text based

   await page.click('text=textvalue')

   // css id
   await page.click('#id')

   // css class
    await page.click('.classname')

    // visible css selector

    await page.click('.submit:visible')

    // combinations

    await page.click('#username .first')


    //xpath
    await page.click('//button')

    
})

test.describe("Test suite", ()=>{

test("Test for input",async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/")
    await page.click('#signin_button')
    await page.type('#user_login',"abc")
    await page.type('#user_password',"abcde")
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert')
    
    await expect(errorMessage).toContainText('Login and/or password are wrong.')    
    
})

test("Assertions @assert",async ({page}) => {
    await page.goto("https://example.com")
    await expect(page).toHaveURL("https://example.com/") 
    await expect(page).toHaveTitle('Example Domain')
    const pageHeader = await page.locator('h1')
    await expect(pageHeader).toHaveCount(1)
    await expect(pageHeader).toBeVisible()
    await expect(pageHeader).toContainText('Example Domain')
    const notVisibleElement = await page.locator('h5')
    await expect(notVisibleElement).not.toBeVisible()
})
})
test("test for full page screenshot",async ({page}) => {
    await page.goto("https://www.google.com")
    await page.screenshot({path:"screenshots.png",fullPage:true})
})

test.only("test for locator screenshot",async ({page}) => {
    await page.goto("https://stackoverflow.com/questions/66856542/error-when-calling-await-browser-close-node4960-unhandledpromiserejectionw")
    const loc = await page.$("#question-header > h1 > a")
    await loc.screenshot({path:"screenshotssss.png"})
})


test.describe.parallel.only('my super test suite',()=>{
    test.beforeEach(async ({page}) => {
       
        await page.goto('http://zero.webappsecurity.com/')
    })

    test('test for clicking',async ({page}) => {

        await page.click('#signin_button')
        await page.click('text=Sign in')
        const errorMessage = await page.locator('.alert')
        
        await expect(errorMessage).toContainText('Login and/or password are wrong.')    
    })

    test('test for clicking2',async ({page}) => {

        await page.click('#signin_button')
        await page.click('text=Sign in')
        const errorMessage = await page.locator('.alert')
        
        await expect(errorMessage).toContainText('Login and/or password are wrong.')    
    })
})


test("try custom functions code",async ({page}) => {
    await loadpage(page)
    await assertTitle(page)
})
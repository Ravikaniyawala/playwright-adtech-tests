// example.spec.js
const { test, expect } = require('@playwright/test');
const {Eyes,VisualGridRunner, Target, BatchInfo,BrowserType,ScreenOrientation,DeviceName,Configuration} = require('@applitools/eyes-playwright')
let { IHeartHomePage } = require('../PageObjects/IHeartPages/iHeart-home-page');
import testData  from "../PageObjects/TestData/TestData";
const Runner = new VisualGridRunner({ testConcurrency: 5 });

const visualTests = process.env.visual_Test;
const mobileTests = process.env.mobile_Test;
let iHeartHomePage;
let audience;
let testResult;

test.beforeAll(async() => {
});


test.describe('iHeart - Lotame - Ads Testing', async () => {

    test.describe.configure({ retries: 0});

    test.beforeEach(async ({page}) => {
        iHeartHomePage = new IHeartHomePage(page);
        test.setTimeout(40000);

    });

    test('Confluence url - xyz - TID - IHTWEB-001', async ({baseURL, isMobile}) => {

        await test.step('Given user go to iHeartHome page', async () => {
            await iHeartHomePage.gotoHomePage(baseURL);
        });

        await test.step('Then there should be a Lotame Tag', async () => {
            await iHeartHomePage.verifyReq(testData.IHTWEB_001_002_URL,
                testData.IHTWEB_001_002_HTTPMETHOD,testData.IHTWEB_001_002_PARAM, testData.IHTWEB_001_002_STATUSCODE);
        });

        await test.step('And there should be a request to Lotame', async () => {
            await iHeartHomePage.verifyReqBody(testData.IHTWEB_001_001_URL,
                testData.IHTWEB_001_001_HTTPMETHOD,testData.IHTWEB_001_001_PAYLOAD, testData.IHTWEB_001_001_STATUSCODE);

        });

    });

    test('Confluence url - xyz - TID - IHTWEB-002', async ({ baseURL, isMobile}) => {

        await test.step('Given user go to iHeartHome page', async () => {
            await iHeartHomePage.gotoHomePage(baseURL);
        });

        await test.step('When user plays Live Radio Stream', async () => {
            await iHeartHomePage.playRadio();
            audience = await iHeartHomePage.getAudienceMembership();
        });

        await test.step('Then Audiences passed on to Adswizz', async () => {
            await iHeartHomePage.verifyAudiencesPassedToAdWizz(audience);
        });

    });

    // This method performs cleanup after each test.
    test.afterEach(async ({page}) => {
        await page.close();
    });
});

test.afterAll(async() => {
});
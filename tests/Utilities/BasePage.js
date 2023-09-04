import {timeout} from "../config_iHeart";

const { expect } = require('@playwright/test');

let pagePw;
export default class basePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        pagePw = page;
        //wait for page to be loaded
        this.waitForPageToLoad();
    }

    async goToPage(baseUrl){
        await pagePw.goto(baseUrl);
        await this.waitForPageToLoad();
    }

    async isElementVisible(pageElement) {
        await expect(pagePw.locator(pageElement).first()).toBeVisible();
    }

    async isElementTextVisible(pageElement,text) {
        await expect(pagePw.locator(pageElement).first()).toHaveText(text);
    }

    async isMyElementEnabled(pageElement) {
        //await pagePw.locator(pageElement).waitFor({ state: 'enabled' });
        return await pagePw.locator(pageElement).isEnabled();
    }

    async waitAndClickWhileVisible(pageElement){
        while (await this.isMyElementEnabled(pageElement)){
            await this.waitAndClick(pageElement);
            await pagePw.waitForTimeout(1000);
        }
    }

    async waitForPageToLoad() {
        await pagePw.waitForLoadState('domcontentloaded', { timeout: timeout });
    }

    async getVisibleElement(pageElement) {

        for (let i = 0; i < pagePw.locator(pageElement).length; i++) {
            if(pagePw.locator(pageElement) === true) {
                return pageElement[i];
            }else if(pagePw.locator(pageElement)[i].visible === false) {

            }
        }
    }

    async isElementInVisible(pageElement) {
        await expect(pagePw.locator(pageElement)).toBeHidden( { timeout: timeout });
    }

    async isElementDisaled(pageElement) {
        await expect(pagePw.locator(pageElement)).toBeDisabled();
    }

    async isElementEnabled(pageElement) {
        await expect(pagePw.locator(pageElement)).toBeEnabled();
    }

    async waitForVisibility(pageElement) {
        await expect(pagePw.locator(pageElement)).toBeVisible();
    }

    async waitForVisibilityFrame(pageElement) {
        await expect(frame.locator(pageElement)).toBeVisible();
    }

    async waitForElementToBeEnabled(pageElement) {
        await expect(pagePw.locator(pageElement)).toBeEnabled();
    }


    async getTitle() {
        return await pagePw.title();
    }


    async getUrl() {
        return pagePw.url();
    }

    // wait and type for the element
    async waitAndType(Selector, text) {
        await pagePw.waitForSelector(Selector);
        await pagePw.click(Selector, { clickCount: 3 });
        await pagePw.keyboard.press('Backspace');
        await pagePw.type(Selector, text);
    }

    async waitAndHover(Selector) {
        await pagePw.waitForSelector(Selector);
        await pagePw.hover(Selector).catch((reason) => {
            console.error(reason.toString());
        });
        //await pagePw.pause(Selector);
    }

    // wait and click the element
    async waitAndClick(Selector) {
        await pagePw.waitForSelector(Selector);
        return await pagePw.click(Selector);
    }

    async waitAndInput(Selector,input) {
        await pagePw.waitForSelector(Selector);
        return pagePw.locator(Selector).type(input);
    }

    async pressEnter(Selector) {
        await pagePw.waitForSelector(Selector);
        await pagePw.locator(Selector).press("Enter");

    }

    /**
     * Click on page element without throwing exception
     * @param Selector
     */
    async forceClick(Selector) {
        await pagePw.click(Selector).catch((reason) => {
            console.error(reason.toString());
        });
    }

    /**
     * hover and click on page element
     * @param selector1
     * @param selector2
     */
    async hoverAndClick(selector1,selector2) {
        await this.waitAndHover(selector1);
        await this.waitAndClick(selector2);
    }

    // Get text of the element
    async getText(Selector) {
        await pagePw.waitForSelector(Selector);
        return await pagePw.$eval(Selector, element => element.innerHTML);
    }

    // Get Count of the elements
    async getCount(Selector) {
        await pagePw.waitForSelector(Selector);
        return await pagePw.$$eval(Selector, elements => elements.length);
    }

    /** This method verifies request, method, response and Status code of an http request. */
    async verifyRequestMethodStatusCode(req,method,statusCode){
        const [request] = await Promise.all([
            await pagePw.waitForRequest(request => request.url().includes(req)),
        ]);

        await expect(request.method() === method).toBeTruthy();

        const [response] = await Promise.all([
            await pagePw.waitForResponse(response => response.url().includes(req)),
        ]);
        await expect(response.status()===statusCode).toBeTruthy();

    }

    async decodeUrl(url) {
        try {
            return decodeURIComponent(url);
        } catch (e) {
            console.error(e); // In case of error while decoding
            return url;
        }
    }

    /** This method verifies request, method, statuscode and search query Parameters(array of string) of an http request. */
    async verifyRequestMethodStatusCodeParamater(reqUrl,method,param,statusCode){
        const [request] = await Promise.all([
            await pagePw.waitForRequest(request => request.url().includes(reqUrl)),
        ]);

        await expect(request.method() === method).toBeTruthy();
        let decodedString = decodeURIComponent(request.url());
        for (let i = 0; i < param.length; i++) {
            try {
                await expect(decodedString.includes(param[i])).toBeTruthy();
            }catch (error){
                const [request] = await Promise.all([
                    await pagePw.waitForRequest(request => request.url().includes(reqUrl) && decodeURIComponent(request.url()).includes(param[i])),
                ]);
                await expect(decodeURIComponent(request.url()).includes(param[i])).toBeTruthy();
            }
        }

        const [response] = await Promise.all([
            await pagePw.waitForResponse(response => response.url().includes(reqUrl)),
        ]);

        await expect(response.status()===statusCode).toBeTruthy();

    }

    /** This method verifies request, method, statuscode and body(array of string) of an http request. */
    async verifyRequestMethodStatusCodeBody(reqUrl,method,body,statusCode){
        const [request] = await Promise.all([
            await pagePw.waitForRequest(request => (request.url().includes(reqUrl) && request.postData().includes(body[0]))),
        ]);
        const json = request.postData().toString();
        for(const par of body){
            await expect(json.includes(par)).toBeTruthy();
        }
        const [response] = await Promise.all([
            await pagePw.waitForResponse(response => response.url().includes(reqUrl)),
        ]);
        await expect(response.status()===statusCode).toBeTruthy();

    }

    /**returns request containing url*/
    async getRequest(reqUrl){
        const [request] = await Promise.all([
            await pagePw.waitForRequest(request => request.url().includes(reqUrl)),
        ]);
        return request;
    }

    /** This methods returns a search query Parameter value of a specific http request. */
    async getSearchQueryParamValue(reqUrl,searchParamKey){
        const [request] = await Promise.all([
            await pagePw.waitForRequest(request => request.url().includes(reqUrl)),
        ]);

        const url = new URL(request.url());

        const params = new URLSearchParams(url.search);

        return params.get(searchParamKey);

    }

    /** This method is used to execute CDP command. */
    async executeConsoleCommand(command){
        return pagePw.evaluate(command);
    }

    /** refresh page and wait for page to load. */
    async refreshPage(){
        await pagePw.reload();
        await this.waitForPageToLoad();
    }

    /** static wait */
    async wait(){
        await this.waitForPageToLoad();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(4000);
    }

}
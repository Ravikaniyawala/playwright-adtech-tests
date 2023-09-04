const { expect } = require('@playwright/test');
import pageElements from '../PageElements/PageElements';
import basePage from "../../Utilities/BasePage";
import testData  from "../TestData/TestData";


exports.IHeartHomePage = class IHeartHomePage extends basePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  /** This methods is used to go to iHeart web homepage */
  async gotoHomePage(baseUrl) {
    await this.goToPage(!process.env.webapp ? "https://test.abc.com/" : process.env.webapp);
  }

  /** This method is used to go to Live Radio page on iHeart web*/
  async goToRadioPage() {
    await this.refreshPage();
    await this.waitForVisibility(pageElements.liveRadio);
    await this.waitAndClick(pageElements.liveRadio);
    await this.waitForPageToLoad();
    this.wait();
    await this.waitAndClick(pageElements.radioStationTile);

  }

  /** This method is used to go to Live Radio on iHeart web and play any of the Live radio */
  async playRadio() {
    await this.waitForVisibility(pageElements.liveRadio);
    await this.waitAndClick(pageElements.liveRadio);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.radioStationTile);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.playRadio);
    await this.isElementInVisible(pageElements.loadingIcon);
    await this.isElementVisible(pageElements.stopIcon);
    await this.isElementVisible(pageElements.stopIcon);
  }

  /** This method is used to go to Artist Radio page on iHeart web */
  async goToArtistRadioPage() {
    await this.refreshPage();
    await this.waitForVisibility(pageElements.artistRadio);
    await this.waitAndClick(pageElements.artistRadio);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.artistName);
  }

  /** This method is used to go to Artist Radio page on iHeart web and play any of the artist radio */
  async playArtistRadio() {
    await this.refreshPage();
    await this.waitForVisibility(pageElements.artistRadio);
    await this.waitAndClick(pageElements.artistRadio);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.artistName);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.artistPlay);
    await this.waitForPageToLoad();
    await this.isElementInVisible(pageElements.loadingIcon);
  }

  /** This method is used to go to podcast page on iHeart web  */
  async goToPodcastPage() {
    await this.refreshPage();
    await this.waitForVisibility(pageElements.podcast);
    await this.waitAndClick(pageElements.podcast);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.podcastName);
  }

  /** This method is used to go to podcast page on iHeart web and play any of the podcast */
  async playPodcast() {
    await this.refreshPage();
    await this.waitForVisibility(pageElements.podcast);
    await this.waitAndClick(pageElements.podcast);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.podcastName);
    await this.waitForPageToLoad();
    await this.waitAndClick(pageElements.playPodcast);
    await this.waitForPageToLoad();
    await this.isElementInVisible(pageElements.loadingIcon);
    //await this.isElementVisible(pageElements.stopIcon);
  }


  /** This method verifies, if the request is being made to Lotame when Live radio is played  */
  async verifyReqToLotame(){
    await this.verifyRequestMethodStatusCode('https://xyz.ab.net',"POST",200);
  }

  /**This method accepts url, http method, url query parameter and status code for verification*/
  async verifyReq(url,method,params,statusCode){
    await this.verifyRequestMethodStatusCodeParamater(url,method,params,statusCode);
  }

  /**This method accepts url, http method, payload and status code for verification*/
  async verifyReqBody(url,method,body,statusCode){
    await this.verifyRequestMethodStatusCodeBody(url,method,body,statusCode);
  }

  /** This method gets all the audiences Lotame has sent*/
  async getAudienceMembership(){
    return this.executeConsoleCommand('xyz');
  }

  /** This method verifies audiences are being passed to Adwizz as part of a url */
  async verifyAudiencesPassedToAdWizz(audience){
    await this.verifyRequestMethodStatusCodeParamater("xyz.com","GET",audience,200);
    await this.verifyRequestMethodStatusCodeParamater("xyz.com","GET","xyz",200);
  }

  /**This method accepts url, url search query parameter and audience for audience verification*/
  async verifySearchQueryParamater(reqUrl,searchParamKey,audience){
    const array2= await this.getSearchQueryParamValue(reqUrl,searchParamKey);
    const split_string = array2.split(",");
    for (let i = 0; i < split_string.length; i++) {
      await expect(audience[i]===split_string[i]).toBeTruthy();
    }
  }

  /** This method verifies if ads are retured by AdWizz. */
  async verifyAdsReturnedByAdWizz(){
    await this.verifyRequestMethodStatusCode("xyz.com","GET",200);
  }

  /** Login to iHeart Web */
  async loginiHeartWeb(username,password){
    await this.wait();
    await this.waitForVisibility(pageElements.account);
    await this.waitAndClick(pageElements.account);
    await this.waitAndInput(pageElements.userNameInput,username);
    await this.waitAndInput(pageElements.passwordInput,password);
    await this.waitAndClick(pageElements.loginButton);
    await this.wait();
    await this.isElementVisible(pageElements.profileName);
  }

}
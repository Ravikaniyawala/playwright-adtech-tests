class pageElements

{
//-----------------------------------------------------------------------iHeart Web Elements----------------------------------------------------------------
    liveRadio = "[data-test='header-menu-main'] [data-test='live-radio-menu']";

    playRadio = 'div[data-test="hero-container"] button[data-test="play-button"]';

    stopIcon = 'div[data-test="controls-container"] svg[aria-label="Stop Icon"]';

    loadingIcon = 'div[data-test="controls-container"] svg[aria-label="Loading Icon"]'

    artistRadio = "[data-test='header-menu-main'] [data-test='artist-radio-menu']";

    modalCloseButton = "button[data-test=modal-close-button]";
    artistName = "span[title='Morgan Wallen']";

    artistPlay = "div[data-test='hero-artist'] [data-test='play-icon']";

    podcast ="[data-test='header-menu-main'] [data-test='podcasts-menu']";

    podcastName = "span[title='The Mike Hosking Breakfast']";

    playPodcast = "//span[contains(text(),'Play Newest')]";

    radioStationTile = 'span[title="Coast Auckland"]';

    account = 'div[title="Account"]';

    userNameInput = '[data-test="username-input-field"]';

    passwordInput = '[data-test="password-input-field"]';

    loginButton = '[data-test="login-button"]';

    profileName = 'span[data-test=dropdown-trigger-wrapper] [data-test="profile-Img"]';

}

export default new pageElements();
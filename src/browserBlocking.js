import 'ie-array-find-polyfill';
import bowser from 'bowser';
// eslint-disable-next-line import/no-unresolved
import appConfig from 'app-config';

/* eslint-disable no-var, vars-on-top, prefer-template */
function getBrowserElements() {
    var browserList = [{
        name: 'Google Chrome',
        url: 'https://www.google.com/intl/en_ie/chrome/'
    }, {
        name: 'Mozilla Firefox',
        url: 'https://www.mozilla.org/en-US/firefox/new/'
    }, {
        name: 'Internet Explorer',
        url: 'https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads'
    }, {
        name: 'Microsoft Edge',
        url: 'https://www.microsoft.com/en-us/download/details.aspx?id=48126'
    }];
    var browserListContainer = document.createElement('div');

    for (var i = 0; i < browserList.length; i += 1) {
        var browserContainer = document.createElement('div');
        browserContainer.style.cssText = 'width: 17%; display: inline-block; margin: 0 2%;';

        var browserImage = document.createElement('img');
        browserImage.setAttribute('src', '/browser-blocking/' + browserList[i].name.replace(/\s/, '-') + '.jpg');
        browserImage.style.cssText = 'width: 65%; display: block; margin: 0 auto 15% auto;';

        var browserText = document.createElement('a');
        browserText.innerHTML = 'Download ' + browserList[i].name;
        browserText.setAttribute('href', browserList[i].url);
        browserText.setAttribute('target', '_blank');
        browserText.style.cssText = 'font-size: 1.3rem; display: block; line-height: 16px;';

        browserContainer.appendChild(browserImage);
        browserContainer.appendChild(browserText);

        browserListContainer.appendChild(browserContainer);
    }

    return browserListContainer;
}

function isBrowserSupported() {
    var blacklistedBrowsers = appConfig.browserBlacklist;
    var browser = bowser.getParser(navigator.userAgent);
    var currentBrowser = browser.getBrowserName();
    var browserConfigExists = currentBrowser in blacklistedBrowsers;
    var browserSupported = !browserConfigExists;

    if (browserConfigExists) {
        var unsupportedVersion = blacklistedBrowsers[currentBrowser];
        browserSupported = browser.compareVersion('>' + unsupportedVersion);
    }

    return browserSupported;
}

if (!isBrowserSupported()) {
    var pageBody = document.body;
    pageBody.style.cssText = 'background: #fff';
    // Create text container, style, and add text
    var containerDiv = document.createElement('div');
    containerDiv.style.cssText = 'width: 33%; margin: 5% auto; font-size: 2rem; text-align: center;';

    var headerImage = document.createElement('img');
    headerImage.setAttribute('src', '/browser-blocking/Top-Illustration.jpg');
    headerImage.style.cssText = 'height: 25%; width: 25%;';

    var warningText = document.createElement('p');
    warningText.innerHTML = 'Sorry, your browser is not supported.';
    warningText.style.cssText = 'font-size: 4rem; line-height: 48px; font-weight: lighter; margin-top: 5%';

    var subWarningText = document.createElement('p');
    subWarningText.innerHTML = 'Please use one of the following:';
    subWarningText.style.cssText = 'font-size: 1.5rem; line-height: 24px; margin: 4% 0;';

    containerDiv.appendChild(headerImage);
    containerDiv.appendChild(warningText);
    containerDiv.appendChild(subWarningText);
    containerDiv.appendChild(getBrowserElements());


    // Put text container in the body tag
    pageBody.appendChild(containerDiv);

    // Remove application container
    var appContainerDiv = document.getElementById('root');
    pageBody.removeChild(appContainerDiv);
}

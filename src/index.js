import { start } from '@jutro/app';
import {
    BrowserRouter
} from 'react-router-dom';
import { initDefaultGA, initDefaultMixpanel } from '@jutro/events';
import  { BrandingService } from 'gw-portals-branding-js'
import { LocaleService } from 'gw-portals-i18n-react';
import 'regenerator-runtime';

// eslint-disable-next-line import/no-unresolved
import appConfig from 'app-config';

import App from './app/App';

const { trackingConfig = {}, authentication = {}, microAppConfig = {}, policyTransactionMicroAppConfig = {} } = appConfig;

const gaTrackingId = trackingConfig.GA_TRACKING_ID;
const mixpanelTrackingId = trackingConfig.MIXPANEL_TRACKING_ID;

if (gaTrackingId) {
    initDefaultGA(trackingConfig);
}
if (mixpanelTrackingId) {
    initDefaultMixpanel(trackingConfig);
}

const config = {
    ...authentication.servers.okta,
    ...policyTransactionMicroAppConfig,
    microAppConfig,
    ...appConfig.credentials
};

start(App, {
    rootId: 'root',
    themeConfig: BrandingService.getBrandingTheme(),
    messageLoader: LocaleService.loadMessages,
    coreMessageLoader: LocaleService.loadCoreMessages,
    refreshOnLocaleChange: true,
    routerBasename: '/producer-engage',
    config: [config],
    onInit: () => {
        LocaleService.register();
    },
    Router: BrowserRouter,
    appName: {
        id: 'digital.appName',
        defaultMessage: 'ProducerEngage'
    },
    appDescription: 'ProducerEngage'
});

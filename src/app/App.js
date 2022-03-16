import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    useMemo
} from 'react';
import _ from 'lodash';
import { setComponentMapOverrides } from '@jutro/uiconfig';
import { ModalNextProvider } from '@jutro/components';
import { AppFloorPlan } from '@jutro/floorplan';
import './App.scss';
import { ViewModelServiceFactory } from 'gw-portals-viewmodel-js';
import { DependencyProvider } from 'gw-portals-dependency-react';
import { policyJobComponentMap, policyJobComponents } from 'gw-capability-policyjob-react';
import { ViewModelServiceContext } from 'gw-portals-viewmodel-react';
import { AccurateBreakpointPropagation } from 'gw-jutro-adapters-react';
import { TranslatorContext } from '@jutro/locale';
import { DropdownMenuLink, routeConfirmationModal } from '@jutro/router';
import vmTranslator, { messages as commonMessages } from 'gw-platform-translations';
import {
    platformComponents,
    platformComponentMap,
    ImageComponent,
    KnockOutPage,
} from 'gw-components-platform-react';
import PELandingPage, {
    Accounts,
    Policies,
    Activities,
    Analytics,
    AccountDetails,
    PolicyDetails,
    NewQuoteAccountSearch,
    NewQuotePage,
    SearchResults,
    QuoteDetails,
    Renewal,
    Endorsement,
    Cancellation,
    AccountBillingAndPayment,
    MakePayment,
    ContactUnderwriter,
    PaymentConfirmation,
    producerEngageComponentMap,
    producerEngageAdditionalComponents
} from 'gw-capability-gateway-react';
import { PolicyTransactionPage } from 'gw-policytransaction-react';
import { SelectProducerContextProvider } from 'gw-gateway-common-react';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'gw-portals-error-react';
import {
    useAuthentication,
    withAuthenticationProvider
} from 'gw-digital-auth-react';
import { GatewayAvailabilityService } from 'gw-capability-gateway-policycommon';
import { GatewayRenewalService } from 'gw-capability-gateway-policyrenewal';
import { GatewayEndorsementService } from 'gw-capability-gateway-policychange';
import { LoadSaveService, CustomQuoteService } from 'gw-capability-gateway-quoteandbind';
import { UserService, SubmissionService, JobService, SearchService } from 'gw-capability-gateway';
import { BopCoverablesService } from 'gw-capability-gateway-policyjob-bop';
import { GatewayClaimService } from 'gw-capability-gateway-claim';
import { GatewayBillingService } from 'gw-capability-gateway-billing';
import { GatewayFNOLService } from 'gw-capability-gateway-fnol';
import { AccountService } from 'gw-capability-gateway-policy';

import { GatewayDocumentService } from 'gw-capability-gateway-document';
import { GatewaySpreadsheetService } from 'gw-capability-gateway-spreadsheet';
import { ProducerInfoService } from 'gw-capability-profileinfo';
import { WizardPageTemplateWithTitle } from 'gw-portals-wizard-components-ui';
import { PropertyCodeLookupService } from 'gw-capability-quoteandbind-cp';
import { AddressLookupComponentMap, AddressLookupComponents } from 'gw-capability-address-react';
import { VehicleInfoLookupComponentMap, VehicleInfoLookupComponents } from 'gw-capability-vehicleinfo-react';
import { GatewayClaimDocumentService } from 'gw-capability-gateway-claimdocument';
import { filterCapabilityRoutes } from 'gw-portals-config-js';
import { PolicyDocumentError } from 'gw-capability-document-react';
import BaseFNOLWizard, { ClaimsConfirmationPage } from 'gw-capability-fnol-common-react';
import { ContactAgentPage, Preferences } from 'gw-pages-platform-react';
import FNOLHOWizard from 'gw-capability-fnol-ho-react';
import FNOLPAWizard from 'gw-capability-fnol-pa-react';
import FNOLCAWizard from 'gw-capability-fnol-ca-react';
import FNOLCPWizard from 'gw-capability-fnol-cp-react';
import FNOLWCWizard from 'gw-capability-fnol-wc-react';
import FNOLBOPWizard from 'gw-capability-fnol-bop-react';
import FNOLGeneralWizard from 'gw-capability-fnol-gl-react';
import { PEWC7Wizard } from 'gw-capability-gateway-quoteandbind-wc7-react';
import { PEPAWizard } from 'gw-capability-gateway-quoteandbind-pa-react';
import { PEHOWizard } from 'gw-capability-gateway-quoteandbind-ho-react';
import { PEBOPWizard } from 'gw-capability-gateway-quoteandbind-bop-react';
import { PECPWizard } from 'gw-capability-gateway-quoteandbind-cp-react';
import { PAPolicyChangeWizard } from 'gw-capability-policychange-pa-react';
import { HOPolicyChangeWizard } from 'gw-capability-policychange-ho-react';
import { CPPolicyChangeWizard } from 'gw-capability-gateway-policychange-cp-react';
import { BOPPolicyChangeWizard } from 'gw-capability-gateway-policychange-bop-react';
import { CPPolicyRenewalWizard } from 'gw-capability-gateway-policyrenewal-cp-react';
import { BOPPolicyRenewalWizard } from 'gw-capability-gateway-policyrenewal-bop-react';
import FaqPage from 'gw-capability-faq-react';
import { ClaimDetails } from 'gw-capability-claim-react';
import { ClaimsLanding } from 'gw-capability-gateway-claim-react';
import { CommissionLanding } from 'gw-capability-gateway-commission-react';

// eslint-disable-next-line import/no-unresolved
import appConfig from 'app-config';

import messages from './App.messages';
import appRoutes from './App.routes.metadata.json5';


const { capabilitiesConfig, env, gatewayAnalytics } = appConfig;

const componentMap = {
    landingpage: PELandingPage,
    accounts: Accounts,
    policies: Policies,
    activities: Activities,
    analytics: Analytics,
    accountdetails: AccountDetails,
    policydetails: PolicyDetails,
    newquoteaccountsearch: NewQuoteAccountSearch,
    newquotepage: NewQuotePage,
    searchresults: SearchResults,
    quotedetails: QuoteDetails,
    renewal: Renewal,
    endorsement: Endorsement,
    cancellation: Cancellation,
    accountbillingandpayment: AccountBillingAndPayment,
    makepayment: MakePayment,
    contactunderwriter: ContactUnderwriter,
    paymentconfirmation: PaymentConfirmation,
    basefnolwizard: BaseFNOLWizard,
    claimsconfirmationpage: ClaimsConfirmationPage,
    contactagentpage: ContactAgentPage,
    preferences: Preferences,
    fnolhowizard: FNOLHOWizard,
    fnolpawizard: FNOLPAWizard,
    fnolcawizard: FNOLCAWizard,
    fnolcpwizard: FNOLCPWizard,
    fnolwcwizard: FNOLWCWizard,
    fnolbopwizard: FNOLBOPWizard,
    fnolgeneralwizard: FNOLGeneralWizard,
    pewc7wizard: PEWC7Wizard,
    pepawizard: PEPAWizard,
    pehowizard: PEHOWizard,
    pebopwizard: PEBOPWizard,
    pecpwizard: PECPWizard,
    papolicychangewizard: PAPolicyChangeWizard,
    hopolicychangewizard: HOPolicyChangeWizard,
    cppolicychangewizard: CPPolicyChangeWizard,
    boppolicychangewizard: BOPPolicyChangeWizard,
    cppolicyrenewalwizard: CPPolicyRenewalWizard,
    boppolicyrenewalwizard: BOPPolicyRenewalWizard,
    faqpage: FaqPage,
    knockoutpage: KnockOutPage,
    claimdetails: ClaimDetails,
    claimslanding: ClaimsLanding,
    commissionlanding: CommissionLanding,
    policydocumenterror: PolicyDocumentError,
    policytransactionpage: PolicyTransactionPage,
};

setComponentMapOverrides({
    ...platformComponentMap,
    ...AddressLookupComponentMap,
    ...VehicleInfoLookupComponentMap,
    ...producerEngageComponentMap,
    ...policyJobComponentMap,
    WizardPageTemplateWithTitle: { component: 'WizardPageTemplateWithTitle' },
    // replace the native IMG component with a proxied version
    img: { component: 'img' }
},
{
    ...platformComponents,
    ...AddressLookupComponents,
    ...VehicleInfoLookupComponents,
    ...producerEngageAdditionalComponents,
    ...policyJobComponents,
    WizardPageTemplateWithTitle,
    img: ImageComponent
});

const defaultRoutes = filterCapabilityRoutes(capabilitiesConfig, appRoutes.routes);

const getUserAuthData = (authData) => {
    return UserService.getGatewayCurrentUser(authData.authHeader).catch(() => {
        console.error('Authentication failed');
        authData && authData.logout();
    });
};

const prefix = _.get(env, 'DEPLOYMENT_PATH', '').replace(/\/$/, '');
const logoSrc = `${prefix}/branding/logo-version-agents.svg`;

function App(props) {
    const auth = useAuthentication();
    const translator = useContext(TranslatorContext);
    const [viewModelService, updateViewModelService] = useState(undefined);
    const [permissionCheck, updatePermissionCheck] = useState(false);
    const [routes, updateRoutes] = useState(defaultRoutes);
    useEffect(
        () => {
            const translatorFn = vmTranslator(translator);
            import(
                /* webpackChunkName: "product-metadata" */
                // eslint-disable-next-line import/no-unresolved
                'product-metadata'
            ).then((productMetadata) => {
                const { default: result } = productMetadata;
                updateViewModelService(
                    ViewModelServiceFactory.getViewModelService(result, translatorFn)
                );
            });
        },
        [translator]
    );

    const handleError = useCallback((error = {}) => {
        const state = {
            pathname: '/',
            state: error
        };

        return ModalNextProvider.showAlert({
            title: messages.error,
            message: messages.errorMessage,
            status: 'error',
            icon: 'mi-error-outline',
            confirmButtonText: commonMessages.ok
        }).then(
            () => <Redirect to={state} />,
            _.noop
        );
    }, []);

    const avatarLinks = useMemo(() => {
        return [
            <DropdownMenuLink key="faq" to="/faq">{translator(messages.faq)}</DropdownMenuLink>,
            <DropdownMenuLink key="preferences" to="/preferences">{translator(messages.preferences)}</DropdownMenuLink>,
        ];
    }, [translator]);

    const checkViewCommissionsAnalyticsPermission = useCallback(() => {
        const commissionsDTO = {
            permission: 'viewcommissions'
        };

        const reportsDTO = {
            permission: 'gpaviewreports'
        };

        if(_.isEmpty(auth.authHeader) || permissionCheck) {
            return;
        }
        updatePermissionCheck(true);

        const commissionPermission = UserService.hasUserSystemPermission(commissionsDTO, auth.authHeader);

        const analyticsPermission = UserService.hasUserSystemPermission(reportsDTO, auth.authHeader);

        Promise.all([commissionPermission, analyticsPermission])
            .then(([hasCommission, hasAnalytics]) => {

                const routesToBeUpdated = ['/commission', '/analytics'];
                let updatedRoutes = 0;

                for (const route of routes) {
                    if (routesToBeUpdated.includes(route.path)) {
                        updatedRoutes ++;
                        route.showOnNavBar = (
                            route.path === '/commission' ? hasCommission : gatewayAnalytics && hasAnalytics
                        );
                    }

                    if(routesToBeUpdated.length === updatedRoutes) {
                        break;
                    }
                }
                updateRoutes([...routes]);
            });


    }, [auth.authHeader, permissionCheck, routes]);

    const onSearchValueChange = useCallback((selectedValue) => {
        const { history } = props;
        const searchText = _.get(selectedValue, 'id', '');
        if (!_.isEmpty(searchText)){
            let redirectPath = `/search/${searchText}`;
            if (_.get(selectedValue, 'type', '') === 'account') {
                redirectPath = `/accounts/${searchText}/summary`;
            }
            if (_.get(selectedValue, 'type', '') === 'policy') {
                redirectPath = `/policies/${searchText}/summary`
            }
            history.push(redirectPath);
        }
    }, [props]);

    const formatSearchValues = useCallback((displayName, id, type) => {
        const availableObject = {
            displayName,
            id,
            type
        };
        return availableObject;
    }, []);

    const handleLoadValues = useCallback(async (searchParam) => {
        const searchObj = {
            previousSearchParam: '',
            searchParam
        };
        const displayName = translator(messages.viewAll, { Number: searchParam});
        const viewAll = formatSearchValues(displayName, searchParam, '');
        const searchResults = await SearchService.search(searchObj, auth.authHeader);
        const availableValues = [viewAll];
        if (!_.isEmpty(searchResults)) {
            const { accounts, policies } = searchResults;
            if (!_.isEmpty(accounts)) {
                _.each(accounts, (account) => {
                    availableValues.push(formatSearchValues(`${account.accountHolder} - ${account.accountNumber}`, account.accountNumber, 'account'));
                })
            }
            if (!_.isEmpty(policies)) {
                _.each(policies, (policy) => {
                    availableValues.push(formatSearchValues(`${policy.accountNumber} - ${policy.policyNumber}`, policy.policyNumber, 'policy'));
                })
            }
        }
        return availableValues;
    }, [auth.authHeader, formatSearchValues, translator]);

    const floorPlansConfig = useMemo(() => {
        return [{
            scrollContent: false,
            showFooter: false,
            routes: routes,
            header: {
                avatarChildren: avatarLinks,
                avatarProps: {
                    username: auth.userInfo.name,
                    title: _.get(auth, 'authUserData.displayName'),
                    subtitle: _.capitalize(_.get(auth, 'authUserData.userType'))
                },
                className: 'appHeader',
                logoSrc: logoSrc,
                onSearchValueChange,
                onLoadValues: handleLoadValues,
                showAppSwitcher: false,
                showNotifications: false,
                searchFieldPlaceholder: messages.searchPlaceHolder
            }
        }];
    }, [auth, avatarLinks, handleLoadValues, onSearchValueChange, routes]);

    useEffect(() => {
        checkViewCommissionsAnalyticsPermission();
    }, [checkViewCommissionsAnalyticsPermission]);

    return (
        <AccurateBreakpointPropagation>
            <DependencyProvider
                value={{
                    BopCoverablesService: BopCoverablesService,
                    LoadSaveService: LoadSaveService,
                    CustomQuoteService: CustomQuoteService,
                    ClaimService: GatewayClaimService,
                    ClaimDownloadService: GatewayClaimDocumentService,
                    FNOLService: GatewayFNOLService,
                    AvailabilityService: GatewayAvailabilityService,
                    RenewalService: GatewayRenewalService,
                    DocumentService: GatewayDocumentService,
                    SpreadsheetService: GatewaySpreadsheetService,
                    EndorsementService: GatewayEndorsementService,
                    AccountService: AccountService,
                    BillingService: GatewayBillingService,
                    UserService: UserService,
                    PropertyCodeLookupService: PropertyCodeLookupService,
                    ContactService: ProducerInfoService,
                    quoteUnderWritingService: {
                        referToUnderwriter: SubmissionService.referToUnderwriter,
                        withdrawJobByJobNumber: JobService.withdrawJobByJobNumber,
                        approveUnderwritingIssue: LoadSaveService.approveUnderwritingIssue
                    }
                }}
            >
                <ViewModelServiceContext.Provider value={viewModelService}>
                    <ErrorBoundary onError={handleError}>
                        <SelectProducerContextProvider>
                            <Router basename="/producer-engage" getUserConfirmation={routeConfirmationModal}>
                                <AppFloorPlan
                                    componentMap={componentMap}
                                    floorPlans={floorPlansConfig}
                                />
                            </Router>
                        </SelectProducerContextProvider>
                    </ErrorBoundary>
                </ViewModelServiceContext.Provider>
            </DependencyProvider>
        </AccurateBreakpointPropagation>
    );
}
export default withAuthenticationProvider({ onAuthDataCreation: getUserAuthData })(App);

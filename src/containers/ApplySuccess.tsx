import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getApiDefinitions } from '../apiDefs/query';
import sentenceJoin from '../sentenceJoin';
import { IApiList, IApplication, IRootState } from '../types';

const mapStateToProps = (state : IRootState) => {
  return {
    ...state.application,
  };
};

function AssistanceTrailer() {
  return (
    <p>If you would like to report a bug or make a feature request, please open an issue through our <Link to="/support">Support page</Link>.</p>
  );
}

interface IApiKeyNoticeProps {
  token: string;
  email: string;
  selectedApis: string[];
}

interface IOAuthCredentialsNoticeProps {
  clientID: string;
  clientSecret?: string;
  email: string;
  selectedApis: string[];
}

// Mapping from the options on the form to Proper Names for APIs
const apisToEnglishOauthList = {
  claims: 'Benefits Claims API',
  community_care: 'Community Care API',
  health: 'VA Health API',
  verification: 'Veteran Verfication API',
};

const apisToEnglishApiKeyList = () => {
  const apiDefs = getApiDefinitions();
  return {
    benefits: apiDefs.benefits.properName,
    confirmation: 'Veteran Confirmation API',
    facilities: apiDefs.facilities.properName,
    vaForms: apiDefs.vaForms.properName,
  };
};


const apisToEnglishList = (apis: string[]): string => {
  return sentenceJoin(apis.map(api => apisToEnglishApiKeyList()[api]));
};

function OAuthCredentialsNotice({ clientID, clientSecret, email, selectedApis } : IOAuthCredentialsNoticeProps) {
  const apiListSnippet = selectedApis.filter((k) => apisToEnglishOauthList[k] );

  return (
    <div>
      <p className="usa-font-lead"><strong>Your VA API OAuth Client ID:</strong> {clientID}</p>
      {clientSecret && <p className="usa-font-lead"><strong>Your VA API OAuth Client Secret:</strong> {clientSecret}</p>}

      <p>
        You should receive an email at {email} with the same credentials. Those credentials are for accessing the {apiListSnippet} in the development environment.
        See our <Link to="/oauth">OAuth Documentation</Link> for more information on usage.
      </p>

    </div>
  );
}

function ApiKeyNotice({ token, email, selectedApis } : IApiKeyNoticeProps) {
  const apiList = selectedApis.filter((k) => apisToEnglishApiKeyList()[k]);
  const apiListSnippet = apisToEnglishList(apiList);

  return (
    <div>
      <p className="usa-font-lead"><strong>Your VA API key is:</strong> {token}</p>
      <p>
        You should receive an email at {email} with the same key. That key is for accessing the {apiListSnippet} in the development environment.
        You can use it by including it in each request as an HTTP request header named <span className="va-api-u-font-family--mono">apiKey</span>.
      </p>
    </div>
  );
}

function selectedApiNames(apis: IApiList): string[] {
  return Object.keys(apis).filter((apiName) => {
    return apis[apiName] === true;
  });
}

function ApplySuccess(props: IApplication) {
  const { 
    inputs: { 
      apis, 
      email: { value: email },
    }, 
    token, 
    clientID, 
    clientSecret,
  } = props;

  const selectedApis = selectedApiNames(apis);
  // Auth type should be encoded into global API table once it's extracted from ExploreDocs.
  const onlyOAuthSelected = (
    (selectedApis.indexOf('benefits') === -1)
    && (selectedApis.indexOf('facilities') === -1)
    && (selectedApis.indexOf('appeals') === -1)
    && (selectedApis.indexOf('vaForms') === -1)
    && (selectedApis.indexOf('confirmation') === -1)
  );

  const oAuthNotice = ((apis.health || apis.verification || apis.claims) && clientID)
                    ? <OAuthCredentialsNotice email={email} clientID={clientID} clientSecret={clientSecret} selectedApis={selectedApiNames(apis)} />
                    : null;

  return (
    <div role="region" 
      aria-labelledby="apply-region" 
      className={classNames('vads-l-grid-container', 'vads-u-padding--4')}
    >
      <p><strong>Thank you for signing up!</strong></p>
      {!onlyOAuthSelected && <ApiKeyNotice email={email} token={token} selectedApis={selectedApiNames(apis)} />}
      {oAuthNotice}
      <AssistanceTrailer />
    </div>
  );
}

export default connect(mapStateToProps)(ApplySuccess);

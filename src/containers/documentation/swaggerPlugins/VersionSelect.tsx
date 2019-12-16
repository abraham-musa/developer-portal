import classNames from 'classnames';
import * as React from 'react';

import { IVersionInfo } from '../SwaggerDocs';

export interface IVersionSelectProps {
  getSystem: any;
  metadata: any;
  versionNumber: string;
}

export default class VersionSelect extends React.Component<IVersionSelectProps> {
  public constructor(props: IVersionSelectProps) {
    super(props);
  }

  public handleSelectChange(version: string) {
    // this.setState({ version });
  }

  public handleButtonClick() {
    this.props.getSystem().fn.versionHandler();
    // this.props.getSystem().versionActions.updateVersion(this.state.version);
  }

  public buildDisplay(metaObject: IVersionInfo) {
    const { version, status, internal_only } = metaObject;
    return `${version} - ${status} ${internal_only ? '(Internal Only)' : ''}`;
  }

  public render() {
    return (
      <div className={classNames(
        'vads-u-display--flex',
        'vads-u-flex-wrap--wrap',
        'vads-u-justify-content--flex-start',
      )}>
        <select // tslint:disable-next-line:react-a11y-no-onchange
          aria-label="Version Selection"
          value={this.props.versionNumber}
          onChange={e => this.handleSelectChange(e.target.value)}
          className={classNames(
            'vads-u-display--inline-block',
            'vads-u-flex--4',
            'vads-u-margin-right--4',
            'va-api-u-min-width--200')}
        >
          {this.props.metadata
            .meta.versions.map((versionInfo: IVersionInfo) => {
              return (
                <option value={versionInfo.version} key={versionInfo.version}>
                  {this.buildDisplay(versionInfo)}
                </option>
              );
            })}
        </select>
        <button onClick={e => this.handleButtonClick()} className={classNames('vads-u-flex--1', 'va-api-u-max-width--150')}>
          Select
        </button>
      </div>
    );
  }
}

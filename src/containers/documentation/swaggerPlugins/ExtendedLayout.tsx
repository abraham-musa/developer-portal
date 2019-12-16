import * as React from 'react';
import { connect } from 'react-redux';
import { getVersionNumber } from '../../../reducers/api-versioning';
import { IRootState } from '../../../types';
import VersionSelect from './VersionSelect';

// These two props are handed in via swagger-ui
// getSystem allows access to the swagger-ui state
// getComponent just allows a helper function to get the base layout
// see: https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
export interface IExtendedLayoutProps {
  getComponent: any;
  getSystem: any;
  metadata: any;
  versionNumber: string;
}

const mapStateToProps = (state : IRootState) => {
  return {
    metadata: state.apiVersioning.metadata,
    versionNumber: getVersionNumber(state.apiVersioning),
  };
};

class ExtendedLayout extends React.Component<IExtendedLayoutProps, {}> {
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }

  public render() {
    const { metadata, getComponent, getSystem } = this.props;

    const BaseLayout = getComponent('BaseLayout', true)!;
    return (
      <div>
        {metadata && Object.keys(metadata).length !== 0 && (
          <VersionSelect getSystem={getSystem} versionNumber={this.props.versionNumber} metadata={this.props.metadata} />
        )}
        <BaseLayout />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ExtendedLayout);

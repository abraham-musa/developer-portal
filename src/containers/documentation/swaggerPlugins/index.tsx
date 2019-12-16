import { curlify } from './curlify';
import DisableTryItOut from './DisableTryItOut';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import Servers from './Servers';
import ServersContainer from './ServersContainer';
import './StyleOverride.scss';
import { WrapParameters } from './WrapParameters';

export function SwaggerPlugins(versionHandler: any) {
  return {
    components: {
      ExtendedLayout,
      OperationTag,
      Servers,
      ServersContainer,
    },
    fn: {
      curlify,
      versionHandler,
    },
    statePlugins: {
      spec: {
        ...DisableTryItOut.toggleTryItOut(),
      },
    },
    wrapComponents: {
      ...DisableTryItOut.toggleAuthorize(),
      ...WrapParameters,
    },
  };
}

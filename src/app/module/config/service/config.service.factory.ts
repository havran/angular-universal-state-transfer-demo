import { ConfigService } from './config.service';
import { ConfigValidator } from './config.validator';

export function configServiceFactory(
  config: ConfigService,
  configUrl: string,
  configValidators: ConfigValidator[],
) {
  console.log('~~~> configServiceFactory called with configUrl:', configUrl);
  return function() {
    return config.load(configUrl, configValidators);
  };
}

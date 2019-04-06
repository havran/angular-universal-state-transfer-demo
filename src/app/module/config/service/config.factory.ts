import { ConfigService } from './config.service';

export function configFactory(configService: ConfigService) {
  console.log('~~~> configFactory called');
  return configService.config;
}

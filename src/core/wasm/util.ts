import {
  AccessType,
  accessTypeFromJSON,
} from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';

// core v2 returns human-friendly string like 'Everybody' by wasm/type/params.go
// but accessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
// this function is a wrapper to get AccessType from JSON
export function convertAccessTypeFromJSON(accessType: string): AccessType {
  let converted: string = accessType;

  switch (accessType) {
    case 'Everybody':
      converted = 'ACCESS_TYPE_EVERYBODY';
      break;
    case 'Nobody':
      converted = 'ACCESS_TYPE_NOBODY';
      break;
    case 'OnlyAddress':
      converted = 'ACCESS_TYPE_ONLY_ADDRESS';
      break;
    case 'Unspecified':
      converted = 'ACCESS_TYPE_UNSPECIFIED';
      break;
  }
  return accessTypeFromJSON(converted);
}

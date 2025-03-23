/**
 * @description Enum to represent the status of API calls.
 */
export enum ApiStatus {
  // API call has not been made yet
  INACTIVE = 'inactive',

  // API call is in progress
  LOADING = 'loading',

  // API call succeeded
  SUCCESS = 'success',

  // API call failed
  FAIL = 'fail',
}

/**
 * @description Represents API message response from backend service
 */
export interface ApiMessageResp {
  readonly message: string;
  readonly status: number;
  readonly success: boolean;
}

/**
 * @description Represents API message response with data from backend service
 */
export interface ApiDataResp<T> {
  readonly data: T;
  readonly status: number;
  readonly success: boolean;
}

/**
 * @description Represents an api error response from backend service
 */
export interface ApiErrorResp {
  readonly detail: string;
  readonly title: string;
  readonly status: number;
  readonly success: boolean;
}

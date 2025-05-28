export interface ToastData {
  readonly detail: string;
  readonly severity: ToastSeverity;
  readonly milliseconds?: number;
}

export enum ToastSeverity {
  SUCCESS,
  ERRROR,
}

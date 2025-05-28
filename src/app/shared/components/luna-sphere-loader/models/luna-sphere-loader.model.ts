export enum LoaderTypeEnum {
  // Displays the laoder as a modal
  MODAL_SCREEN,

  // Displays the loader for entire screen
  FULL_SCREEN,
}

export interface LoaderData {
  readonly title: string;
  readonly detail: string;
  readonly type: LoaderTypeEnum;
}

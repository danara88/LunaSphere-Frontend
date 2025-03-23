import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';

export interface LoaderConfig {
  title: string;
  spinnerType: SpinnerTypeEnum;
  description: string;
}

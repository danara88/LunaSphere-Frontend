import { Component } from '@angular/core';

import { ButtonVariantEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';

@Component({
  selector: 'auth-start-page',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  readonly buttonVariantEnum = ButtonVariantEnum;
}

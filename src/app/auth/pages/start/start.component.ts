import { ButtonVariantEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { Component } from '@angular/core';

@Component({
  selector: 'auth-start-page',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  readonly buttonVariantEnum = ButtonVariantEnum;
}

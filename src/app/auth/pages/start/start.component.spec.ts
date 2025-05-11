import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { LunaSphereButtonModule } from '@/shared/components/luna-sphere-button/luna-sphere-button.module';

describe('StartComponent', () => {
  let fixture: ComponentFixture<StartComponent>;
  let component: StartComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaSphereButtonModule],
      declarations: [StartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

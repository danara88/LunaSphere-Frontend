import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalAuthOptionsComponent } from './portal-auth-options.component';

describe('PortalAuthOptionsComponent', () => {
  let component: PortalAuthOptionsComponent;
  let fixture: ComponentFixture<PortalAuthOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalAuthOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalAuthOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

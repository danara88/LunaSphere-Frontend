import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

import { PortalAuthOptionsComponent } from './portal-auth-options.component';
import { AccountType } from '@/auth/auth.schema';
import { LunaSphereButtonComponent } from '@/shared/components/luna-sphere-button/luna-sphere-button.component';
import { GoogleService } from '@/auth/services/google.service';

describe('LunaSphereButtonComponent', () => {
  let fixture: ComponentFixture<PortalAuthOptionsComponent>;
  let component: PortalAuthOptionsComponent;
  let compiled: HTMLElement;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let googleService: GoogleService;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivatedRoute = {
    snapshot: {
      params: {
        portal: AccountType.business,
      },
    },
  };

  const mockGoogleService = {
    initializeGoogleSignIn: () => {},
    renderButton: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortalAuthOptionsComponent, LunaSphereButtonComponent],
      providers: [
        provideRouter([]),
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: GoogleService,
          useValue: mockGoogleService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PortalAuthOptionsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    activatedRoute = TestBed.inject(ActivatedRoute);
    googleService = TestBed.inject(GoogleService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct title and subtitle when portal is business', () => {
    activatedRoute.snapshot.params['portal'] = AccountType.business;
    component.ngOnInit();
    expect(component.title).toBe('Business Portal');
    expect(component.subTitle).toBe(
      'Increase your business reach and optimize your reservation flow.'
    );
  });

  it('should set correct title and subtitle when portal is individual and inititlize google sign in', () => {
    const initializeGoogleSignInSpy = spyOn(googleService, 'initializeGoogleSignIn');
    activatedRoute.snapshot.params['portal'] = AccountType.individual;
    component.ngOnInit();
    expect(component.title).toBe('Individual Portal');
    expect(component.subTitle).toBe('Search, reserve, enjoy!');
    expect(initializeGoogleSignInSpy).toHaveBeenCalled();
  });

  it('should redirect to register individual user when it is individual portal', () => {
    activatedRoute.snapshot.params['portal'] = AccountType.individual;
    fixture.detectChanges();
    component.registerRedirect();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/register-individual']);
  });

  it('should redirect to /auth when portal param is not correct', () => {
    activatedRoute.snapshot.params['portal'] = 'wrong-param-here';
    fixture.detectChanges();
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should render google sign in button when it is individual portal', () => {
    const renderButtonSpy = spyOn(googleService, 'renderButton');
    activatedRoute.snapshot.params['portal'] = AccountType.individual;
    fixture.detectChanges();
    component.ngAfterViewInit();
    const googleSignInBtnElement = compiled.querySelector('#google-sign-in-btn') as HTMLElement;
    expect(googleSignInBtnElement).toBeTruthy();
    expect(renderButtonSpy).toHaveBeenCalledWith(googleSignInBtnElement);
  });

  it('should not render google sign in button when it is business portal', () => {
    activatedRoute.snapshot.params['portal'] = AccountType.business;
    fixture.detectChanges();
    component.ngAfterViewInit();
    const googleSignInBtnElement = compiled.querySelector('#google-sign-in-btn') as HTMLElement;
    expect(googleSignInBtnElement).toBeFalsy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStepVerifyComponent } from './organization-step-verify.component';

describe('OrganizationStepVerifyComponent', () => {
  let component: OrganizationStepVerifyComponent;
  let fixture: ComponentFixture<OrganizationStepVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationStepVerifyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationStepVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

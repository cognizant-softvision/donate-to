import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStepAddressComponent } from './organization-step-address.component';

describe('OrganizationStepAddressComponent', () => {
  let component: OrganizationStepAddressComponent;
  let fixture: ComponentFixture<OrganizationStepAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationStepAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationStepAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

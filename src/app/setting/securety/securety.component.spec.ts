import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuretyComponent } from './securety.component';

describe('SecuretyComponent', () => {
  let component: SecuretyComponent;
  let fixture: ComponentFixture<SecuretyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuretyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

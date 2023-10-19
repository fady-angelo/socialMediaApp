import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReguestsComponent } from './reguests.component';

describe('ReguestsComponent', () => {
  let component: ReguestsComponent;
  let fixture: ComponentFixture<ReguestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReguestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReguestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

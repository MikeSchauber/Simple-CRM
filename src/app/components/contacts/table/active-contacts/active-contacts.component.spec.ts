import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveContactsComponent } from './active-contacts.component';

describe('ActiveContactsComponent', () => {
  let component: ActiveContactsComponent;
  let fixture: ComponentFixture<ActiveContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveContactsComponent } from './inactive-contacts.component';

describe('InactiveContactsComponent', () => {
  let component: InactiveContactsComponent;
  let fixture: ComponentFixture<InactiveContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactiveContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

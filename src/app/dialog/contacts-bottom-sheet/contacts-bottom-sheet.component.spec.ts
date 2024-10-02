import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsBottomSheetComponent } from './contacts-bottom-sheet.component';

describe('ContactsBottomSheetComponent', () => {
  let component: ContactsBottomSheetComponent;
  let fixture: ComponentFixture<ContactsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

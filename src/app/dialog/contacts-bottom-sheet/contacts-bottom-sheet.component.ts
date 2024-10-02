import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { TableComponent } from '../../components/contacts/table/table.component';

@Component({
  selector: 'app-contacts-bottom-sheet',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './contacts-bottom-sheet.component.html',
  styleUrl: './contacts-bottom-sheet.component.scss',
})
export class ContactsBottomSheetComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<ContactsBottomSheetComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    event.preventDefault();
    this._bottomSheetRef.dismiss();
  }
}

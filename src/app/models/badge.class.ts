
import { ContactInterface } from "../interfaces/contact-interface";
import { Dropdown } from "../interfaces/dropdown";

export class Badge {
    badgeType: string = '';
    status: string = '';
    badgeName: string = '';
    badgeColor: string = '';

    constructor(category: string, contact: ContactInterface, dropdown: Dropdown) {
        this.badgeType = category;
        this.status = contact.status;
        this.badgeName = dropdown.name;
        this.badgeColor = dropdown.color;
    }

    public toJson() {
        return {
            badgeType: this.badgeType,
            status: this.status,
            badgeName: this.badgeName,
            badgeColor: this.badgeColor,
        }
    }
}
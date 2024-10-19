
import { ContactInterface } from "../interfaces/contact-interface";
import { Dropdown } from "../interfaces/dropdown";

export class Badge {

    name: string = '';
    color: string = '';
    used: boolean = false;

    constructor(dropdown: Dropdown) {
        this.name = dropdown.name;
        this.color = dropdown.color;
        this.used = true;
    }

    public toJson() {
        return {
            name: this.name,
            color: this.color,
            used: this.used,
        }
    }
}
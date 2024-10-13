import { Dropdown } from "./dropdown";

export interface ColumnInterface {
    name: string,
    type: string,
    icon: string,
    color: string,
    availableDropdowns: Dropdown[],
}

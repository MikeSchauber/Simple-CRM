import { Dropdown } from "./dropdown";

export interface ColumnInterface {
    name: string,
    type: string,
    index: number,
    id: string,
    columnId: string,
    icon: string,
    color: string,
    used: boolean,
    activeDropdown: Dropdown,
    availableDropdowns: Dropdown[],
}

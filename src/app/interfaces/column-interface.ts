import { Dropdown } from "./dropdown";

export interface ColumnInterface {
    name: string,
    type: string,
    index: number,
    icon: string,
    color: string,
    availableDropdowns: Dropdown[],
}

import { Dropdown } from "./dropdown";

export interface CellInterface {
    name: string,
    type: string,
    index: number,
    id: string,
    columnId: string,
    icon: string,
    color: string,
    availableDropdowns: Dropdown[],
}

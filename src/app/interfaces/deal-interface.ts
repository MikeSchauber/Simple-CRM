
import { BadgeInterface } from "./badge-interface";

export interface DealInterface {
    id: string;
    checked: boolean;
    name: string;
    phaseBadge: BadgeInterface;
    dealValue: number;
    responsible: string;
    closingDate: string;
    timestamp: number;
}

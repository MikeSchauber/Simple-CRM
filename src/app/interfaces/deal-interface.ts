
import { BadgeInterface } from "./badge-interface";

export interface DealInterface {
    id: string;
    checked: boolean;
    name: string;
    phaseBadge: BadgeInterface;
    dealValue: string;
    responsible: string;
    closingDate: string;
    timestamp: number;
}

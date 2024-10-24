
import { BadgeInterface } from "./badge-interface";

export interface DealInterface {
    id: string;
    checked: boolean;
    name: string;
    phaseBadge: BadgeInterface;
    dealValue: number;
    responsibleBadge: BadgeInterface;
    closingDate: string;
    euNormDate: string;
    dateAsTimestamp: number
    timestamp: number;
}

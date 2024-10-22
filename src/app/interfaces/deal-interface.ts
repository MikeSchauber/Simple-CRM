import { Badge } from "../models/badge.class";

export interface DealInterface {
    id: string;
    checked: boolean;
    name: string;
    phaseBadge: Badge;
    dealValue: string;
    responsible: string;
    closingDate: string;
    timestamp: number;
}

export interface ContactInterface {
  emailEdit: boolean;
  telEdit: boolean;
  id: string;
  checked: boolean;
  status: string;
  name: string;
  tel: string;
  email: string;
  visibleEmail: string;
  emailHovered: boolean;
  telHovered: boolean;
  timestamp: number;
  priorityBadge: {
    name: string;
    color: string;
    used: boolean;
  },
  statusBadge: {
    name: string;
    color: string;
    used: boolean;
  },
  roleBadge: {
    name: string;
    color: string;
    used: boolean;
  }
}

import { Intention } from '@prisma/client';
export declare function createIntention(data: Omit<Intention, 'id' | 'createdAt'>): Promise<{
    id: number;
    public_id: string;
    business_name: string;
    email: string;
    reason_participation: string;
    is_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
}>;
export declare function getIntentions(): Promise<{
    id: number;
    public_id: string;
    business_name: string;
    email: string;
    reason_participation: string;
    is_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
}[]>;
export declare function getIntentionById(public_id: string): Promise<{
    id: number;
    public_id: string;
    business_name: string;
    email: string;
    reason_participation: string;
    is_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
} | null>;
export declare function updateIntention(public_id: string, data: Partial<Intention>): Promise<{
    id: number;
    public_id: string;
    business_name: string;
    email: string;
    reason_participation: string;
    is_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
}>;
export declare function deleteIntention(public_id: string): Promise<{
    id: number;
    public_id: string;
    business_name: string;
    email: string;
    reason_participation: string;
    is_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
}>;
//# sourceMappingURL=intentionService.d.ts.map
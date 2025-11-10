import { Member } from '@prisma/client';
export declare function createMember(data: Omit<Member, 'id' | 'public_id' | 'created_at' | 'updated_at'>): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    intention_id: number;
    is_active: boolean;
    phone: string;
    token: boolean;
}>;
export declare function getMembers(): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    intention_id: number;
    is_active: boolean;
    phone: string;
    token: boolean;
}[]>;
export declare function getMemberById(public_id: string): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    intention_id: number;
    is_active: boolean;
    phone: string;
    token: boolean;
} | null>;
export declare function updateMember(public_id: string, data: Partial<Member>): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    intention_id: number;
    is_active: boolean;
    phone: string;
    token: boolean;
}>;
export declare function deleteMember(public_id: string): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    intention_id: number;
    is_active: boolean;
    phone: string;
    token: boolean;
}>;
//# sourceMappingURL=memberService.d.ts.map
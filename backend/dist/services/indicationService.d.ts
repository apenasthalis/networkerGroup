import { Indication } from '@prisma/client';
export declare function createIndication(data: Omit<Indication, 'id' | 'public_id' | 'created_at' | 'updated_at'>): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    origin_member_id: number;
    target_member_id: number;
    description: string;
    status: import(".prisma/client").$Enums.Status;
}>;
export declare function getIndications(): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    origin_member_id: number;
    target_member_id: number;
    description: string;
    status: import(".prisma/client").$Enums.Status;
}[]>;
export declare function getIndicationById(public_id: string): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    origin_member_id: number;
    target_member_id: number;
    description: string;
    status: import(".prisma/client").$Enums.Status;
} | null>;
export declare function updateIndication(public_id: string, data: Partial<Indication>): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    origin_member_id: number;
    target_member_id: number;
    description: string;
    status: import(".prisma/client").$Enums.Status;
}>;
export declare function deleteIndication(public_id: string): Promise<{
    id: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    origin_member_id: number;
    target_member_id: number;
    description: string;
    status: import(".prisma/client").$Enums.Status;
}>;
//# sourceMappingURL=indicationService.d.ts.map
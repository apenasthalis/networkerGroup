import { Admin } from '@prisma/client';
export declare function createAdmin(data: Omit<Admin, 'id' | 'public_id' | 'created_at' | 'updated_at'>): Promise<{
    name: string;
    id: number;
    public_id: string;
    email: string;
    password: string;
}>;
export declare function getAdmins(): Promise<{
    name: string;
    id: number;
    public_id: string;
    email: string;
    password: string;
}[]>;
export declare function getAdminById(public_id: string): Promise<{
    name: string;
    id: number;
    public_id: string;
    email: string;
    password: string;
} | null>;
export declare function updateAdmin(public_id: string, data: Partial<Admin>): Promise<{
    name: string;
    id: number;
    public_id: string;
    email: string;
    password: string;
}>;
export declare function deleteAdmin(public_id: string): Promise<{
    name: string;
    id: number;
    public_id: string;
    email: string;
    password: string;
}>;
//# sourceMappingURL=adminService.d.ts.map
export interface PermissionGuard{
    roles?: string[];
    except?: string[];
    redirectTo?: string | Function;
}

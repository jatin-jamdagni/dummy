"use client"

import { FormError } from "@/components/form-error"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Role } from "@prisma/client"

interface RoleGateProps {
    children: React.ReactNode,
    allowedRole: Role
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {

    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You dono have permission to view this Content!" />
        )
    }

    return (
        <>
            {children}
        </>
    )


}
// Definimos los roles exactos que te devuelve NestJS
export type AppRole = 'admin' | 'vendedor' | 'almacen'| 'super_admin';

export interface MenuItem {
    name: string;
    path: string;
    icon: string; // Para meterle íconos al sidebar después
    allowedRoles: AppRole[];
}

// 🛡️ MATRIZ DE RUTAS
// Aquí decides quién ve qué en el menú lateral
export const SIDEBAR_MENU: MenuItem[] = [
    {
        name: 'Centro de Mando',
        path: '/dashboard/analytics',
        icon: '⌘',
        allowedRoles: ['super_admin','admin', 'vendedor', 'almacen'] // Todos entran aquí
    },
    {
        name: 'transacciones',
        path: '/dashboard/transactions',
        icon: '📊',
        allowedRoles: ['super_admin','admin']
    },
    {
        name: 'Personal',
        path: '/dashboard/team',
        icon: '👥',
        allowedRoles: ['super_admin','admin'] // Todos entran aquí
    },
    {
        name: 'Terminal POS',
        path: '/dashboard/pos',
        icon: '💳',
        allowedRoles: ['super_admin','admin', 'vendedor'] // Almacén no toca la caja
    },
    {
        name: 'Inventario',
        path: '/dashboard/inventory',
        icon: '📦',
        allowedRoles: ['super_admin','admin', 'almacen'] // vendedor no edita inventario
    },
    {
        name: 'Negocios',
        path: '/dashboard/superadmin',
        icon: '🗄️',
        allowedRoles: ['super_admin'] // vendedor no edita inventario
    },
    {
        name: 'Tickets',
        path: '/ticket',
        icon: '🧾',
        allowedRoles: ['super_admin','admin', 'vendedor','almacen']
    },
    {
        name: 'Movimientos',
        path: '/dashboard/pos/movements',
        icon: '🔄',
        allowedRoles: ['admin'] // Solo el dueño autoriza esto
    },
    {
        name: 'Radar',
        path: '/dashboard/radar',
        icon: '📖',
        allowedRoles: ['admin','vendedor'] // Solo el dueño autoriza esto
    },
];
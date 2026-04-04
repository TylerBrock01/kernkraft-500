// Definimos los roles exactos que te devuelve NestJS
export type AppRole = 'admin' | 'vendedor' | 'almacen';

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
        path: '/dashboard',
        icon: '⌘',
        allowedRoles: ['admin', 'vendedor', 'almacen'] // Todos entran aquí
    },
    {
        name: 'Terminal POS',
        path: '/pos',
        icon: '💳',
        allowedRoles: ['admin', 'vendedor'] // Almacén no toca la caja
    },
    {
        name: 'Inventario',
        path: '/dashboard/inventory',
        icon: '📦',
        allowedRoles: ['admin', 'almacen'] // vendedor no edita inventario
    },
    {
        name: 'Cortes de Caja',
        path: '/dashboard/registers',
        icon: '🧾',
        allowedRoles: ['admin', 'vendedor']
    },
    {
        name: 'Devoluciones',
        path: '/dashboard/returns',
        icon: '🔄',
        allowedRoles: ['admin'] // Solo el dueño autoriza esto
    },
];
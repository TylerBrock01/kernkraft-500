import { useState, useEffect, useMemo } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import { PaymentMethod, TransactionType } from '@/app/types';

interface CartItem {
    product: any;
    quantity: number;
}

export function useTerminal() {
    // -------------------------------------------------------------
    // 1. ESTADOS DE INVENTARIO Y BÚSQUEDA
    // -------------------------------------------------------------
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    // -------------------------------------------------------------
    // 2. ESTADOS DE CLIENTES
    // -------------------------------------------------------------
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [customerSearch, setCustomerSearch] = useState('');
    const [customerResults, setCustomerResults] = useState<any[]>([]);
    const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);

    // -------------------------------------------------------------
    // 3. ESTADOS DEL TICKET (CARRITO) Y COBRO
    // -------------------------------------------------------------
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
    const [transactionType, setTransactionType] = useState<TransactionType>('SALE');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [returnDate, setReturnDate] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    // -------------------------------------------------------------
    // RADAR DE INVENTARIO (Efecto)
    // -------------------------------------------------------------
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/products', { params: { take: 50, search: searchTerm } });
                setProducts(response.data.products || response.data || []);
            } catch (error) {
                toast.error('Error al cargar inventario');
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => { fetchProducts(); }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, refreshKey]);

    // -------------------------------------------------------------
    // RADAR DE CLIENTES (Efecto)
    // -------------------------------------------------------------
    useEffect(() => {
        const searchCustomers = async () => {
            if (customerSearch.length < 2) {
                setCustomerResults([]);
                return;
            }
            try {
                const response = await api.get('/customers', { params: { search: customerSearch, take: 5 } });
                setCustomerResults(response.data.customers || response.data || []);
            } catch (error) {
                console.error('Error buscando clientes', error);
            }
        };

        const delayDebounceFn = setTimeout(() => { searchCustomers(); }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [customerSearch]);

    // -------------------------------------------------------------
    // LÓGICA DE CONTROL DE CARRITO
    // -------------------------------------------------------------
    const addToCart = (product: any) => {
        if (product.stock <= 0) {
            toast.error('Producto sin stock disponible');
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    toast.error('Límite de stock alcanzado');
                    return prev;
                }
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId) {
                const newQuantity = item.quantity + delta;
                if (newQuantity <= 0) return item;
                if (newQuantity > item.product.stock) {
                    toast.error('Stock máximo alcanzado');
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    // -------------------------------------------------------------
    // MATEMÁTICAS FINANCIERAS
    // -------------------------------------------------------------
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0), [cart]);
    const total = transactionType === 'SALE' ? subtotal : subtotal + Number(depositAmount);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // -------------------------------------------------------------
    // PROCESAMIENTO DE TRANSACCIÓN (CHECKOUT)
    // -------------------------------------------------------------
    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.error('El carrito está vacío');
            return;
        }
        if (transactionType === 'RENTAL' && !returnDate) {
            toast.error('Debes especificar una fecha de retorno para la renta');
            return;
        }

        setIsProcessing(true);
        const toastId = toast.loading('Procesando pago...');

        try {
            const payload = {
                customerId: selectedCustomer ? selectedCustomer.id : null,
                type: transactionType,
                paymentMethod,
                total,
                depositAmount: transactionType === 'RENTAL' ? Number(depositAmount) : 0,
                returnDate: transactionType === 'RENTAL' ? new Date(returnDate).toISOString() : null,
                contents: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            };

            await api.post('/transactions', payload);
            setRefreshKey(prev => prev + 1);
            toast.success('Transacción completada', { id: toastId });

            setCart([]);
            setDepositAmount(0);
            setReturnDate('');
            setTransactionType('SALE');
            setIsMobileCartOpen(false); // Cierra el cajón en celular al cobrar
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error en la transacción', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    // Devolvemos el "API" local para que la vista lo consuma
    return {
        // Inventario
        products, isLoading, searchTerm, setSearchTerm,
        // Clientes
        selectedCustomer, setSelectedCustomer, customerSearch, setCustomerSearch,
        customerResults, setCustomerResults, isCustomerDrawerOpen, setIsCustomerDrawerOpen,
        // Carrito y Finanzas
        cart, addToCart, updateQuantity, removeFromCart, subtotal, total, totalItems,
        isMobileCartOpen, setIsMobileCartOpen, transactionType, setTransactionType,
        paymentMethod, setPaymentMethod, depositAmount, setDepositAmount, returnDate, setReturnDate,
        // Acciones
        isProcessing, handleCheckout
    };
}
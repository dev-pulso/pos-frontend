import type { Product, Sale, InventoryMovement, CashRegister, Category } from "./types"

const STORAGE_KEYS = {
    PRODUCTS: "pos_products",
    SALES: "pos_sales",
    INVENTORY: "pos_inventory",
    CASH_REGISTER: "pos_cash_register",
    CATEGORIES: "pos_categories",
}

function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
}

function saveToStorage<T>(key: string, data: T): void {
    if (typeof window === "undefined") return
    localStorage.setItem(key, JSON.stringify(data))
}

// Products
export function getProducts(): Product[] {
    return getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])
}

export function saveProduct(product: Product): void {
    const products = getProducts()
    const index = products.findIndex((p) => p.id === product.id)
    if (index >= 0) {
        products[index] = { ...product, updatedAt: new Date().toISOString() }
    } else {
        products.push(product)
    }
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
}

export function deleteProduct(id: string): void {
    const products = getProducts().filter((p) => p.id !== id)
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
}

export function updateProductStock(id: string, quantity: number): void {
    const products = getProducts()
    const index = products.findIndex((p) => p.id === id)
    if (index >= 0) {
        products[index].stock += quantity
        products[index].updatedAt = new Date().toISOString()
        saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    }
}

// Sales
export function getSales(): Sale[] {
    return getFromStorage<Sale[]>(STORAGE_KEYS.SALES, [])
}

export function saveSale(sale: Sale): void {
    const sales = getSales()
    sales.push(sale)
    saveToStorage(STORAGE_KEYS.SALES, sales)

    // Update product stock
    sale.items.forEach((item) => {
        updateProductStock(item.productId, -item.quantity)
    })
}

export function getSalesByDateRange(startDate: Date, endDate: Date): Sale[] {
    return getSales().filter((sale) => {
        const saleDate = new Date(sale.createdAt)
        return saleDate >= startDate && saleDate <= endDate
    })
}

// Inventory Movements
export function getInventoryMovements(): InventoryMovement[] {
    return getFromStorage<InventoryMovement[]>(STORAGE_KEYS.INVENTORY, [])
}

export function saveInventoryMovement(movement: InventoryMovement): void {
    const movements = getInventoryMovements()
    movements.push(movement)
    saveToStorage(STORAGE_KEYS.INVENTORY, movements)

    // Update product stock based on movement type
    const quantityChange = movement.type === "entry" ? movement.quantity : -movement.quantity
    updateProductStock(movement.productId, quantityChange)
}

// Cash Register
export function getCashRegister(): CashRegister | null {
    return getFromStorage<CashRegister | null>(STORAGE_KEYS.CASH_REGISTER, null)
}

export function saveCashRegister(register: CashRegister): void {
    saveToStorage(STORAGE_KEYS.CASH_REGISTER, register)
}

export function openCashRegister(openingAmount: number): CashRegister {
    const register: CashRegister = {
        id: crypto.randomUUID(),
        openingAmount,
        currentBalance: openingAmount,
        isOpen: true,
        openedAt: new Date().toISOString(),
        movements: [
            {
                id: crypto.randomUUID(),
                type: "opening",
                amount: openingAmount,
                description: "Apertura de caja",
                balance: openingAmount,
                createdAt: new Date().toISOString(),
            },
        ],
    }
    saveCashRegister(register)
    return register
}

export function addCashMovement(type: CashRegister["movements"][0]["type"], amount: number, description: string): void {
    const register = getCashRegister()
    if (!register || !register.isOpen) return

    const newBalance =
        type === "expense" || type === "withdrawal" ? register.currentBalance - amount : register.currentBalance + amount

    register.movements.push({
        id: crypto.randomUUID(),
        type,
        amount,
        description,
        balance: newBalance,
        createdAt: new Date().toISOString(),
    })
    register.currentBalance = newBalance
    saveCashRegister(register)
}

export function closeCashRegister(): void {
    const register = getCashRegister()
    if (!register) return

    register.isOpen = false
    register.closedAt = new Date().toISOString()
    register.movements.push({
        id: crypto.randomUUID(),
        type: "closing",
        amount: register.currentBalance,
        description: "Cierre de caja",
        balance: register.currentBalance,
        createdAt: new Date().toISOString(),
    })
    saveCashRegister(register)
}

// Categories
export function getCategories(): Category[] {
    return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, [
        { id: "1", name: "Alimentos" },
        { id: "2", name: "Bebidas" },
        { id: "3", name: "Electrónicos" },
        { id: "4", name: "Hogar" },
        { id: "5", name: "Otros" },
    ])
}

export function saveCategory(category: Category): void {
    const categories = getCategories()
    const index = categories.findIndex((c) => c.id === category.id)
    if (index >= 0) {
        categories[index] = category
    } else {
        categories.push(category)
    }
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
}

export function deleteCategory(id: string): void {
    const categories = getCategories().filter((c) => c.id !== id)
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
}

// Analytics helpers
export function getTodaySales(): Sale[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return getSalesByDateRange(today, tomorrow)
}

export function getMonthSales(): Sale[] {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
    return getSalesByDateRange(startOfMonth, endOfMonth)
}

export function calculateProfit(sales: Sale[]): { revenue: number; cost: number; profit: number } {
    const revenue = sales.reduce((sum, sale) => sum + sale.total, 0)
    const cost = sales.reduce(
        (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.cost * item.quantity, 0),
        0,
    )
    return { revenue, cost, profit: revenue - cost }
}

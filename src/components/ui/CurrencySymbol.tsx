// Добавь это перед компонентом CabinetPage
export const CurrencySymbol = (currencyName: string) => {
    const symbols: Record<string, string> = {
        'Доллар': '$',
        'Тенге': '₸',
        'Евро': '€',
        'Рубль': '₽'
    };
    return symbols[currencyName] || currencyName;
};
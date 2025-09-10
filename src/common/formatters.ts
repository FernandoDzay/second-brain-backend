import { format, isValid, parse } from 'date-fns';

export const dateToString = (date: Date) => format(date, 'y-MM-dd');

export const dateTimeToString = (date: Date) => format(date, 'y-MM-dd HH:mm:ss');

export const stringToDate = (value: string): Date => {
    // Intentar con fecha completa (fecha + hora)
    let parsed = parse(value, 'y-MM-dd HH:mm:ss', new Date());
    if (isValid(parsed)) {
        return parsed;
    }

    // Intentar con solo fecha
    parsed = parse(value, 'y-MM-dd', new Date());
    return parsed;
};

export const formatMoney = (
    input: number | null | undefined,
    options?: {
        withDollarSign?: boolean;
    },
): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: options?.withDollarSign ? 'currency' : 'decimal',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(input || 0);
};

export const round = (number: number, decimals?: number) => {
    return Number(number.toFixed(decimals || 2));
};

import z from 'zod';

export const zodAppBoolean = z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
}, z.coerce.boolean());

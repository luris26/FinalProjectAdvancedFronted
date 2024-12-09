import { calculateTotal } from '../utils/calculateTotal';

describe('calculateTotal', () => {
  it('debería calcular correctamente el total de precios', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    const result = calculateTotal(items);
    expect(result).toBe(35);
  });

  it('debería devolver 0 si no hay ítems', () => {
    const items: [] = [];
    const result = calculateTotal(items);
    expect(result).toBe(0);
  });
});

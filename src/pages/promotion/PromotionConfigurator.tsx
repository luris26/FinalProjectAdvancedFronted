import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';
import NumberInput from '../../components/NumberInput';

interface Promotion {
  id: number;
  name: string;
  category: string;
  discount: number;
  startDate: string;
  endDate: string;
}

const PromotionConfigurator: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [formData, setFormData] = useState<Promotion>({
    id: 0,
    name: '',
    category: '',
    discount: 0,
    startDate: '',
    endDate: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'discount' ? parseFloat(value) : value,
    });
  };

  const handleAddPromotion = () => {
    setPromotions([...promotions, { ...formData, id: Date.now() }]);
    setFormData({ id: 0, name: '', category: '', discount: 0, startDate: '', endDate: '' });
  };

  const handleEditPromotion = (id: number) => {
    const promoToEdit = promotions.find((promo) => promo.id === id);
    if (promoToEdit) {
      setFormData(promoToEdit);
      setIsEditing(true);
    }
  };

  const handleUpdatePromotion = () => {
    setPromotions(
      promotions.map((promo) => (promo.id === formData.id ? formData : promo))
    );
    setFormData({ id: 0, name: '', category: '', discount: 0, startDate: '', endDate: '' });
    setIsEditing(false);
  };

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Configurar Promociones</h1>

      <form>
        <TextInput
          label="Nombre de la Promoción"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Descuento del 10% en Pupusas"
          required
        />
        <SelectInput
          label="Categoría"
          name="category"
          value={formData.category}
          options={[
            { value: 'pupusas', label: 'Pupusas' },
            { value: 'bebidas', label: 'Bebidas' },
            { value: 'combos', label: 'Combos' },
          ]}
          onChange={handleChange}
          required
        />
        <NumberInput
          label="Descuento (%)"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Ej: 10"
          min={0}
          max={100}
          required
        />
        <TextInput
          label="Fecha de Inicio"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          required
        />
        <TextInput
          label="Fecha de Fin"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          required
        />

        <button
          type="button"
          onClick={isEditing ? handleUpdatePromotion : handleAddPromotion}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {isEditing ? 'Actualizar Promoción' : 'Agregar Promoción'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Lista de Promociones</h2>
      <ul className="mt-4">
        {promotions.length === 0 ? (
          <p>No hay promociones configuradas.</p>
        ) : (
          promotions.map((promo) => (
            <li
              key={promo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {promo.name} - {promo.category} - {promo.discount}% - De {promo.startDate} a{' '}
                {promo.endDate}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPromotion(promo.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeletePromotion(promo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PromotionConfigurator;

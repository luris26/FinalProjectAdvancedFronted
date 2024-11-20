import { useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
}: UseFormProps<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  return {
    formValues,
    setFormValues,
    handleChange,
  };
};
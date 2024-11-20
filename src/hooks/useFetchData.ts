import { useEffect, useState } from "react";

export const useFetchData = <T>(
    fetchFunction: (token: string) => Promise<T[]>,
    id: string | undefined,
    token: string
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token || !id) return;
        setLoading(true);
        try {
          const items = await fetchFunction(token);
          const selectedItem = items.find((item: any) => item.menuId === parseInt(id));
          if (selectedItem) {
            setData(selectedItem);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id, token, fetchFunction]);
  
    return { data, loading };
  };
  

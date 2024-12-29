import React, { useEffect, useState } from "react";
import { fetchTables } from "../../hooks/tableHook";
import { Table } from "../../data/Table";

export const TableView: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTables = async () => {
      try {
        const data = await fetchTables();
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTables();
  }, []);

  if (loading) return <p>Loading tables...</p>;

  return (
    <div>
      <h1>Visualización de Mesas</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {tables.map((table) => (
          <div
            key={table.tableId}
            className={`p-4 rounded-lg shadow-md ${table.status === "disponible"
                ? "bg-green-100 text-green-800"
                : table.status === "pendiente"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            <h3 className="text-lg font-bold">Mesa #{table.number}</h3>
            <p className="text-sm">Estado: {table.status}</p>
            <p className="text-sm">Capacidad: {table.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;

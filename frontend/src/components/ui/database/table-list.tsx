import { useState } from 'react';
import { Button } from '../button';

interface TableListProps {
  tables: string[];
  onSelectTable: (tableName: string) => void;
}

export function TableList({ tables, onSelectTable }: TableListProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleSelectTable = (tableName: string) => {
    setSelectedTable(tableName);
    onSelectTable(tableName);
  };

  return (
    <div className="space-y-1">
      <h3 className="font-medium mb-2">Database Tables</h3>
      {tables.length === 0 ? (
        <p className="text-sm text-gray-500">No tables found</p>
      ) : (
        <ul className="space-y-1">
          {tables.map((table) => (
            <li key={table}>
              <Button
                className={`w-full text-left px-2 py-1 rounded text-sm ${
                  selectedTable === table
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelectTable(table)}
              >
                {table}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

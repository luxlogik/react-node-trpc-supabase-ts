import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase';

interface TableViewProps {
  tableName: string;
}

export function TableView({ tableName }: TableViewProps) {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTableData() {
      setLoading(true);

      // Fetch table data
      try {
        const { data } = await supabaseClient
          .from(tableName)
          .select('*')
          .limit(100);
        if (data) {
          setData(data);
          if (data.length > 0) {
            setColumns(Object.keys(data[0]));
          }
        }
      } catch (error) {
        console.info('Error fetching table data:', error);
      }

      setLoading(false);
    }

    fetchTableData();
  }, [tableName]);

  if (loading) {
    return <div className="flex justify-center p-4">Loading table data...</div>;
  }

  return (
    <div className="overflow-auto">
      <h2 className="text-xl font-semibold mb-4">{tableName}</h2>
      {data.length === 0 ? (
        <p>No data found in this table</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column} className="border px-4 py-2 text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column} className="border px-4 py-2">
                    {JSON.stringify(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

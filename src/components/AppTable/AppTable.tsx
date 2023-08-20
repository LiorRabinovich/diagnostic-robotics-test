import React from 'react';

interface AppTableProps {
    columns: AppTableColumn[];
    data: any[];
}

const AppTable: React.FC<AppTableProps> = React.memo(({ columns, data }) => {
    return (
        <table className="drugs-prescription-table w-full">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            className="text-left h-12 bg-blue-100 px-2"
                            key={column.key}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map(({ key, render: RenderComponent }) => (
                            <td key={`${item.id}-${key}`} className="bg-gray-100 h-20 px-2">
                                {RenderComponent ? <RenderComponent data={item} /> : item[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default AppTable;

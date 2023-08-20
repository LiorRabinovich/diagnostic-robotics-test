import React, { useState, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

interface AppComboBoxProps {
    searchTerm: string;
    loading: boolean;
    items: string[];
    setSearchTerm: (term: string) => void;
    onSearch: (term: string) => void;
    onSelect: (index: number) => void;
};

const AppComboBox: React.FC<AppComboBoxProps> = React.memo(({
    searchTerm, loading = false, items = [],
    setSearchTerm, onSearch, onSelect,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const shouldDisplayBox = isOpen && searchTerm;

    useClickOutside(containerRef, () => {
        setIsOpen(false);
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    }

    function handleSelect(item: string, index: number) {
        onSelect(index)
        setSearchTerm(item);
        setIsOpen(false);
    }

    function handleOpenComboBox() {
        setIsOpen(true);
        onSearch(searchTerm);
    }

    const renderDropdownContent = () => {
        if (loading) return <div>Loading...</div>;
        if (searchTerm && items.length === 0) return <div>Not Found</div>;

        return (
            <ul>
                {items.map((item, index) => (
                    <li
                        key={`item-${index}`}
                        className="p-2 bg-gray-50 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelect(item, index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )
    };

    return (
        <div className="relative flex-1" ref={containerRef}>
            <input
                className="border p-2 w-full rounded"
                placeholder="Search..."
                value={searchTerm}
                onClick={handleOpenComboBox}
                onChange={handleInputChange}
            />
            {shouldDisplayBox && (
                <div className="absolute bg-white border w-full overflow-auto h-56 z-10">
                    {renderDropdownContent()}
                </div>
            )}
        </div>
    );
});

export default AppComboBox;
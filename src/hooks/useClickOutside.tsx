import { useEffect } from 'react';

function useClickOutside<T extends HTMLElement = HTMLDivElement>(
    ref: React.RefObject<T>,
    callback: (event: Event) => void
): void {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

export default useClickOutside;

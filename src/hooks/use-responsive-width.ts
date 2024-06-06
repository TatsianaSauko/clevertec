import { useEffect, useState } from 'react';

export function useResponsiveWidth(minWidth: number, maxWidth: number) {
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? minWidth : maxWidth);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? minWidth : maxWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [minWidth, maxWidth]);

    return modalWidth;
}

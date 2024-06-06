import { useEffect, useState } from 'react';

export function useResponsiveVisibility(defaultVisibility: boolean) {
    const [modalVisible, setModalVisible] = useState(defaultVisibility);

    useEffect(() => {
        const handleResize = () => {
            const isVisible = !(window.innerWidth < 576);

            setModalVisible(isVisible);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [defaultVisibility]);

    return modalVisible;
}

export function useResponsiveVisibility900(defaultVisibility: boolean) {
    const [modalVisible, setModalVisible] = useState(defaultVisibility);

    useEffect(() => {
        const handleResize = () => {
            const isVisible = !(window.innerWidth < 900);

            setModalVisible(isVisible);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [defaultVisibility]);

    return modalVisible;
}

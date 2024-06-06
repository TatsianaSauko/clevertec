export const getTagStyle = (tagName: string, selectedTags: string) => ({
    backgroundColor: tagName === selectedTags ? 'var(--primary-light-1)' : 'var(--neutral-gray-1)',
    color:
        tagName === selectedTags ? 'var(--primary-light-6)' : 'var(--character-light-primary-85)',
    border:
        tagName === selectedTags
            ? '1px solid var(--primary-light-3)'
            : '1px solid var(--character-light-dividers)',
});

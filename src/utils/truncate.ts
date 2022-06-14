export const truncate = (
    text: string,
    lengthToTruncate: number,
    separator: string = '...'
) => {
    if (!text) {
        return '';
    }
    if (text.length <= lengthToTruncate) return text;
    const charsToShow = lengthToTruncate - separator.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return (
        text.substr(0, frontChars) +
        separator +
        text.substr(text.length - backChars)
    );
};

export const truncateEmail = (email: string, length: number) => {
    const splitEmail = email.split('@');
    return `${truncate(splitEmail[0], length)}${
        splitEmail[1] ? `@${splitEmail[1]}` : ''
    }`;
};

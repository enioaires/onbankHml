export function replaceRange(
    str: string,
    start: number,
    end: number,
    substitute: string
) {
    return str.substring(0, start) + substitute + str.substring(end);
}


/**
 * Utils class contains utility methods for common operations.
 */
export class Utils {
    /**
     * Checks if the provided argument is empty (undefined or null).
     * @param arg The argument to check.
     * @returns A boolean indicating whether the argument is empty.
     */
    public static empty(arg: any): arg is undefined | null {
        // Return true if the argument is undefined or null, otherwise return false
        if (arg == undefined || arg === null) return true;
        return false;
    }

    /**
     * Checks if the provided argument is a non-empty array.
     * @param arg The argument to check.
     * @returns A boolean indicating whether the argument is a non-empty array.
     */
    public static isArray(arg: any): arg is [] {
        // Return false if the argument is undefined or null
        if (arg == undefined || arg === null) return false;
        // Return true if the argument is an array with at least one element
        return Array.isArray(arg) && arg.length > 0;
    }
}


export class Utils {
    public static empty(arg: any): arg is undefined | null {
        if (arg == undefined || arg === null) return true;
        return false;
    }

    public static isArray(arg: any): arg is [] {
        if (arg == undefined || arg === null) return false;
        return Array.isArray(arg) && arg.length > 0;
    }
}
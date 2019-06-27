export const fetchWrapper = (url: string, options: Object, timeout: number = 0): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(url, options).then(resolve, reject);

        if (timeout > 0) {
            const e = new Error("Connection timed out");
            setTimeout(reject, timeout, e);
        }
    });
}
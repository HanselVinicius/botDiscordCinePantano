import { AxiosInstance } from "axios";

export class ApiRequestHandler {

    constructor(private readonly axios: AxiosInstance) { }

    public async get<T>(url: string): Promise<T> {
        return this.axios.get(url).then(res => res.data);
    }

    public async getAuthenticated<T>(url: string, token: string): Promise<T> {
        return this.axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
    }


}
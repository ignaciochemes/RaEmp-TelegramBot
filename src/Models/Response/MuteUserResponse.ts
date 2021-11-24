export default class MuteUserResponse {
    id: number;
    status: boolean;
    message: string;
    
    constructor(id?: number, status?: boolean, message?: string) {
        this.id = id ? id : null;
        this.status = status ? status : null;
        this.message = message ? message : null;
    }
}
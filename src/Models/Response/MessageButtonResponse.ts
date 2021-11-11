export default class MessageButtonResponse {
    uri: string;
    buttons: object;
    
    constructor(uri?: string, buttons?: object) {
        this.uri = uri ? uri : null;
        this.buttons = buttons ? buttons : null;
    }
}
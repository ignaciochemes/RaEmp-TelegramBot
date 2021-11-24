export class UserRequestModel {
    private fromUserId: number;
    private fromUserName: string;
    private fromUserLastName: string;
    private fromUserUsername: string;
    private toUserId: number;
    private toUserFirstName: string;
    private text: string;
    private date: Date;
    private warning: boolean;
    private warningDescription: string;
    private ban: boolean;
    private banDescription: string;
    private mute: boolean;
    private muteDescription: string;

    constructor(data?: any) {
        this.fromUserId = data && data.from.id ? data.from.id : null;
        this.fromUserName = data && data.from.first_name ? data.from.first_name : null;
        this.fromUserLastName = data && data.from.last_name ? data.from.last_name : null;
        this.fromUserUsername = data && data.from.username ? data.from.username : null;
        this.toUserId = data && data.reply_to_message.from.id ? data.reply_to_message.from.id : null;
        this.toUserFirstName = data && data.reply_to_message.from.first_name ? data.reply_to_message.from.first_name : null;
        this.text = data && data.reply_to_message.text ? data.reply_to_message.text : null;
        this.date = data && data.date ? new Date(data.date * 1000) : null;
        this.warning = false;
        this.warningDescription = null;
        this.ban = false;
        this.banDescription = null;
        this.mute = false;
        this.muteDescription = null;
    }

    public getFromUserId(): number {
        return this.fromUserId;
    }

    public setFromUserId(fromUserId: number): void {
        this.fromUserId = fromUserId;
    }

    public getFromUserName(): string {
        return this.fromUserName;
    }

    public setFromUserName(fromUserName: string): void {
        this.fromUserName = fromUserName;
    }

    public getFromUserLastName(): string {
        return this.fromUserLastName;
    }

    public setFromUserLastName(fromUserLastName: string): void {
        this.fromUserLastName = fromUserLastName;
    }

    public getFromUserUsername(): string {
        return this.fromUserUsername;
    }

    public setFromUserUsername(fromUserUsername: string): void {
        this.fromUserUsername = fromUserUsername;
    }

    public getToUserId(): number {
        return this.toUserId;
    }

    public setToUserId(toUserId: number): void {
        this.toUserId = toUserId;
    }

    public getToUserFirstName(): string {
        return this.toUserFirstName;
    }

    public setToUserFirstName(toUserFirstName: string): void {
        this.toUserFirstName = toUserFirstName;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public isWarning(): boolean {
        return this.warning;
    }

    public setWarning(warning: boolean): void {
        this.warning = warning;
    }

    public getWarningDescription(): string {
        return this.warningDescription;
    }

    public setWarningDescription(warningDescription: string): void {
        this.warningDescription = warningDescription;
    }

    public isBan(): boolean {
        return this.ban;
    }

    public setBan(ban: boolean): void {
        this.ban = ban;
    }

    public getBanDescription(): string {
        return this.banDescription;
    }

    public setBanDescription(banDescription: string): void {
        this.banDescription = banDescription;
    }

    public isMute(): boolean {
        return this.mute;
    }

    public setMute(mute: boolean): void {
        this.mute = mute;
    }

    public getMuteDescription(): string {
        return this.muteDescription;
    }

    public setMuteDescription(muteDescription: string): void {
        this.muteDescription = muteDescription;
    }

    
}
import {IUpd} from "@spt/models/eft/common/tables/IItem";
import {IBarterScheme, ITrader} from "@spt/models/eft/common/tables/ITrader";

export default interface IEditableTrader {
    readonly trader: ITrader;

    add_item(itemId: string, templateId: string, loyaltyLevel: number, upd: IUpd, barterScheme: IBarterScheme[]): void;
}
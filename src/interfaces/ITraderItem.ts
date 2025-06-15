import {IItem} from "@spt/models/eft/common/tables/IItem";
import {IBarterScheme} from "@spt/models/eft/common/tables/ITrader";

export interface ITraderItem {
    item: IItem;
    barterScheme: IBarterScheme[];
    loyaltyLevel: number
}
import { IUpd } from "@spt/models/eft/common/tables/IItem";
import { ITrader, IBarterScheme } from "@spt/models/eft/common/tables/ITrader";
import IEditableTrader from "./IEditableTrader";
import {container} from "tsyringe";
import {DatabaseServer} from "@spt/servers/DatabaseServer";

export default class PraporTrader implements IEditableTrader {
    trader: ITrader;

    constructor() {
        this.trader = container
            .resolve<DatabaseServer>("DatabaseServer")
            .getTables()
            // Prapor TraderId = 54cb50c76803fa8b248b4571
            .traders["54cb50c76803fa8b248b4571"];
    }

    add_item(itemId: string, templateId: string, loyaltyLevel: number, upd: IUpd, barterScheme: IBarterScheme[]): void {
        this.trader.assort.items.push({
            "_id": itemId,
            "_tpl": templateId,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd": upd
        });

        this.trader.assort.loyal_level_items[itemId] = loyaltyLevel;
        this.trader.assort.barter_scheme[itemId] = [barterScheme];
    }
}
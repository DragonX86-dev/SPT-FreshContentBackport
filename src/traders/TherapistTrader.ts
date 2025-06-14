import {container} from "tsyringe";

import {IBarterScheme, ITrader} from "@spt/models/eft/common/tables/ITrader";
import {DatabaseServer} from "@spt/servers/DatabaseServer";
import {IUpd} from "@spt/models/eft/common/tables/IItem";
import IEditableTrader from "./IEditableTrader";

export default class TherapistTrader implements IEditableTrader {
    readonly trader: ITrader;

    constructor() {
        this.trader = container
            .resolve<DatabaseServer>("DatabaseServer")
            .getTables()
            // Therapist TraderId = 54cb57776803fa99248b456e
            .traders["54cb57776803fa99248b456e"];
    }

    public add_item(itemId: string, templateId: string, loyaltyLevel: number, upd: IUpd, barterScheme: IBarterScheme[]): void {
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
import {container} from "tsyringe";

import {DatabaseServer} from "@spt/servers/DatabaseServer";
import {ITrader} from "@spt/models/eft/common/tables/ITrader";
import {ITraderItem} from "../interfaces/ITraderItem";

export default class TraderEditor {
    readonly trader: ITrader;

    constructor(traderId: string) {
        this.trader = container
            .resolve<DatabaseServer>("DatabaseServer")
            .getTables()
            .traders[traderId];
    }

    public add_item_to_assortment(traderItem: ITraderItem): void {
        this.trader.assort.items.push(traderItem.item);
        this.trader.assort.loyal_level_items[traderItem.item._id] = traderItem.loyaltyLevel;
        this.trader.assort.barter_scheme[traderItem.item._id] = [traderItem.barterScheme];
    }
}
import {container} from "tsyringe";

import {DatabaseServer} from "@spt/servers/DatabaseServer";
import {IBarterScheme, ITrader} from "@spt/models/eft/common/tables/ITrader";

class JaegerTrader {
    readonly trader: ITrader;

    constructor() {
        this.trader = container
            .resolve<DatabaseServer>("DatabaseServer")
            .getTables()
            // Jaeger TraderId = 5c0647fdd443bc2504c2d371
            .traders["5c0647fdd443bc2504c2d371"];
    }

    public add_item(itemId: string, templateId: string, loyaltyLevel: number, barterScheme: IBarterScheme[]): void {
        this.trader.assort.items.push({
            "_id": itemId,
            "_tpl": templateId,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd": {
                "UnlimitedCount": true,
                "StackObjectsCount": 99999
            }
        });

        this.trader.assort.loyal_level_items[itemId] = loyaltyLevel;
        this.trader.assort.barter_scheme[itemId] = [barterScheme];
    }
}

export default JaegerTrader;
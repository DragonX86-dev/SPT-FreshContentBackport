import {DependencyContainer} from "tsyringe";

import {DatabaseServer} from "@spt/servers/DatabaseServer";
import {IPostDBLoadMod} from "@spt/models/external/IPostDBLoadMod";
import {IPostSptLoadMod} from "@spt/models/external/IPostSptLoadMod";
import {CustomItemService} from "@spt/services/mod/CustomItemService";
import {NewItemFromCloneDetails} from "@spt/models/spt/mod/NewItemDetails";
import {ItemTpl} from "@spt/models/enums/ItemTpl";

class FreshContentBackport implements IPostDBLoadMod, IPostSptLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();

        const itemId = "67b49e7335dec48e3e05e057";

        const f1WithReducedDelay: NewItemFromCloneDetails = {
            itemTplToClone: ItemTpl.GRENADE_F1_HAND,
            overrideProperties: {
                ExplDelay: 1.5,
            },
            parentId: "543be6564bdc2df4348b4568",
            newId: itemId,
            fleaPriceRoubles: 7300,
            handbookPriceRoubles: 7300,
            handbookParentId: "5b5f7a2386f774093f2ed3c4",
            locales: {
                en: {
                    name: "F-1 hand grenade (Reduced delay)",
                    shortName: "F-1",
                    description: "The F-1 hand grenade (GRAU Index 57-G-721) is an anti-personnel fragmentation grenade, designed for neutralizing enemy personnel in defensive combat. This version is personally modified by Partisan and has a shortened fuze, intended for explosive tripwires.",
                },
                ru: {
                    name: "Ручная граната Ф-1 с сокращенным замедлителем",
                    shortName: "Ф-1",
                    description: "Ф-1 — ручная противопехотная граната. Эта версия модифицирована лично Партизаном и имеет сокращенный замедлитель. Предназначается для использования в растяжках.",
                }
            }
        };

        customItem.createItemFromClone(f1WithReducedDelay);

        const traders = tables.traders["5c0647fdd443bc2504c2d371"];

        traders.assort.items.push({
            "_id": "6812400c0c5cf2cf75075f94",
            "_tpl": itemId,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd": {
                "UnlimitedCount": true,
                "StackObjectsCount": 99999
            }
        });

        traders.assort.barter_scheme[itemId] = [
            [
                {
                    "count": 11498,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        ];

        traders.assort.loyal_level_items[itemId] = 1;
    }

    public postSptLoad(container: DependencyContainer): void {

    }
}

export const mod = new FreshContentBackport();
import {container, DependencyContainer} from "tsyringe";

import {ItemTpl} from "@spt/models/enums/ItemTpl";
import {IPostDBLoadMod} from "@spt/models/external/IPostDBLoadMod";
import {IPostSptLoadMod} from "@spt/models/external/IPostSptLoadMod";

import JaegerTrader from "./traders/JaegerTrader";
import {ItemCreater} from "./items/ItemCreater";
import {QuestEditor} from "./quests/QuestEditor";


class FreshContentBackport implements IPostDBLoadMod, IPostSptLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        const itemCreater = new ItemCreater();
        const jaegerTrader = new JaegerTrader();
        const grenadierQuest = new QuestEditor("5c0d190cd09282029f5390d8");

        const f1WithReducedDelayId = itemCreater.create_item_from_clone({
            itemId: "67b49e7335dec48e3e05e057",
            itemTplToClone: ItemTpl.GRENADE_F1_HAND,
            parentId: "543be6564bdc2df4348b4568",
            handbookParentId: "5b5f7a2386f774093f2ed3c4",
            overrideProperties: {
                explDelay: 1.5,
            },
            price: 7300,
            locales: {
                en: {
                    name: "F-1 hand grenade (Reduced delay)",
                    shortName: "F-1",
                    description: "The F-1 hand grenade (GRAU Index 57-G-721) is an anti-personnel fragmentation grenade, designed for neutralizing enemy personnel in defensive combat. This version is personally modified by Partisan and has a shortened fuze, intended for explosive tripwires.",
                },
                ru: {
                    name: "Ручная граната Ф-1 с сокращенным замедлителем",
                    shortName: "Ф-1СЗ",
                    description: "Ф-1 — ручная противопехотная граната. Эта версия модифицирована лично Партизаном и имеет сокращенный замедлитель. Предназначается для использования в растяжках.",
                }
            }
        });

        jaegerTrader.add_item(
            "6812400c0c5cf2cf75075f94",
            f1WithReducedDelayId,
            1,
            [
                {
                    "count": 11498,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        )

        grenadierQuest.edit_quest_counter_creator_condition(
            "AvailableForFinish",
            0,
            0,
            "weapon",
            (field: string[]) => {
                field.push(f1WithReducedDelayId);
            }
        );
    }

    public postSptLoad(container: DependencyContainer): void {

    }
}

export const mod = new FreshContentBackport();
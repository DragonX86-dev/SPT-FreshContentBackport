import {DependencyContainer} from "tsyringe";

import {ItemTpl} from "@spt/models/enums/ItemTpl";
import {IPostDBLoadMod} from "@spt/models/external/IPostDBLoadMod";
import {IPostSptLoadMod} from "@spt/models/external/IPostSptLoadMod";

import {ItemCreater} from "./items/ItemCreater";
import {QuestEditor} from "./quests/QuestEditor";
import JaegerTrader from "./traders/JaegerTrader";
import TherapistTrader from "./traders/TherapistTrader";
import RefTrader from "./traders/RefTrader";
import PraporTrader from "./traders/PraporTrader";

class FreshContentBackport implements IPostDBLoadMod, IPostSptLoadMod {
    readonly itemCreater: ItemCreater;

    constructor() {
        this.itemCreater = new ItemCreater();
    }

    public postDBLoad(container: DependencyContainer): void {
        this.add_f1_with_reduced_delay();
        this.add_keys_case();
        this.add_rgo_rgn_vog25_grenades_to_prapor_assort();
    }

    private add_f1_with_reduced_delay() {
        const jaegerTrader = new JaegerTrader();
        const grenadierQuest = new QuestEditor("5c0d190cd09282029f5390d8");

        const f1WithReducedDelayId = this.itemCreater.create_item_from_clone({
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
            {
                UnlimitedCount: true,
                StackObjectsCount: 99999
            },
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

    private add_keys_case() {
        const therapistTrader = new TherapistTrader();
        const refTrader = new RefTrader();

        const keysCaseId = this.itemCreater.create_item_from_clone({
            itemId: "67d3ed3271c17ff82e0a5b0b",
            itemTplToClone: ItemTpl.CONTAINER_SICC,
            parentId: "5795f317245977243854e041",
            handbookParentId: "5b5f6fa186f77409407a7eb7",
            overrideProperties: {
                Name: "item_container_keys_case",
                ShortName: "item_container_keys_case",
                Description: "item_container_keys_case",
                Prefab: {
                    "path": "assets/content/items/barter/item_container_keys_case/item_container_keys_case.bundle",
                    "rcid": ""
                },
                ItemSound: "container_plastic",
                Grids: [
                    {
                        "_name": "main",
                        "_id": "67d3ed3271c17ff82e0a5b0d",
                        "_parent": "67d3ed3271c17ff82e0a5b0b",
                        "_props": {
                            "filters": [
                                {
                                    "ExcludedFilter": [],
                                    "Filter": [
                                        "543be5e94bdc2df1348b4568",
                                        "59fafd4b86f7745ca07e1232",
                                        "62a09d3bcf4a99369e262447",
                                        "619cbf9e0a7c3a1a2731940a",
                                        "67449b6c89d5e1ddc603f504"
                                    ]

                                }
                            ],
                            "cellsH": 11,
                            "cellsV": 7,
                            "isSortingTable": false,
                            "maxCount": 0,
                            "maxWeight": 0,
                            "minCount": 0
                        },
                        "_proto": "55d329c24bdc2d892f8b4567"
                    }
                ],
                RarityPvE: "Superrare",
                Weight: 4,
                Height: 2,
                Width: 3
            },
            price: 496000,
            locales: {
                en: {
                    name: "Key case",
                    shortName: "Keys",
                    description: "This case is the ultimate solution to the problem of hoarding various keys in the stash, helping to store them in one place."
                },
                ru: {
                    name: "Кейс для ключей",
                    shortName: "Ключи",
                    description: "Этот кейс — ультимативное решение проблемы с хранением ключей в схроне."
                }
            }
        });

        therapistTrader.add_item(
            "6808bada364a85cccb04b6fa",
            keysCaseId,
            1,
            {
                UnlimitedCount: true,
                StackObjectsCount: 9999999,
                BuyRestrictionMax: 1,
                BuyRestrictionCurrent: 0
            },
            [
                {
                    "count": 2,
                    "_tpl": "62a09d3bcf4a99369e262447"
                },
                {
                    "count": 2,
                    "_tpl": "60b0f6c058e0b0481a09ad11"
                },
                {
                    "count": 1,
                    "_tpl": "5d03794386f77420415576f5"
                }
            ]
        );

        therapistTrader.add_item(
            "6808bada364a85cccb04b6fd",
            keysCaseId,
            2,
            {
                UnlimitedCount: true,
                StackObjectsCount: 9999999,
                BuyRestrictionMax: 1,
                BuyRestrictionCurrent: 0
            },
            [
                {
                    "count": 550560,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        );

        refTrader.add_item(
            "6808b1a7c25caf3a4305d626",
            keysCaseId,
            2,
            {
                UnlimitedCount: true,
                StackObjectsCount: 1,
                BuyRestrictionMax: 1,
                BuyRestrictionCurrent: 0
            },
            [
                {
                    "count": 83,
                    "_tpl": "5d235b4d86f7742e017bc88a"
                }
            ]
        );
    }

    private add_rgo_rgn_vog25_grenades_to_prapor_assort() {
        const praporTrader = new PraporTrader();

        praporTrader.add_item(
            "684da564887de8fed00d0a50",
            "5e340dcdcb6d5863cc5e5efb",
            1,
            {
                UnlimitedCount: true,
                StackObjectsCount: 9999999
            },
            [
                {
                    "count": 11271,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        );

        praporTrader.add_item(
            "684da564887de8fed00d0a51",
            "618a431df1eb8e24b8741deb",
            1,
            {
                UnlimitedCount: true,
                StackObjectsCount: 9999999
            },
            [
                {
                    "count": 23544,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        );

        praporTrader.add_item(
            "684da564887de8fed00d0a52",
            "617fd91e5539a84ec44ce155",
            1,
            {
                UnlimitedCount: true,
                StackObjectsCount: 9999999
            },
            [
                {
                    "count": 28787,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ]
        );
    }

    public postSptLoad(container: DependencyContainer): void {

    }
}

export const mod = new FreshContentBackport();
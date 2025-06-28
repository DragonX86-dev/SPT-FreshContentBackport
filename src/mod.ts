import {DependencyContainer} from "tsyringe";

import {ItemTpl} from "@spt/models/enums/ItemTpl";
import {IPostDBLoadMod} from "@spt/models/external/IPostDBLoadMod";
import {IPostSptLoadMod} from "@spt/models/external/IPostSptLoadMod";
import {IHideoutProduction} from "@spt/models/eft/hideout/IHideoutProduction";

import {ItemCreater} from "./items/ItemCreater";
import {QuestEditor} from "./quests/QuestEditor";
import {HideoutEditor} from "./hideout/HideoutEditor";
import {TraderEditor} from "./traders/TraderEditor";
import {TraderEnum} from "./traders/TraderEnum";
import {INewItem} from "./interfaces/INewItem";
import {ITraderItem} from "./interfaces/ITraderItem";


class FreshContentBackport implements IPostDBLoadMod, IPostSptLoadMod {
    readonly itemCreater: ItemCreater;

    constructor() {
        this.itemCreater = new ItemCreater();
    }

    public postDBLoad(container: DependencyContainer): void {
        this.add_new_crafts_to_hideout();
        this.add_f1_with_reduced_delay();
        this.add_battle_pass_items_to_database();
        this.add_battle_pass_items_to_ref_assortment();
        this.add_gp_coin_to_ref_assortment();
        this.add_keys_case();
    }

    private add_f1_with_reduced_delay() {
        const jaegerTrader = new TraderEditor(TraderEnum.Jaeger);
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
                    shortName: "F-1 RD",
                    description: "The F-1 hand grenade (GRAU Index 57-G-721) is an anti-personnel fragmentation grenade, designed for neutralizing enemy personnel in defensive combat. This version is personally modified by Partisan and has a shortened fuze, intended for explosive tripwires.",
                },
                ru: {
                    name: "Ручная граната Ф-1 с сокращенным замедлителем",
                    shortName: "Ф-1 СЗ",
                    description: "Ф-1 — ручная противопехотная граната. Эта версия модифицирована лично Партизаном и имеет сокращенный замедлитель. Предназначается для использования в растяжках.",
                }
            }
        });

        jaegerTrader.add_item_to_assortment({
            item: {
                _id: "6812400c0c5cf2cf75075f94",
                _tpl: f1WithReducedDelayId,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 9999999,
                    BuyRestrictionMax: 2,
                    BuyRestrictionCurrent: 0
                }
            },
            barterScheme: [
                {
                    "count": 11498,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ],
            loyaltyLevel: 1
        });

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
        const refTrader = new TraderEditor(TraderEnum.Ref);
        const therapistTrader = new TraderEditor(TraderEnum.Therapist);

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

        therapistTrader.add_item_to_assortment({
            item: {
                _id: "6808bada364a85cccb04b6fa",
                _tpl: keysCaseId,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 9999999,
                    BuyRestrictionMax: 1,
                    BuyRestrictionCurrent: 0
                }
            },
            barterScheme: [
                {
                    count: 2,
                    _tpl: "62a09d3bcf4a99369e262447"
                },
                {
                    count: 2,
                    _tpl: "60b0f6c058e0b0481a09ad11"
                },
                {
                    count: 1,
                    _tpl: "5d03794386f77420415576f5"
                }
            ],
            loyaltyLevel: 1
        });

        therapistTrader.add_item_to_assortment({
            item: {
                _id: "6808bada364a85cccb04b6fd",
                _tpl: keysCaseId,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 9999999,
                    BuyRestrictionMax: 1,
                    BuyRestrictionCurrent: 0
                }
            },
            barterScheme: [
                {
                    "count": 550560,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ],
            loyaltyLevel: 2
        });

        refTrader.add_item_to_assortment({
            item: {
                _id: "6808b1a7c25caf3a4305d626",
                _tpl: keysCaseId,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 1,
                    BuyRestrictionMax: 1,
                    BuyRestrictionCurrent: 0
                }
            },
            barterScheme: [
                {
                    "count": 83,
                    "_tpl": "5d235b4d86f7742e017bc88a"
                }
            ],
            loyaltyLevel: 2
        });
    }

    private add_battle_pass_items_to_database() {
        const newBattlePassItems: INewItem[] = require("../db/battle_pass_items.json");

        for (const battlePassItem of newBattlePassItems) {
            this.itemCreater.create_item(battlePassItem);
        }
    }

    private add_battle_pass_items_to_ref_assortment() {
        const refTrader = new TraderEditor(TraderEnum.Ref);
        const battlePassAssorts: ITraderItem[] = require("../db/battle_pass_assort.json");

        for (const battlePassItem of battlePassAssorts) {
            refTrader.add_item_to_assortment(battlePassItem);
        }
    }

    private add_gp_coin_to_ref_assortment() {
        const refTrader = new TraderEditor(TraderEnum.Ref);

        refTrader.add_item_to_assortment({
            item: {
                _id: "686007e2c1153990581f378e",
                _tpl: "5d235b4d86f7742e017bc88a",
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 9999999
                }
            },
            barterScheme: [
                {
                    "count": 7500,
                    "_tpl": "5449016a4bdc2d6f028b456f"
                }
            ],
            loyaltyLevel: 1
        });
    }

    private add_new_crafts_to_hideout() {
        const hideoutEditor = new HideoutEditor();
        const craftRecipes: IHideoutProduction[] = require("../db/craft_recipes.json");

        for (const craftRecipe of craftRecipes) {
            hideoutEditor.add_new_craft_recipe(craftRecipe);
        }
    }

    public postSptLoad(container: DependencyContainer): void {

    }
}

export const mod = new FreshContentBackport();
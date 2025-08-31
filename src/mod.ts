import {DependencyContainer} from "tsyringe";

import {ItemTpl} from "@spt/models/enums/ItemTpl";
import {IPostDBLoadMod} from "@spt/models/external/IPostDBLoadMod";
import {IPostSptLoadMod} from "@spt/models/external/IPostSptLoadMod";
import {IHideoutProduction} from "@spt/models/eft/hideout/IHideoutProduction";

import {ItemCreater} from "./items/ItemCreater";
import {QuestEditor} from "./quests/QuestEditor";
import {HideoutEditor} from "./hideout/HideoutEditor";
import {TraderEditor} from "./traders/TraderEditor";
import {INewItem} from "./interfaces/INewItem";
import {ITraderItem} from "./interfaces/ITraderItem";
import {Traders} from "@spt/models/enums/Traders";
import {PinLockState} from "@spt/models/eft/common/tables/IItem";
import {DatabaseService} from "@spt/services/DatabaseService";


class FreshContentBackport implements IPostDBLoadMod, IPostSptLoadMod {
    readonly itemCreater: ItemCreater;

    constructor() {
        this.itemCreater = new ItemCreater();
    }

    public postDBLoad(container: DependencyContainer): void {
        this.add_new_crafts_to_hideout();
        this.add_f1_with_reduced_delay();
        this.add_battle_pass_items_to_database();
        this.add_battle_pass_items_to_global_presets(container);
        this.add_battle_pass_items_to_ref_assortment();
        this.add_gp_coin_to_ref_assortment();
        this.add_keys_case();
    }

    private add_f1_with_reduced_delay() {
        const jaegerTrader = new TraderEditor(Traders.JAEGER);
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
                "_id": "681093f14dd91d1e35077be9",
                "_tpl": "67b49e7335dec48e3e05e057",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "BuyRestrictionCurrent": 0,
                    "BuyRestrictionMax": 3,
                    "StackObjectsCount": 9999999,
                    "UnlimitedCount": true
                }
            },
            subItems: [],
            barterScheme: [
                {
                    "_tpl": "5449016a4bdc2d6f028b456f",
                    "count": 11498
                }
            ],
            loyaltyLevel: 1,
        });

        jaegerTrader.add_item_to_quest_assort("681093f14dd91d1e35077be9", "67f3eacef649e7bceb0bb455");

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
        const refTrader = new TraderEditor(Traders.REF);
        const therapistTrader = new TraderEditor(Traders.THERAPIST);

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

    private add_battle_pass_items_to_global_presets(container: DependencyContainer) {
        const globalItemPresets = container.resolve<DatabaseService>("DatabaseService").getGlobals().ItemPresets;

        globalItemPresets["67c86f58179c494df00eedf6"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab2f28dafe3b22670c9116",
            "_id": "67c86f58179c494df00eedf6",
            "_items": [
                {
                    "_id": "67c8701892716de04e03a1c2",
                    "_tpl": "67ab2f28dafe3b22670c9116"
                },
                {
                    "_id": "67c8701892716de04e03a1c3",
                    "_tpl": "65704de13e7bba58ea0285c8",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Soft_armor_front"
                },
                {
                    "_id": "67c8701892716de04e03a1c4",
                    "_tpl": "65705c3c14f2ed6d7d0b7738",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Soft_armor_back"
                },
                {
                    "_id": "67c8701892716de04e03a1c5",
                    "_tpl": "65705c777260e1139e091408",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Soft_armor_left"
                },
                {
                    "_id": "67c8701892716de04e03a1c6",
                    "_tpl": "65705cb314f2ed6d7d0b773c",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "soft_armor_right"
                },
                {
                    "_id": "67c8701892716de04e03a1c7",
                    "_tpl": "65705cea4916448ae1050897",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Collar"
                },
                {
                    "_id": "67c8701892716de04e03a1c8",
                    "_tpl": "656f9d5900d62bcd2e02407c",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c8701892716de04e03a1c9",
                    "_tpl": "656f9d5900d62bcd2e02407c",
                    "parentId": "67c8701892716de04e03a1c2",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Body armor Kirasa N Green",
            "_parent": "67c8701892716de04e03a1c2",
            "_type": "Preset"
        };
        globalItemPresets["67c870e5da2a209b2a0ed126"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab2eecfe82855dcc0f2af6",
            "_id": "67c870e5da2a209b2a0ed126",
            "_items": [
                {
                    "_id": "67c870e5da2a209b2a0ed12a",
                    "_tpl": "67ab2eecfe82855dcc0f2af6"
                },
                {
                    "_id": "67c870e5da2a209b2a0ed12b",
                    "_tpl": "656fae5f7c2d57afe200c0d7",
                    "parentId": "67c870e5da2a209b2a0ed12a",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c870e5da2a209b2a0ed12c",
                    "_tpl": "656fae5f7c2d57afe200c0d7",
                    "parentId": "67c870e5da2a209b2a0ed12a",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Body armor Hexatac HPC Multicam",
            "_parent": "67c870e5da2a209b2a0ed12a",
            "_type": "Preset"
        };
        globalItemPresets["67c86fc392716de04e03a1b6"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab2f94dafe3b22670c912c",
            "_id": "67c86fc392716de04e03a1b6",
            "_items": [
                {
                    "_id": "67c86fe6f8615103060a6926",
                    "_tpl": "67ab2f94dafe3b22670c912c"
                },
                {
                    "_id": "67c86fe6f8615103060a6927",
                    "_tpl": "6570e025615f54368b04fcb0",
                    "parentId": "67c86fe6f8615103060a6926",
                    "slotId": "Soft_armor_front"
                },
                {
                    "_id": "67c86fe6f8615103060a6928",
                    "_tpl": "6570e0610b57c03ec90b96ef",
                    "parentId": "67c86fe6f8615103060a6926",
                    "slotId": "Soft_armor_back"
                },
                {
                    "_id": "67c86fe6f8615103060a6929",
                    "_tpl": "656fad8c498d1b7e3e071da0",
                    "parentId": "67c86fe6f8615103060a6926",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c86fe6f8615103060a692a",
                    "_tpl": "656fad8c498d1b7e3e071da0",
                    "parentId": "67c86fe6f8615103060a6926",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Body armor HighCom Trooper Coyote",
            "_parent": "67c86fe6f8615103060a6926",
            "_type": "Preset"
        };
        globalItemPresets["67c87094d05729369306ce76"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab49aab9c7a1e18c095686",
            "_id": "67c87094d05729369306ce76",
            "_items": [
                {
                    "_id": "67c87094d05729369306ce7d",
                    "_tpl": "67ab49aab9c7a1e18c095686"
                },
                {
                    "_id": "67c87094d05729369306ce7e",
                    "_tpl": "6570e83223c1f638ef0b0ede",
                    "parentId": "67c87094d05729369306ce7d",
                    "slotId": "Soft_armor_front"
                },
                {
                    "_id": "67c87094d05729369306ce7f",
                    "_tpl": "6570e87c23c1f638ef0b0ee2",
                    "parentId": "67c87094d05729369306ce7d",
                    "slotId": "Soft_armor_back"
                },
                {
                    "_id": "67c87094d05729369306ce80",
                    "_tpl": "6570e90b3a5689d85f08db97",
                    "parentId": "67c87094d05729369306ce7d",
                    "slotId": "Groin"
                },
                {
                    "_id": "67c87094d05729369306ce81",
                    "_tpl": "656f9fa0498d1b7e3e071d98",
                    "parentId": "67c87094d05729369306ce7d",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c87094d05729369306ce82",
                    "_tpl": "656f9fa0498d1b7e3e071d98",
                    "parentId": "67c87094d05729369306ce7d",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Vest Crye Precision AVS multicam",
            "_parent": "67c87094d05729369306ce7d",
            "_type": "Preset"
        };
        globalItemPresets["67c87145e52edc36aa069ae6"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab4b2d6f7ae4aa550bbcf6",
            "_id": "67c87145e52edc36aa069ae6",
            "_items": [
                {
                    "_id": "67c87145e52edc36aa069aec",
                    "_tpl": "67ab4b2d6f7ae4aa550bbcf6"
                },
                {
                    "_id": "67c87145e52edc36aa069aed",
                    "_tpl": "6575bc88c6700bd6b40e8a57",
                    "parentId": "67c87145e52edc36aa069aec",
                    "slotId": "Soft_armor_front"
                },
                {
                    "_id": "67c87145e52edc36aa069aee",
                    "_tpl": "6575bca0dc9932aed601c5d7",
                    "parentId": "67c87145e52edc36aa069aec",
                    "slotId": "Soft_armor_back"
                },
                {
                    "_id": "67c87145e52edc36aa069aef",
                    "_tpl": "656fae5f7c2d57afe200c0d7",
                    "parentId": "67c87145e52edc36aa069aec",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c87145e52edc36aa069af0",
                    "_tpl": "656fae5f7c2d57afe200c0d7",
                    "parentId": "67c87145e52edc36aa069aec",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Vest 5.11 Tactical TacTec Storm",
            "_parent": "67c87145e52edc36aa069aec",
            "_type": "Preset"
        };
        globalItemPresets["67c871b6e0b64a07890a2f36"] = {
            "_changeWeaponName": false,
            "_encyclopedia": "67ab2f5adafe3b22670c911f",
            "_id": "67c871b6e0b64a07890a2f36",
            "_items": [
                {
                    "_id": "67c871b6e0b64a07890a2f41",
                    "_tpl": "67ab2f5adafe3b22670c911f"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f42",
                    "_tpl": "6575dd3e9e27f4a85e081142",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Soft_armor_front"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f43",
                    "_tpl": "6575dd519e27f4a85e081146",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Soft_armor_back"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f44",
                    "_tpl": "6575dd64945bf78edd04c438",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Soft_armor_left"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f45",
                    "_tpl": "6575dd6e9d3a0ddf660b9047",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "soft_armor_right"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f46",
                    "_tpl": "6575dd769d3a0ddf660b904b",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Collar"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f47",
                    "_tpl": "6575dd800546f8b1de093df6",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Groin"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f48",
                    "_tpl": "6575dd94945bf78edd04c43c",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Groin_back"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f49",
                    "_tpl": "65573fa5655447403702a816",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Front_plate"
                },
                {
                    "_id": "67c871b6e0b64a07890a2f4a",
                    "_tpl": "65573fa5655447403702a816",
                    "parentId": "67c871b6e0b64a07890a2f41",
                    "slotId": "Back_plate"
                }
            ],
            "_name": "Body armor FORT Redut M Woodland",
            "_parent": "67c871b6e0b64a07890a2f41",
            "_type": "Preset"
        };
    }

    private add_battle_pass_items_to_ref_assortment() {
        const refTrader = new TraderEditor(Traders.REF);
        const battlePassAssorts: ITraderItem[] = require("../db/battle_pass_assort.json");

        for (const battlePassItem of battlePassAssorts) {
            refTrader.add_item_to_assortment(battlePassItem);
        }
    }

    private add_gp_coin_to_ref_assortment() {
        const refTrader = new TraderEditor(Traders.REF);

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
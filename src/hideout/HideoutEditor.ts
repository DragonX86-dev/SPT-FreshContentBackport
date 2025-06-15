import {container} from "tsyringe";

import {DatabaseService} from "@spt/services/DatabaseService";
import {IHideoutProduction} from "@spt/models/eft/hideout/IHideoutProduction";

export class HideoutEditor {
    readonly productionRecipes: IHideoutProduction[];

    constructor() {
        this.productionRecipes = container.resolve<DatabaseService>("DatabaseService")
            .getTables().hideout.production.recipes;
    }

    public add_new_craft_recipe(craftRecipe: IHideoutProduction): void {
        this.productionRecipes.push(craftRecipe);
    }
}
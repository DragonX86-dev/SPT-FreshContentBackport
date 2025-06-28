import {container} from "tsyringe";

import {ItemTpl} from "@spt/models/enums/ItemTpl";
import {IProps} from "@spt/models/eft/common/tables/ITemplateItem";
import {CustomItemService} from "@spt/services/mod/CustomItemService";
import {LocaleDetails, NewItemFromCloneDetails} from "@spt/models/spt/mod/NewItemDetails";
import {INewItem} from "../interfaces/INewItem";

type CreateItemFromCloneProps = {
    itemId: string;
    parentId: string;
    handbookParentId: string;
    itemTplToClone: ItemTpl;
    overrideProperties: IProps;
    locales: Record<string, LocaleDetails>;
    price: number;
};

class ItemCreater {
    public create_item_from_clone(props: CreateItemFromCloneProps): string {
        const customItem = container.resolve<CustomItemService>("CustomItemService");

        const newItem: NewItemFromCloneDetails = {
            itemTplToClone: props.itemTplToClone,
            overrideProperties: props.overrideProperties,
            parentId: props.parentId,
            newId: props.itemId,
            fleaPriceRoubles: props.price,
            handbookPriceRoubles: props.price,
            handbookParentId: props.handbookParentId,
            locales: props.locales
        };

        let createdItem = customItem.createItemFromClone(newItem);
        if (!createdItem.success) {
            console.log("");
        }

        return createdItem.itemId;
    }

    public create_item(newItem: INewItem): string {
        const customItem = container.resolve<CustomItemService>("CustomItemService");

        let createdItem = customItem.createItem({
            newItem: newItem.newItem,
            fleaPriceRoubles: newItem.handbookPrice,
            handbookPriceRoubles: newItem.handbookPrice,
            handbookParentId: newItem.handbookParentId,
            locales: newItem.locales
        });

        if (!createdItem.success) {
            console.log(createdItem.errors);
        }

        return createdItem.itemId;
    }
}

export {
    CreateItemFromCloneProps,
    ItemCreater
};
import {ITemplateItem} from "@spt/models/eft/common/tables/ITemplateItem";
import {LocaleDetails} from "@spt/models/spt/mod/NewItemDetails";

export interface INewItem {
    newItem: ITemplateItem;
    handbookPrice: number;
    handbookParentId: string;
    locales: Record<string, LocaleDetails>;
}
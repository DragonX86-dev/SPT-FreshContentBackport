import {container} from "tsyringe";

import {DatabaseService} from "@spt/services/DatabaseService";
import {IQuest, IQuestCondition} from "@spt/models/eft/common/tables/IQuest";

class QuestEditor {
    readonly quest: IQuest;

    constructor(questId: string) {
        this.quest = container
            .resolve<DatabaseService>("DatabaseService")
            .getTables().templates.quests[questId];
    }

    public edit_quest_counter_creator_condition(type: string, index: number, counterIndex: number, fieldName: string, modifier: (field: any) => void): void {
        let questCondition: IQuestCondition;
        if (type === "AvailableForFinish") {
            questCondition = this.quest.conditions.AvailableForFinish[index];
        }

        if (questCondition.conditionType == "CounterCreator") {
            const questConditionCounterCondition = questCondition.counter.conditions[counterIndex];
            modifier(questConditionCounterCondition[fieldName]);
        }
    }
}

export {
    QuestEditor
}
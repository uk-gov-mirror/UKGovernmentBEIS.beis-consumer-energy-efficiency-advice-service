export enum QuestionType {
    User,
    House,
    Heating,
    Behaviour,
}

export abstract class QuestionTypeUtil {
    public static getIconClassName(questionType: QuestionType): string {
        switch(questionType) {
            case QuestionType.User:      { return 'icon-person'; }
            case QuestionType.House:     { return 'icon-house'; }
            case QuestionType.Heating:   { return 'icon-thermostat'; }
            case QuestionType.Behaviour: { return 'icon-person-showering'; }
        }
    }
}
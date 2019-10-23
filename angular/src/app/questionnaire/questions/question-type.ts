export enum QuestionType {
    House,
    Heating,
    Behaviour,
    Personal
}

export abstract class QuestionTypeUtil {
    public static getIconClassName(questionType: QuestionType): string {
        switch (questionType) {
            case QuestionType.House:     { return 'icon-house'; }
            case QuestionType.Heating:   { return 'icon-thermostat'; }
            case QuestionType.Behaviour: { return 'icon-person'; }
            case QuestionType.Personal:  { return 'icon-person'; }
        }
    }
}

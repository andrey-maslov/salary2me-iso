/**
 *
 * @param axes
 * @param tablesWithBarsTitles
 * @param testResult
 * @constructor
 */
export function TablesWithBars(axes: string[][][], tablesWithBarsTitles: {title: string, desc: string}[] , testResult: number[][]) {

    const tablesWithBars = getTablesWithBars()
//Data for tables with bars chart
    function getTablesWithBars (): { data: (string | number)[][]; title: string; desc: string }[] {
        const tables = [
            getManagementData(),
            getSelfOrganizationData(),
            getLoyaltyData(),
            getInitiativeData(),
            getLearnabilityData(),
            getConformismData(),
            getSelfEsteemData(),
            getConflictData(),
            getDepressionData(),
        ];
        return tablesWithBarsTitles.map((param: { title: string, desc: string }, i: number) => ({
            data: tables[i], title: param.title, desc: param.desc
        }));
    }

    /**
     * Эффективность в руководстве малой группы
     */
    function getManagementData(): [string, number, number][] {
        return [
            [axes[0][0][0], (testResult[0][0] * -1), 3],
            [axes[1][3][1], (testResult[1][3]), 3],
            [axes[2][3][0], (testResult[2][3] * -1), 3],
            [axes[3][0][1], (testResult[3][0]), 4],
            [axes[2][1][0], (testResult[2][1] * -1), 4],
        ];
    }

    /**
     * Выживаемость в коллективе
     */
    function getTeamSurvivalData(): [string, number, number][] {
        return [
            [axes[1][1][0], (testResult[1][1] * -1), -1],
            [axes[1][2][0], (testResult[1][2] * -1), 1],
            [axes[3][3][1], (testResult[3][3]), 1],
            [axes[3][4][0], (testResult[3][4] * -1), 1],
            [axes[4][4][0], (testResult[4][4] * -1), 1],
        ];
    }

    /**
     * Самоорганизация
     */
    function getSelfOrganizationData(): [string, number, number][] {
        return [
            [axes[3][2][1], (testResult[3][2]), 1],
            [axes[2][0][0], (testResult[2][0] * -1), 1],
            [axes[2][1][0], (testResult[2][1] * -1), 1],
            [axes[2][3][0], (testResult[2][3] * -1), 1],
            [axes[2][4][0], (testResult[2][4] * -1), 1],
        ];
    }

    /**
     * Лояльность
     */
    function getLoyaltyData(): [string, number, number][] {
        return [
            [axes[3][1][0], (testResult[3][1] * -1), 1],
            [axes[0][3][1], (testResult[0][3]), 0],
            [axes[1][1][0], (testResult[1][1] * -1), 1],
            [axes[4][3][1], (testResult[4][3]), 0],
            [axes[1][0][0], (testResult[1][0] * -1), 1],
        ];
    }

    /**
     * Инициативность
     */
    function getInitiativeData(): [string, number, number][] {
        return [
            [axes[0][0][0], (testResult[0][0] * -1), 1],
            [axes[2][1][1], (testResult[2][1]), 1],
            [axes[4][4][0], (testResult[4][4] * -1), 1],
            [axes[1][1][1], (testResult[1][1]), 1],
            [axes[1][4][1], (testResult[1][4]), 1],
        ];
    }

    /**
     * Обучаемость
     */
    function getLearnabilityData(): [string, number, number][] {
        return [
            [axes[0][0][0], (testResult[0][0] * -1), 1],
            [axes[2][1][0], (testResult[2][1] * -1), 1],
            [axes[4][4][0], (testResult[4][4] * -1), 1],
            [axes[4][0][0], (testResult[4][0] * -1), 1],
            [axes[0][3][0], (testResult[0][3] * -1), 1],
        ];
    }

    /**
     * Конформизм
     */
    function getConformismData(): [string, number, number][] {
        return [
            [axes[1][3][0], (testResult[1][3] * -1), 1],
            [axes[2][4][0], (testResult[2][4] * -1), 1],
            [axes[2][2][0], (testResult[2][2] * -1), 1],
            [axes[0][0][1], (testResult[0][0]), 1],
            [axes[0][3][1], (testResult[0][3]), 1],
        ];
    }

    /**
     * Самооценка
     */
    function getSelfEsteemData(): [string, number, number][] {
        return [
            [axes[1][0][1], (testResult[1][0]), 1],
            [axes[1][4][1], (testResult[1][4]), 1],
            [axes[3][2][1], (testResult[3][2]), 1],
            [axes[4][3][1], (testResult[4][3]), 1],
            [axes[1][2][1], (testResult[1][2]), 1],
        ];
    }

    /**
     * Конфликтность
     */
    function getConflictData(): [string, number, number][] {
        return [
            [axes[0][4][0], (testResult[0][4] * -1), 2],
            [axes[2][3][1], (testResult[2][3]), 1],
            [axes[3][1][1], (testResult[3][1]), 1],
            [axes[3][2][0], (testResult[3][2] * -1), -1],
            [axes[1][1][1], (testResult[1][1]), 1],
        ];
    }

    /**
     * Склонность к депрессии
     */
    function getDepressionData(): [string, number, number][] {
        return [
            [axes[1][4][0], (testResult[1][4] * -1), 1],
            [axes[1][0][0], (testResult[1][0] * -1), 1],
            [axes[3][2][0], (testResult[3][2] * -1), 1],
            [axes[0][0][1], (testResult[0][0]), 1],
            [axes[0][2][1], (testResult[0][2]), 1],
        ];
    }

    return {
        tablesWithBars: getTablesWithBars(),
        managementData: getManagementData(),
        teamSurvivalData: getTeamSurvivalData(),
        selfOrganizationData: getSelfOrganizationData(),
        loyaltyData: getLoyaltyData(),
        initiativeData: getInitiativeData(),
        learnabilityData: getLearnabilityData(),
        conformismData: getConformismData(),
        selfEsteemData: getSelfEsteemData(),
        conflictData: getConflictData(),
        depressionData: getDepressionData(),
    }
}
import {UserResult, getAndDecodeData, getFamous} from 'psychology'

const famousList = [
    [
        ['Хан Соло', 'Дейнерис Таргариен'],
        ['Джеймс Бонд', 'Арья Старк'],
        ['Джокер', 'Снежная королева']
    ],
    [['Генри Форд', 'Коко Шанель'], ['Стив Джобс', 'Кэти Айрленд'], ['Джек Ма', 'Люси Пэнг']],
    [
        ['Вуди Ален', 'Гермиона'],
        ['Илон Маск', 'Майли Сайрус'],
        ['Капитан Джек Воробей', 'Опра Уинфри']
    ],
    [
        ['Роберт Дауни-мл.', 'Камилла Белль'],
        ['Уилл Смит', 'Скарлетт О. Хара'],
        ['Джаред Лето', 'Кайли Дженер']
    ],
    [
        ['Райан Рейнольдс', 'Русалочка'],
        ['принц Гарри', 'Сандра Баллок'],
        ['Роберт Де Ниро', 'Мэрилин Монро']
    ],
    [['Фродо Бэггинс', 'Санса Старк'], ['Фредди Меркьюри', 'Бьорк'], ['Киану Ривз', 'мать Тереза']],
    [
        ['Гарри Поттер', 'Джоан Роулинг'],
        ['Доктор Хаус', 'Агата Кристи'],
        ['Шерлок', 'Грета Тунберг']
    ],
    [
        ['Уинстон Черчилль', 'Ангела Меркель'],
        ['Дон Корлеоне', 'Хиллари Клинтон'],
        ['Брюс Уиллис', 'Маргарет Тэтчер']
    ]
]

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    const query = req.query.encdata
    const { data, decoded, encoded } = getAndDecodeData(null, query)

    if (!data) {
        res.end('failed result code')
    }

    const sex = data[0][2] === 2 ? 1 : data[0][2]
    const userResult = UserResult(data[1])

    const { person } = getFamous(userResult.mainOctant, famousList, sex)

    res.end(
        JSON.stringify({
            ...userResult,
            famousPerson: person
        })
    )
}

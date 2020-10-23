const template = (img, testData) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .wrapper {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                font-family: sans-serif;
                color: #555;
             }
             .top {
                display: flex;
             }
             .image {
                display: block;
                width: 50%;
                height: auto;
             }
           

          </style>
       </head>
       <body>
          <div class="wrapper">
          <h1 class="justify-center">Ваш психологический профиль</h1>
            
            <div class="top">
                    <div class="radar">
                        <img src="${img}" alt="">
                    </div>
                    <div class="famous">
                    </div>
                <div class="main-desc">
                    <img src="http://localhost:4000/img/famous/${
                        testData.famous.imgName
                    }.png" alt="famous">
                    <div class="famous-desc">
                        <div class="famous-name">${testData.famous.person}</div>
                        <div class="famous-text">${testData.psychoTypeDesc}</div>
                    </div>
                </div>
            </div>
            <div class="box">
                <h2>Полный психографический профиль</h2>
                <table>
                    <tbody>
                        <tr><th>Основные характеристики</th><th>Выявлено</th></tr>
                    </tbody>
                </table>
            </div>
          </div>
       </body>
    </html>`
}

// const image = './test.png'
// const testData = {
//     famous: {
//         person: 'Хан Соло',
//         imgName: '0_0_0'
//     },
//     psychoTypeDesc:
//         'Вы легко адаптируетесь к любым изменениям, легко находите новое и с удовольствием его применяете. Правда, есть небольшая проблема с доведением дел до конца, т.к. снова и снова приходят новые увлечения'
// }
// const wrapper = document.getElementById('root')
// wrapper.innerHTML = template(image, testData)

module.exports = template

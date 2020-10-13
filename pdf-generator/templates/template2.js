// const wrapper = document.getElementById('root')

const date = new Date()
const tableData1 = [
    ['row1 title', 'row 1 description'],
    ['row2 title', 'row 2 description'],
    ['row3 title', 'row 3 description'],
    ['row4 title', 'row 4 description']
]

const template = img => {
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
<!--                <img class="image" src="./test.png" alt="">-->
                    <img src="${img}" alt="">
                <div class="main-desc">
                    Вы легко адаптируетесь к любым изменениям, легко находите новое и с удовольствием его применяете. Правда, есть небольшая проблема с доведением дел до конца, т.к. снова и снова приходят новые увлечения
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

// wrapper.innerHTML = template

module.exports = template

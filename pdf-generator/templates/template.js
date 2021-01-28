const template = (img, testData) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
           <style>
           
           body {
             font-family: 'PT Sans', 'sans-serif';
           }
           h2 {
                margin-top: 0;
            }
            .header {
               display: flex;
               justify-content: space-between;
               align-items: center;
               margin-bottom: 1rem;
               padding-bottom: 1rem;
               border-bottom: 1px solid rgba(0,0,0, .1);
            }
            .header img {
                height: 26px;
            }
            .header a {
                color: #36A9E0;
                max-width: 300px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .8rem;
            }
            
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
                justify-content: space-between;
                margin-bottom: 40px;
            }
            .radar {
                margin-right: 50px;
            }
            .radar img {
                width: 360px;
            }
            .main-desc img {
                width: 180px;
                margin: 0 auto 20px;
            }
            .famous-name {
                font-weight: 700;
                font-size: 120%;
                margin-bottom: 12px;
                text-align: center;
            }
            .famous-text {
                font-size: 13px;
            }
            .image {
                display: block;
                width: 50%;
                height: auto;
            }
            .box {
                color: transparent;
            }
            table {
                border-collapse: collapse;
            }
            table td, table th {
                border: 1px solid #aeaeae;
                padding: 5px 10px;
                font-size: 13px;
            }
            table td:first-child {
                min-width: 210px;
            }
            .box table, .box td, .box h3 {
                color: #333;
            }
            .box h3 {
                margin-bottom: 0;
               }
            </style>
       </head>
       <body>
          <div class="wrapper">
          <div class="header">
            <img src="http://localhost:4000/img/salary_logo_thin.svg">
            <a href="https://salary2.me">
                salary2.me
            </a>
          </div>
          <h2 class="justify-center">Ваш психологический профиль</h2>
            
            <div class="top">
                <div class="radar">
                    <img class="image" src="${img}">
                </div>
                <div class="main-desc">
                    <img class="image" src="http://localhost:4000/img/famous/${testData.famous.picture}.png">
                    <div class="famous-desc">
                        <div class="famous-name">${testData.famous.person}</div>
                        <div class="famous-text">${testData.psychoTypeDesc}</div>
                    </div>
                </div>
            </div>
            <div class="box">
                <h3>Полный психографический профиль</h3>
                <table>
                    <tbody>
                        <tr><th>Основные характеристики</th><th>Выявлено</th></tr>
                        ${testData.portraitDesc.map(row => (
                            `<tr>${row.map(item => (`<td>${item}</td>`))}</tr>`
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div class="box">
                <h3>Полный психологический портрет</h3>
                <table>
                    <tbody>
                        <tr><th>Основные характеристики</th><th>Выявлено</th></tr>
                        ${testData.fullProfileData.map((row) => (
        `<tr>${row.map((item) => (`<td>${item}</td>`))}</tr>`
    ))}
                    </tbody>
                </table>
            </div>
          </div>
       </body>
    </html>`
}

// const image = './test.png'
//
// if (typeof window !== 'undefined') {
//     const wrapper = document.getElementById('root')
//     wrapper.innerHTML = template(image, data)
// }

module.exports = template

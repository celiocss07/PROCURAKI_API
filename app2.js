const express = require('express')
const app = express()
const cheerio = require('cheerio')
const axios = require('axios')

const product = {}
var indexGlobal = 0;

app.get("", (req, res) => {

    res.json("Hello, World!")
})

app.get("/:id", async (req, res) => {

    console.log(req.params.id)
    async function webscraping() {
        //Raspagem de dados no site www.ncrangola.com
        async function NCRANGOLA() {
            await axios.get(`https://www.ncrangola.com/loja/particulares/pt/pesquisa?controller=search&orderby=position&orderway=desc&search_query=${req.params.id}&submit_search=`)
                .then((result) => {

                    const $ = cheerio.load(result.data)

                    $('.produto').each((index, element) => {
                        const id = indexGlobal


                        const imgLink = $(element)
                            .find(' div.produto_img > div.produto_img_in.produto_img_desktop_bt > span > a > img')
                            .attr('src')

                        const marca = $(element)
                            .find(' div.produto_info > div > h6')
                            .text()

                        const productLink = $(element)
                            .find(' div.produto_info > div > a')
                            .attr('href')

                        const desc = $(element)
                            .find(' div.produto_info > div > a > h5')
                            .text()


                        const price = $(element)
                            .find('div.produto_info > div > div > div > span')
                            .text()


                        product[index] = {
                            id,
                            marca,
                            imgLink,
                            productLink,
                            desc,
                            price
                        }
                        indexGlobal++;
                    })

                })
                .catch((err) => {
                    console.log("Erro ao executar", err)
                });
        }

        async function QUERAPIDOANGOLA() {
            await axios.get(``)
                .then((result) => {

                    const $ = cheerio.load(result.data)

                    $('.produto').each((index, element) => {
                        const id = indexGlobal


                        const imgLink = $(element)
                            .find(' div.produto_img > div.produto_img_in.produto_img_desktop_bt > span > a > img')
                            .attr('src')

                        const marca = $(element)
                            .find(' div.produto_info > div > h6')
                            .text()

                        const productLink = $(element)
                            .find(' div.produto_info > div > a')
                            .attr('href')

                        const desc = $(element)
                            .find(' div.produto_info > div > a > h5')
                            .text()


                        const price = $(element)
                            .find('div.produto_info > div > div > div > span')
                            .text()


                        product[index] = {
                            id,
                            marca,
                            imgLink,
                            productLink,
                            desc,
                            price
                        }
                        indexGlobal++;
                    })

                })
                .catch((err) => {
                    console.log("Erro ao executar", err)
                });
        }



        await NCRANGOLA()
        await QUERAPIDOANGOLA()


    }
    await webscraping()
    await res.status(200).json(product)



})

app.listen(8085, () => {

})
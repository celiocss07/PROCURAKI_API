const express = require('express')
const app = express()
const cheerio = require('cheerio')
const axios = require('axios')
const info = require('./resultado.json')

const product = []
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

                        const categoria = $(element)
                            .find(' div.produto_info > div > h6')
                            .text()

                        const productLink = $(element)
                            .find(' div.produto_info > div > a')
                            .attr('href')

                        const name = $(element)
                            .find(' div.produto_info > div > a > h5')
                            .text()


                        const price = $(element)
                            .find('div.produto_info > div > div > div > span')
                            .text()
                        

                        product[index] = {
                            id,
                            categoria,
                            imgLink,
                            productLink,
                            name,
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
            await axios.get(`https://www.querapidoangola.com/?s=${req.params.id}&post_type=product`)
                .then((result) => {

                    const $ = cheerio.load(result.data)

                    $('#main > div > div > div > div.products > div.product-small').each((index, element) => {

                        
                        const id = indexGlobal


                        const imgLink = $(element)
                            .find('div.box-image > div.image-none > a > img ')
                            .attr('srcset')
                           

                        const categoria = $(element)
                            .find(' .col-inner > .product-small.box > .box-text.box-text-products > .title-wrapper > p.category')
                            .text()
                           
                          

                        const name = $(element)
                            .find('.col-inner > .product-small.box > .box-text.box-text-products > .title-wrapper > p.name.product-title > a')
                            .text()
                           

                        const productLink = $(element)
                            .find('.col-inner > .product-small.box > .box-text.box-text-products > .title-wrapper > p.name.product-title > a')
                            .attr('href')
                            

                            
                        const price = $(element)
                            .find('.col-inner > .product-small.box > .box-text.box-text-products > .price-wrapper > .price > .woocommerce-Price-amount > bdi')
                            .text()
                            console.log(price)


                        product[index] = {
                            id,
                            categoria,
                            imgLink,
                            productLink,
                            name,
                            price
                        }
                        indexGlobal++;
                    })

                    indexGlobal = 0;

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
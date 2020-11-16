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

        $('.produto').each( (index, element) => {

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
                            
            
            product [index] = {marca, imgLink, productLink, desc, price}
            indexGlobal++;
        })
        
    })
    .catch((err) => {
        console.log("Erro ao executar",err)
});
 }

    async function QUERRAPIDOANGOLA() {
    
    await axios.get(`https://www.querapidoangola.com/?s=${req.params.id}&post_type=product`)
    .then((result) => {
        
        const $ = cheerio.load(result.data)

        $('.col-inner').each( (index, element) => {
            
            const imgLink = $(element)
                            .find('  div.image-none > a > img')
                            .attr('srcset')

            const marca = $(element)
                            .find(' div.title-wrapper > p.category')
                            .text()
            const desc = $(element)
                            .find('p.product-title > a')
                            .text()

            const productLink = $(element)
                            .find(' p.product-title > a')
                            .attr('href')

            const price = $(element)
                            .find('div.price-wrapper > span.price > span.woocommerce-Price-amount > bdi')
                            .text()
            
                            
            
            product[indexGlobal] = {marca, imgLink, productLink, desc, price}
            indexGlobal++;
        })
        console.log(product)
        
    })
    .catch((err) => {
        console.log("Erro ao executar",err)
});
 
}

await NCRANGOLA()
await QUERRAPIDOANGOLA()
    

    }
   await  webscraping()
    await res.status(200).json(product)

    

})

app.listen(8085, () => {

})


    






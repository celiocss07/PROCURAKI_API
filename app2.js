const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')


const fecthdata = async(url) =>{

    const result = await axios.get(url)

    //console.log(result.data)
    return result.data
}

const main = async() => {

    const content = await fecthdata("https://www.ncrangola.com/loja/particulares/pt/")

    let $ = cheerio.load(content)
    //const title= .innerText

    console.log($('#product_list > li > div > div > div.produto_info > div > h6').length)
}
main()
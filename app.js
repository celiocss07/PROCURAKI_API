const express = require('express')
const app = express()
const data2 = require("./resultado.json")
const puppeteer = require('puppeteer')

app.get("", (req, res) => {
	
	
	res.json("Hello World!")
})


app.get("/:id", (req, res) => {
	console.log("Server is running!")
	const webScraping = async () => {

		console.log(req.params)
		const browser = await puppeteer.launch( { headless:false})
		const page = await browser.newPage()
		await page.goto(`https://www.ncrangola.com/loja/particulares/pt/pesquisa?controller=search&orderby=position&orderway=desc&search_query=${req.params.id}&submit_search=`)
		//await page.waitForSelector('#search_query_top')
		//await page.type('#search_query_top', `Célio CSS 07`)


		
		const data = await page.evaluate(() => {
			document.querySelector('#search_query_top').style.color = "red";
			const todos = document.querySelectorAll('#product_list > li > div > div > div.produto_info > div > h6');
			
			const produtos = [];
			//const vet = [];
			let cont = 1;
			for (let i = 1; i <= todos.length; i++) {
				const id = i;
				const marca = document.querySelector(`#product_list > li:nth-child(${i}) > div > div > div.produto_info > div > h6`).innerText
				const nome = document.querySelector(`#product_list > li:nth-child(${i}) > div > div > div.produto_info > div > a > h5`).innerText
				const preco = document.querySelector(`#product_list > li:nth-child(${i}) > div > div > div.produto_info > div > div > div > span:nth-child(1)`).innerText
				const img = document.querySelector(`#product_list > li:nth-child(${i}) > div > div > div.produto_img > div.produto_img_in.produto_img_desktop_bt > span > a > img`).getAttribute("src")
				const url = document.querySelector(`#product_list > li:nth-child(${i}) > div > div > div.produto_img > div.produto_img_in.produto_img_desktop_bt > span > a`).getAttribute("href")
				
				 const item = {
					 id,
					 marca,
					 nome,
					 preco,
					 img,
					 url,
					 empresa:"NCR Angola"
				 }
				 
				 produtos.push(item);
			 }
			
			return { produtos }
			
		})
		

		
		
	}

	//webScraping()
	res.status(200).json(data2)
	console.log('Terminou!')


})
app.listen(8085,() => {


})



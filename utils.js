/*
 * Utility file for DXr.
 *
 * Author: Dave Mountain
 * Date: 11th March 2014
 *
 * **NOTE**
 * USE AT YOUR OWN RISK.
 *
 * I AIN'T GOING TO BE RESPONSIBLE FOR YOU ACCIDENTALLY BUYING YOURSELF A
 * KNOCK-OFF ANDROID TABLET FOR £1000 OR SOMETHING. I DID THIS FOR MY OWN
 * AMUSEMENT. PLEASE ALSO BE AWARE THAT IF YOU DON'T KNOW DEALEXTREME VERY WELL
 * THERE IS A HUGE CHANCE YOU'LL PROBABLY GET A "SHOCK-YOUR-FRIEND" DERIVATIVE
 * OF SOMETHING. LIKE A RUBBER DUCK. OR A FRIDGE MAGNET.
 *
 * YOU HAVE BEEN WARNED.
 */

function generateKeyword()
{
	var rnd = Math.floor(Math.random() * (wordList.length - 1));
	return wordList[rnd];
}

function generateSearchUrl(keyword, minPrice, maxPrice)
{
	return 'http://dx.com/s/' + keyword + '?PriceSort=up&PriceIntvl=' + minPrice + '-' + maxPrice;
}

function generateAddToCartUrl(sku)
{
	return 'https://cart.dx.com/cart/add?sku=' + sku + '&qty=1';
}
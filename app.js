/*
Copyright (c) 2014 David Mountain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

phantom.injectJs('./wordlist.js');
phantom.injectJs('./utils.js');
phantom.injectJs('./config.js');

var keyword = DXR_CONFIG.keyword == null ? generateKeyword() : DXR_CONFIG.keyword;

function init()
{
	console.log('Searching DealExtreme for products using keyword "' + keyword + '"...');
	getProducts(keyword);
}

/*
 * getProducts
 * Traverses page to find the product listing, selects random product,
 * extracts the SKU and finally updates the cart.
 */
function getProducts(keyword)
{
	var page = require('webpage').create();
	var url = generateSearchUrl(keyword, DXR_CONFIG.priceRange.from, DXR_CONFIG.priceRange.to);

	page.onConsoleMessage = function(message) {
		console.log(message);
	}

	page.onError = function(msg, trace) {}

	page.open(url, function(status) {
		console.log('Search completed, attempting to find a product...');

		var sku = page.evaluate(function() {
			var items = document.querySelectorAll('#s_product_list li.list');
			var rnd = Math.floor(Math.random() * (items.length - 1));

			for (var i = 0; i < items.length; i++) {
				if (i == rnd) {
					var item = items[i];
					var fragments = item.querySelector('.pi .title a')
										.getAttribute('href')
										.split('-');

					var sku = fragments[fragments.length - 1];

					return sku;
				}
			}
		});

		if (sku == null)
		{
			console.log('No products were found.');

			if (DXR_CONFIG.restartIfNoResults)
				restart();
		}
		else
			updateCart(sku);
	});
}

/*
 * updateCart
 * Loads generated cart URL and triggers paypal button.
 */
function updateCart(sku)
{
	var cartUrl = generateAddToCartUrl(sku);
	var page = require('webpage').create();

	page.onConsoleMessage = function(message) {
		console.log(message);
	};

	page.onUrlChanged = function(url) {
		if (cartUrl == url)
			return;

		processCheckoutPage(url);
	};

	page.open(cartUrl, function(status) {
		if (DXR_CONFIG.justForFunMode)
		{
			console.log('Cart image saved.');
			page.render('cart.png');
			return;
		}

		var success = page.evaluate(function(keyword) {
			var button = document.querySelector('button.cart_btn_paypal');

			if (button == null)
			{
				console.log('A product was found, but couldn\'t be added to the cart. Either this happened because someone beat you to it, or I did something wrong.');
				return false;
			}
			else
			{
				console.log('Product found and added to basket. Forwarding to checkout...');
				button.click();
				return true;
			}
		});

		if (!success && DXR_CONFIG.restartIfNoResults)
			restart();
	});
}

/*
 * processCheckoutPage
 * Removes sign-in popup (needed to go through to payment), fills in address form
 * with config data and loads PayPal page.
 */
function processCheckoutPage(checkoutUrl)
{
	if (DXR_CONFIG.justForFunMode)
		return;

	var page = require('webpage').create();

	page.open(checkoutUrl, function(status) {

		setTimeout(function() {

			var success = page.evaluate(function(e, fn, ln, s1, s2, c, s, p, t) {
				console.log("Starting checkout process...");

				var guestButton = $('#dx-as-guest');

				if (guestButton.length > 0)
					guestButton.click();

				try {
					var formList = ['email', 'firstname', 'lastname', 'street1', 'street2', 'city', 'state', 'postalcode', 'phonenumber'];
					var formValues = [e, fn, ln, s1, s2, c, s, p, t];

					for (var i = 0; i < formList.length; i++)
						document.querySelector('#panel-' + formList[i]).value = formValues[i];

					document.querySelector('#saveAddress').click();
				}
				catch (e) {
					console.log('Couldn\'t find form elements for some reason. Restarting...');
					return false;
				}

				return true;
			},
			DXR_CONFIG.address.email,
			DXR_CONFIG.address.firstName,
			DXR_CONFIG.address.lastName,
			DXR_CONFIG.address.street1,
			DXR_CONFIG.address.street2,
			DXR_CONFIG.address.city,
			DXR_CONFIG.address.state,
			DXR_CONFIG.address.postCode,
			DXR_CONFIG.address.telephone);

			if (!success)
				restart();
			else
			{
				setTimeout(function() {
					page.evaluate(function() {
						document.querySelector('#placeOrder').click();
					});
				}, 10000);
			}

		}, 2000);

	});

	page.onConsoleMessage = function(message) {
		console.log(message);
	};

	page.onUrlChanged = function(url) {
		if (checkoutUrl == url)
			return;

		processPaypal(url);
	};
}

/*
 * processPaypal
 * Fills form with paypal details from config, then places the order.
 * Voila!
 */
function processPaypal(paypalUrl)
{
	if (DXR_CONFIG.justForFunMode)
		return;

	console.log('Confirming purchase with PayPal...');

	var page = require('webpage').create();

	page.onConsoleMessage = function(message) {
		console.log(message);
	};

	page.onUrlChanged = function(url) {};

	page.open(paypalUrl, function(status) {
		page.evaluate(function(u, p) {
			document.querySelector('#login_email').value = u;
			document.querySelector('#login_password').value = p;
			document.querySelector('#submitLogin').click();
		},
		DXR_CONFIG.paypal.username,
		DXR_CONFIG.paypal.password);
		
		setTimeout(function() {
			page.evaluate(function() {
				document.querySelector('#top_continue').click();
				console.log('Done!');
			});
		}, 10000);
	});
}

/*
 * restart
 * Refreshes keyword and restarts search.
 */
function restart()
{
	console.log('\n');
	keyword = DXR_CONFIG.keyword == null ? generateKeyword() : DXR_CONFIG.keyword;
	init();
}

init();







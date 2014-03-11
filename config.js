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

var DXR_CONFIG = {

	/*
	 * Keyword to search the DX catalogue with.
	 * Use null for a random search, or your desired keyword (which isn't as fun)
	 */
	keyword: null,

	/*
	 * Set this to true if you want to restart the search if no results were
	 * found, false if not.
	 */
	restartIfNoResults: false,

	/*
	 * This will limit the searches to the bounds of the desired price range.
	 * Everything is in USD for now. Also only use integers.
	 */
	priceRange: {
		from: 2,
		to: 5
	},

	/*
	 * Used to send DX your delivery address.
	 * Everything should be strings. Including the phone number.
	 */
	address: {
		email: "",
		firstName: "",
		lastName: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		postCode: "",
		telephone: ""
	},

	/*
	 * Your PayPal login details.
	 * It is presumed you a.) have a PayPal account and b.) have it linked to your bank account.
	 * It's untested with any other means of payment.
	 */
	paypal: {
		username: "",
		password: ""
	},

	/*
	 * Set this to true if you plan on using this to just find random stuff and laugh at it.
	 * Set to false for the real deal.
	 */
	justForFunMode: true

};
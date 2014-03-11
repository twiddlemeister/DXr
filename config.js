/*
 * Configuration file for DXr.
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
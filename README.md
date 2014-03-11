DXr
===

DXr is a JavaScript application leveraging PhantomJS that purchases a random product from DealExtreme when run.

DealExtreme is a magical place where you can purchase inexpensive electronics, providing you are willing to wait anywhere between 1 and n weeks for it to be delivered from Eastern Asia.

This was done solely because I thought it would be cool to schedule running this every week, thus having something arrive [roughly] every week that I have no idea about.

Use at your own risk, obviously.

Setup
-----
You'll need to download PhantomJS for starters. You can get that from [here](http://phantomjs.org/download.html "PhantomJS download link"). Once you have it, the simplest thing would be to just get the phantomjs binary and throw it into the root of the DXr folder.

Next you need to decide what you want to do with this software, so open config.js. If you want to test it out and not purchase anything, set justForFunMode to true. If you want to actually purchase something then add shipping address details and your PayPal login and then set justForFunMode to false.

**NOTE**
The program probably requires you to have your PayPal linked to your bank account. I haven't tested it with anything else.

Now just open terminal in the root of DXr and run:

```./phantomjs app.js
  
(Or phantomjs.exe for Windows)
  
If you're getting some weird logs regarding CoreText on Mac then add this to the end (I think they fixed this in the newer versions but just incase:)

```2> >(grep -v CoreText 1>&2)
  
Have fun. Don't buy any £1000 knock-off Android tablets by accident.
  

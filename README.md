#README: BOARD
####Boardgames are Overpowered And Really Delightful

###Purpose of the Website
BOARD is a website / webstore made by three brilliant students at NTNU, Norwegian University of Technology and Science, as a project for the course IT2805, Web Technology.

Although the store is not operational, i.e. you can’t actually buy anything, it shows how a possible webstore selling board games could be developed.

###Structure
This structure is also displayed in the website’s sitemap. The choice of putting the sitemap on the “Information” page was deliberate. From personal experience, the sitemap is not used except in rare circumstances, and thus have not been given a separate page.

- **website**
	- **company_information**
		- contact_us.html
		- site_info.html
		- tou.html
		- home
		- index.html
		- classic-index-html
		- family-index.html
		- party-index.html
	- **products.html**
		- quiz-index.html
		- shopping_cart.html
		- strategy-index.html
	- **products**
		- 5secondrule.html
		- agameofthrones.html
		- carcassonne.html
		- chezgoth.html
		- chupacabra.html
		- claustrophobia.html
		- dungeonlords.html
		- enigma.html
		- firefly.html
		- junta!.html
		- magewars.html
		- maxiyatzy.html
		- monopolydoctorwho.html
		- monopolyworldofwarcraft.html
		- starofafrica.html
		- starwarsthecardgame.html
		- therivalsforcatan.html
		- tickettoride.html
		- tickettorideanniversary.html

These folders are not available for the user, but contain information and files used in all or some of the sites:

- **website**
	- **images**
		- 5secondrule.jpg
		- agameofthrones.jpg
		- carcassonne.jpg
		- chezgoth.jpg
		- chupacabra.jpg
		- claustrophobia.jpg
		- dungeonlords.jpg
		- enigma.jpg
		- firefly.png
		- header-galaxy.png
		- junta!.jpg
		- magewars.jpg
		- monopolydoctorwho.jpg
		- monopolyworldofwarcraft.jpg
		- notfound.png
		- starofafrica.jpg
		- starwarsthecardgame.jpg
		- therivalsforcatan.jpg
		- tickettoride.jpg
		- tickettorideanniversary.jpg
	- **product-info**
		- 5secondrule.txt
		- agameofthrones.txt
		- carcassonne.txt
		- chezgoth.txt
		- chupacabra.txt
		- claustrophobia.txt
		- dungeonlords.txt
		- enigma.txt
		- firefly.txt
		- junta!.txt
		- magewars.txt
		- maxiyatzy.txt
		- monopolydoctorwho.txt
		- monopolyworldofwarcraft.txt
		- starofafrica.txt
		- starwarsthecardgame.txt
		- therivalsforcatan.txt
		- tickettoride.txt
		- tickettorideanniversary.txt
	- **stylization**
		- add_to_cart.js
		- clean_split_text.css
		- clean_text_page.css
		- featured_style.css
		- frontpage-animation.js
		- main_page_spesific.css
		- main_style.css
		- no-hover.js
		- product_index_page.css
		- product_style.css
		- safekeeping.css
		- scroll_style.js
		- shoppingcart.js
		- sidebar-shoppingcart.js

###Technical Description
**Form Controls**
To be able to check out, the user has to fill out a form on the shopping cart page. To validate these fields, we use JavaScript to check the inputs for valid data. The function, “isFormValid()”, goes through all the fields and pushes an error to a stack if field contain an error, which finally is displayed to the user. The erroneous fields are also highlighted in red to help the user figure out what’s wrong.

**CSS**
In total, we have 8 .css-files, and all of them are located in “/stylization/”. Each one adds some new elements or stylization to its pages, or even just to a single page. For example, the file “main_page_specific.css” only contains one rule. It it acts as a negator for some of the changes that will happen with the side-menus colour when JavaScript does its part.

**XML**
When we started creating this website, we decided quite early that it would be better for our structure to keep everything within HTML. But we found a very specific use for XML, and that was for our shopping cart. Payment Info (found in “/product-info/payment_info.xml”) contains <product> elements within <products>, and each <product> contains the <name>, <price> and <filename> tags. This corresponds to the upper-case name of the product, its price and its lower-case-no-space name, respectively. The lower-case name is included to easier generate links and get access to product images.

**JavaScript**
As with the .css-files, all .js-files are located in “/stylization/”. These files help to make the side-menu follow the page up and down when the user scrolls, and to manage everything that happens related to the shopping cart, e.g. adding and removing products, and calculating the total price on the fly.
If JavaScript get disabled, the site itself will work perfectly. The side-menu will not be as cool and glorious as it is now, but it will be functional. The only drawback is that the user can’t do any shopping, but it’s still possible to browse our stock and read the excellent descriptions.

**Multimedia**
We also decided to make an animation on the front page of our store, which highlightens a product that allegedly is rebated. To do this we made a canvas in our HTML code, which is then used through JavaScript to display the animation. This was done by using the “setInterval()” method, which draws one by one frame each 20ms. To make the shadow of the product image cycle through different colors, we used “hsl()” (hue, saturation, lightness), because it allows smooth transitions by simply iterating through 0-359 in the “hue” part. The text was also rotated, to give it a fancy look.

**Additional Comments**
During our project we learned about the term web safe colors, but chose to ignore it altogether. Web safe colours was primarily needed on older computers which only could display a very limited set of colors. On modern devices (even cellphones) this is no longer a general concern that needs special attention, so we discarded the concept.

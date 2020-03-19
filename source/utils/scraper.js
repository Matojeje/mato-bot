/**
 * ecosia-scraper (c) MIT Dania Rifki <iamrifki0@gmail.com>
 *
 * # Prelude:
 * Back in 2019, I was introduced to the Ecosia search engine
 * I never really liked it, it was pretty terrible in my opinion.
 * Search results are pretty eh, and image results frequently pops up unwanted images.
 *
 * In 2020, I decided to use it for an image scraping project, why you ask?
 * Since nobody uses it anymore, Search results come faster than Bing,
 * despite having the same engine as Bing.
 * Plus the image results are surprisingly readable,
 * which is why it only took a few minutes for me to write this.
 *
 * The image source output of Ecosia looks like this:
 * ```
 * <a
 *      class="image-result js-image-result js-infinite-scroll-item"
 *      style="background-color:#C19E0A; -m   s-flex-positive: 1.781954887218045; flex: 1.781954887218045;"
 *      href="https://i.ytimg.com/vi/btR7RBlXy7A/maxresdefault.jpg"
 *      data-image-id="EEE6638481CBC1B79506F1BD4BB3E6047AD1DC1C"
 *      data-src="https://tse4.mm.bing.net/th?id=OIP.oSlHwY9Yf55r-dYp50AEZgHaEK&amp;pid=Api"
 *      target="_blank"
 * >
 * ```
 *
 * While Google is COMPLETELY unparsable,
 * it's a mess to figure that out.
 *
 * So TL;DR:
 * I took advantage of a dead search engine and used it
 * to make one of the simplest image scrapers that actually works today.
 *
 * # Recommended Requirements (May still work in previous or future versions of dependencies):
 * * Babel 7 (Or you could convert the code to commonjs modules manually)
 * * axios 0.19
 * * node-html-parser 1.2
 */

"use strict";

import axios from "axios";
import { parse } from "node-html-parser";

/**
 * Scrapes Ecosia and returns a random image as a string from it.
 *
 * Note that I did hardcode a bit,
 * mostly because I can't figure out an elegant solution that works.
 *
 * @param  {string} keyword Keyword that's used to query Ecosia.
 * @return {string} A randomly generated result from Ecosia passed as a string.
 */
export default async function scrape(keyword) {
    const url = `https://ecosia.org/images?q=${keyword}`;
    try {
        // Request the page
        const response = await axios.get(url);

        // Parse the response
        const dom = parse(response.data);
        const imgs = dom.querySelectorAll("a.image-result");

        return imgs[Math.floor(Math.random() * imgs.length)].attributes.href;
    } catch (err) {
        console.error("", `[Info] Error: Unable to GET ${url}`);
        console.log(err);
    }
}

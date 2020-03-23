/**
 * Please use this instead if you're considering to put this in your own project:
 * https://gist.github.com/IamRifki/0cd9b93e74c73d4e09263fe625ec6a6a
 * It doesn't require Babel, and has a proper copyright notice.
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
 * @param   {string} keyword Keyword that's used to query Ecosia.
 * @returns {string} A randomly generated result from Ecosia passed as a string.
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

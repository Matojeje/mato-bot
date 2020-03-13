/**
 * 0BSD © Dania Rifki <iamrifki@gmail.com>
 *
 * The code is heavily based on Peter Evers' old images-scraper,
 * however I massively refactored it to use Classes and Modern JS features
 * Huge thanks to him for making the original.
 *
 * Please use this version instead if you want to use this script for your own project:
 * https://gist.github.com/IamRifki/24a4ee5170e919d80df616a8a652fc22
 */

"use strict";

import EventEmitter from "events";
import cheerio from "cheerio";
import got from "got";

export default class Scraper extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * Get the image src for all links, options.keyword is required.
     */
    list(options) {
        const self = this;

        if (!options || !options.keyword) {
            return Promise.reject(new Error("no keyword provided"));
        }

        const roptions = {
            url: "http://www.bing.com/images/search?q=%&view=detailv2".replace(
                "%",
                encodeURIComponent(options.keyword),
            ),
            "User-Agent":
                options.userAgent ||
                "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
        };

        const result = [];
        const num = options.num;
        const extract = url =>
            new Promise(resolve => {
                roptions.url = url;
                (async () => {
                    try {
                        const response = await got(roptions);

                        if (response.statusCode === 200) {
                            // extract all items, go to next page if exist
                            const $ = cheerio.load(response.body);
                            $('.item a[class="thumb"]').each(function(el) {
                                let item = $(this).attr("href");

                                const detail = $(this)
                                    .parent()
                                    .find(".fileInfo")
                                    .text();
                                item = {
                                    url: item,
                                    thumb: $(this)
                                        .find("img")
                                        .attr("src"),
                                    width: detail.split(" ")[0],
                                    height: detail.split(" ")[2],
                                    format: detail.split(" ")[3],
                                    size: detail.split(" ")[4],
                                    unit: detail.split(" ")[5],
                                };

                                self.emit("result", item);
                                result.push(item);
                            });

                            if (num && result.length > num) {
                                const out = result.slice(0, num);
                                self.emit("end", out);
                                return resolve(result.slice(0, num));
                            }

                            // search for current page and select next one
                            const page = $('li a[class="sb_pagS"]')
                                .parent()
                                .next()
                                .find("a")
                                .attr("href");
                            if (page) {
                                resolve(
                                    extract(
                                        `http://www.bing.com${page}&view=detailv2`,
                                    ),
                                );
                            } else {
                                self.emit("end", result);
                                resolve(result);
                            }
                        } else {
                            self.emit("end", result);
                            resolve(result);
                        }
                    } catch (error) {
                        console.log("error:", error);
                    }
                })();
            });

        return extract(roptions.url);
    }
}

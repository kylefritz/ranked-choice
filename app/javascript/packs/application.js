// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
// require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// include bable pollyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

//
// Sentry
//
import * as Sentry from '@sentry/browser';
Sentry.init({ dsn: 'https://885fd04e048147d1a623f514f5aa06fb@sentry.io/1793183' });

//
// ahoy
//
import ahoy from "ahoy.js";
ahoy.trackAll();
// ahoy.track("My second event", {language: "JavaScript"});

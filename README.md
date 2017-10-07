## MMM-StaticTides

A static display of the next 8 tides. Sister module to MMM-SimpleTides, which rotates.

## S.O.P.

As usual, this module was not made to compete with any others. I make simple modules
because I enjoy doing it. I try to keep them small so that they don't use too much
screen real estate. My hope is that they are all informative, or fun, or both.

## What you get

* A static display of the next 8 tides
* High/Low tide icon indicator, day and time of tide
* Name of the location of the tide station
* Tide station used is the closest to your longitude and latitude


## Examples

Annotated .css file included for position, sizing, and coloring. Default is white.

* Color it any way you like. Don't want the location? You got it!

![](images/1.JPG), ![](images/2.JPG),

## Installation

* `git clone https://github.com/mykle1/MMM-StaticTides` into the `~/MagicMirror/modules` directory.

* Free and immediate apiKey @ https://www.worldtides.info/developer

* apiKey works in MMM-SimpleTides and MMM-StaticTides

* No dependencies! No kidding!

## Config.js entry and options

    {
		disabled: false,
		module: "MMM-StaticTides",
		position: "top_left",
		config: {
			apiKey: "YOUR API KEY",          // free from https://www.worldtides.info/developer
			lat: "40.537661",                // your latitude
			lon: "-74.128333",               // your longitude
			useHeader: false,                // False if you don't want a header      
			header: "",                      // Change in config file. useHeader must be true
			maxWidth: "300px",
			animationSpeed: 3000,            // fade speed
			rotateInterval: 15 * 1000,       // seconds between tides displayed
		}
	},
	
## Going fishing or boating?

* Knowing the tides will help you plan your trip

## Thanks to @yawns for the green light on developing this module
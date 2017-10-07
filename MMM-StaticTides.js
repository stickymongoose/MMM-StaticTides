/* Magic Mirror
 * Module: MMM-StaticTides
 *
 * By Mykle1
 * 
 */
Module.register("MMM-StaticTides", {

    // Module config defaults.
    defaults: {
        apiKey: "",                    // Free apiKey @ https://www.worldtides.info/register
        lat: "",                       // your latitude
        lon: "",                       // your longitude
        useHeader: false,              // False if you don't want a header      
        header: "",                    // Change in config file. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,          // fade speed
        initialLoadDelay: 3250,
        retryDelay: 2500,
        updateInterval: 60 * 60 * 1000, // Equals 720 of 1000 free calls a month
    },


    getStyles: function() {
        return ["MMM-StaticTides.css"];
    },


    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
        this.url = "https://www.worldtides.info/api?extremes&lat=" + this.config.lat + "&lon=" + this.config.lon + "&length=604800&key=" + this.config.apiKey;
		this.tides = [];
        this.today = "";
        this.scheduleUpdate();
    },


    getDom: function() {

        var tides = this.tides;

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

		// Loading . . .
        if (!this.loaded) {
            wrapper.classList.add("wrapper");
            wrapper.innerHTML = "Roll tide . . .";
            wrapper.className = "bright light small";
            return wrapper;
        }

		// header
        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
		 
		 
        var top = document.createElement("div");
        top.classList.add("list-row");

		
        // place
        var place = document.createElement("div");
        place.classList.add("small", "bright", "place");
        place.innerHTML = this.station;
        top.appendChild(place);


        // Tide #1 = High/Low icon, day of the week, time of tide (am/pm)
        var date = document.createElement("div");
        date.classList.add("xsmall", "bright", "date");
		if (tides[0].type == "Low") {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[0].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[0].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[0].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[0].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date);
		
		
		// Tide #2 = High/Low icon, day of the week, time of tide (am/pm)
        var date2 = document.createElement("div");
        date2.classList.add("xsmall", "bright", "date2");
		if (tides[1].type == "Low") {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[1].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[1].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[1].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[1].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date2);
		
		
		// Tide #3 = High/Low icon, day of the week, time of tide (am/pm)
        var date = document.createElement("div");
        date.classList.add("xsmall", "bright", "date");
		if (tides[2].type == "Low") {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[2].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[2].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[2].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[2].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date);
		
		
		// Tide #4 = High/Low icon, day of the week, time of tide (am/pm)
        var date2 = document.createElement("div");
        date2.classList.add("xsmall", "bright", "date2");
		if (tides[3].type == "Low") {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[3].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[3].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[3].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[3].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date2);
		
		
		// Tide #5 = High/Low icon, day of the week, time of tide (am/pm)
        var date = document.createElement("div");
        date.classList.add("xsmall", "bright", "date");
		if (tides[4].type == "Low") {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[4].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[4].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[4].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[4].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date);
		
		
		// Tide #6 = High/Low icon, day of the week, time of tide (am/pm)
        var date2 = document.createElement("div");
        date2.classList.add("xsmall", "bright", "date2");
		if (tides[5].type == "Low") {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[5].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[5].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[5].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[5].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date2);
		
		
		// Tide #7 = High/Low icon, day of the week, time of tide (am/pm)
        var date = document.createElement("div");
        date.classList.add("xsmall", "bright", "date");
		if (tides[6].type == "Low") {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[6].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[6].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[6].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[6].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date);
		
		
		// Tide #8 = High/Low icon, day of the week, time of tide (am/pm)
        var date2 = document.createElement("div");
        date2.classList.add("xsmall", "bright", "date2");
		if (tides[7].type == "Low") {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/low.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[7].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[7].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        } else {
            date2.innerHTML = "<img class = img src=modules/MMM-SimpleTides/images/high.png width=12% height=12%>" + " &nbsp " + moment.utc(tides[7].dt * 1000).local().format("ddd") + " &nbsp" + moment.utc(tides[7].dt * 1000).local().format("  h:mm a"); // Stackoverflow.com
        }
		top.appendChild(date2);
		
        wrapper.appendChild(top);
	
        return wrapper;
    },


    processTides: function(data) {
        this.today = data.Today;
        this.station = data.station; // before extremes object
        this.tides = data.extremes; // Object
        this.loaded = true;
    //	console.log(this.tides); // for checking
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getTides();
        },this.config.updateInterval);
        this.getTides(this.config.initialLoadDelay);
    },

    getTides: function() {
        this.sendSocketNotification('GET_TIDES', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TIDES_RESULT") {
            this.processTides(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
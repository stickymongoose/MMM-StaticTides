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
        this.url = "https://www.worldtides.info/api?extremes&lat=" + this.config.lat + "&lon=" + this.config.lon + "&length=204800&key=" + this.config.apiKey;
		this.tides = [];
        this.today = "";
        this.scheduleUpdate();
    },


    getDom: function() {

        var tides = this.tides;

        var wrapper = document.createElement("div");
/*         wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth; */

		// Loading . . .
        if (!this.loaded) {
            wrapper.classList.add("wrapper");
            wrapper.innerHTML = "Roll tide . . .";
            wrapper.className = "bright light small";
            return wrapper;
        }

		// header
/*         if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        } */
		 
		 
/*         var top = document.createElement("div");
        top.classList.add("list-row");
 */		
        // DS

        var table = document.createElement("table");
        table.className = "small";
        
        for (var t in this.tides) {
            var tides = this.tides[t];

            var row = document.createElement("tr");
            table.appendChild(row);
            
            var dayCell = document.createElement("td");
            dayCell.className = "small";
            dayCell.innerHTML = tides.day;
            row.appendChild(dayCell);

            var timeCell = document.createElement("td");
            timeCell.className = "small";
            timeCell.innerHTML = tides.time;
            row.appendChild(timeCell);

            var heightCell = document.createElement("td");
            heightCell.className = "small";
            heightCell.innerHTML = tides.height;
            row.appendChild(heightCell);

            var typeCell = document.createElement("td");
            typeCell.className = "small";
            typeCell.innerHTML = tides.type;
            row.appendChild(typeCell);

        }

        return table;

/*         wrapper.appendChild(top);
	
        return wrapper; */
    },


    processTides: function(data) {
        this.tides = [];
        var tidesData = {}

        for (var i = 0, count = data.extremes.length; i < count; i++) {
            var tides = data.extremes[i];

            var day = moment(tides.dt, "X").format("ddd");
            var time = moment(tides.dt, "X").format("hh:mm a");
            var height = tides.height;
            var type = tides.type;

            var tidesData = {
                day: day,
                time: time,
                height: height,
                type: type
            };
            this.tides.push(tidesData)
        }
         this.today = data.Today;
/*        this.station = data.station; // before extremes object
        this.tides = data.extremes; // Object
        */this.loaded = true;/* 
    	console.log(this.tides); // for checking */
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

var turns = 0;

var   x = ["Vaccino", 0, 1, 12, 11, 46, 51, 19, 57, 44, 32, 43, 59, 131, 68, 68, 114]; 
/* var x="0"; */


function articoli(el) {
  if (el.style.color === 'magenta') {
    el.style.color = 'white';  
  }
  else (el.style.color = 'magenta')
}


am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dark);
// Themes end

/**
 * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
 */

// disclaimer: this data is not accuarate, don't use it for any puroposes
// first temperature is average for 1973-1980 period

console.log(x);

var temperatures = {
    "": [
        
     /*    x, */
        ["Vaccino", 0, 1, 12, 11, 46, 51, 19, 57, 44, 32, 43, 59, 131, 68, 68, 114],
/*         ["Guerre Stellari", 66, 118, 219, 466, 166, 192, 135, 135, 139, 109, 526, 437, 539, 183, 223, 254],
        ["Hamburger", 0, 30, 25, 28, 30, 15, 22, 45, 40, 15, 35, 14, 28, 31, 48, 39],
        ["Yoga", 70, 86, 76, 64, 40 , 80, 41, 36, 24, 155, 17, 15, 22, 17, 18, 17], */
        ["★ Star Trek", 168, 302, 178, 152, 131, 75, 60, 116, 52, 71, 52, 117, 106, 42, 30, 51], 
/*         ["Leonardo DiCaprio", 18, 55, 90, 129, 82, 154, 215, 346, 335, 288, 277, 580, 241, 142, 274, 315], */
      /*   ["Amatrice", 14, 36, 56, 28, 72, 67, 69, 39, 38, 16, 52, 183, 111, 65, 63, 26], */
        ["Barack Obama", 0, 48, 114, 505, 565, 167, 235, 266, 231, 233, 393, 419, 208, 248, 44, 37],
    /*     ["★ Cetacei", 38, 18, 41, 247, 36, 20, 39, 20, 19, 25, 16, 20, 11, 15, 41, 17],
        ["Rugby", 66, 169, 336, 95, 87, 81, 158, 84, 74, 45, 71, 63, 33, 37, 34, 45], */
       /*  ["Quarantena", 0, 0, 14, 6, 6, 9, 5, 2, 9, 6, 7, 4, 0, 3, 2, 87], */
       /*  ["★ Glicolisi", 42, 162, 25, 28, 41, 71, 32, 25, 12, 18, 25, 16, 25, 16, 18, 5], */
        ["Nepal", 56, 88, 119, 115, 109, 48, 42, 46, 37, 26, 102, 18, 29, 52, 53, 62],
       /*  ["Pasta", 19, 78, 362, 75, 152, 69, 86, 58, 77, 78, 105, 71, 57, 189, 217, 88],  */
    ]

}



var startYear = 2005;
var endYear = 2020;
var currentYear = 2021;
var colorSet = new am4core.ColorSet();

var chart = am4core.create("chartdiv", am4charts.RadarChart);

chart.hiddenState.properties.opacity = 0;

chart.startAngle = 270 - 180;
chart.endAngle = 270 + 180;

chart.padding(130,150,15,220)
chart.radius = am4core.percent(65);
chart.innerRadius = am4core.percent(40);

// year label goes in the middle
var yearLabel = chart.radarContainer.createChild(am4core.Label);
yearLabel.horizontalCenter = "middle";
yearLabel.verticalCenter = "middle";
yearLabel.fill = am4core.color("#ccff00");
yearLabel.fontSize = 420;
yearLabel.fillOpacity = 0.1;
yearLabel.text = String(currentYear);

// zoomout button
var zoomOutButton = chart.zoomOutButton;
zoomOutButton.dx = 0;
zoomOutButton.dy = 0;
zoomOutButton.marginBottom = 15;
zoomOutButton.parent = chart.rightAxesContainer;

// scrollbar
/* chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.parent = chart.rightAxesContainer;
chart.scrollbarX.orientation = "vertical";
chart.scrollbarX.align = "center";
chart.scrollbarX.exportable = false; */

// vertical orientation for zoom out button and scrollbar to be positioned properly
chart.rightAxesContainer.layout = "vertical";
chart.rightAxesContainer.padding(120, 20, 120, 20);

// category axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";

var categoryAxisRenderer = categoryAxis.renderer;
var categoryAxisLabel = categoryAxisRenderer.labels.template;
categoryAxisLabel.location = 0.5;
categoryAxisLabel.radius = 28;
categoryAxisLabel.relativeRotation = 90;

categoryAxisRenderer.fontSize = 16;
categoryAxisRenderer.minGridDistance = 10;
categoryAxisRenderer.grid.template.radius = -25;
categoryAxisRenderer.grid.template.strokeOpacity = 0;
categoryAxisRenderer.grid.template.interactionsEnabled = false;

categoryAxisRenderer.ticks.template.disabled = true;
categoryAxisRenderer.axisFills.template.disabled = true;
categoryAxisRenderer.line.disabled = true;

categoryAxisRenderer.tooltipLocation = 0.5;
categoryAxis.tooltip.defaultState.properties.opacity = 0;

// value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 600;
valueAxis.strictMinMax = true;
valueAxis.tooltip.defaultState.properties.opacity = 0;
valueAxis.tooltip.animationDuration = 0;
valueAxis.cursorTooltipEnabled = true;
valueAxis.zIndex = 10;

var valueAxisRenderer = valueAxis.renderer;
valueAxisRenderer.axisFills.template.disabled = true;
valueAxisRenderer.ticks.template.disabled = true;
valueAxisRenderer.minGridDistance = 20;
valueAxisRenderer.grid.template.strokeOpacity = 0.2;


// series
var series = chart.series.push(new am4charts.RadarColumnSeries());
series.columns.template.width = am4core.percent(90);
series.columns.template.strokeOpacity = 0;
series.dataFields.valueY = "value" + currentYear;
series.dataFields.categoryX = "country";
series.tooltipText = "{categoryX}:{valueY.value}";

// this makes columns to be of a different color, depending on value
series.heatRules.push({ target: series.columns.template, property: "fill", minValue: 0, maxValue: 600, min: am4core.color("#F6C8F5"), max: am4core.color('magenta'), dataField: "valueY" });

// cursor
var cursor = new am4charts.RadarCursor();
chart.cursor = cursor;
cursor.behavior = "zoomX";

cursor.xAxis = categoryAxis;
cursor.innerRadius = am4core.percent(40);
cursor.lineY.disabled = true;

cursor.lineX.fillOpacity = 0.25;
cursor.lineX.fill = am4core.color("#ccff00");
cursor.lineX.strokeOpacity = 0;
cursor.fullWidthLineX = true;

// year slider
var yearSliderContainer = chart.createChild(am4core.Container);
yearSliderContainer.layout = "vertical";
yearSliderContainer.padding(75, 110, 15, 25);
yearSliderContainer.width = am4core.percent(100);

var yearSlider = yearSliderContainer.createChild(am4core.Slider);
yearSlider.events.on("rangechanged", function () {
    updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
})
yearSlider.orientation = "horizontal";
yearSlider.start = 0.5;
yearSlider.exportable = false;

chart.data = generateRadarData();

function generateRadarData() {
    var data = [];
    var i = 0;
    for (var continent in temperatures) {
        var continentData = temperatures[continent];

        continentData.forEach(function (country) {
            var rawDataItem = { "country": country[0] }

            for (var y = 2; y < country.length; y++) {
                rawDataItem["value" + (startYear + y - 2)] = country[y];
            }

            data.push(rawDataItem);
        });

        createRange(continent, continentData, i);
        i++;

    }
    return data;
}


function updateRadarData(year) {
    if (currentYear != year) {
        currentYear = year;
        yearLabel.text = String(currentYear);
        series.dataFields.valueY = "value" + currentYear;
        chart.invalidateRawData();    
    }

    if(currentYear == '2005' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Star Trek" +"<br>" + "Viene riconosciuto come voce di qualità (★)" +"<br>" +"<br>" +"🡪 " +"Nepal"+ "<br>"+"Gyanendra licenza il governo nepalese"
    }
    else if(currentYear == '2006' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Nepal"+ "<br>"+ "Maioisti e Governo nepalese creano una Costituzione provvisoria";
    }
    else if(currentYear == '2007' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Nepal"+ "<br>"+"Approvazione di un emendamento costituzionale che avvia ad una Repubblica federale. ";
    }
    else if(currentYear == '2008' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Nepal"+ "<br>"+"Viene proclamata la Repubblica";
    }
    else if(currentYear == '2009' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Star Trek"+ "<br>"+"Esce al cinema il prequel Star Trek";
    }
    else if(currentYear == '2010' ){
        var elem = document.getElementById("informazioni").innerHTML =
         "";
    }
    else if(currentYear == '2011' ){
        var elem = document.getElementById("informazioni").innerHTML = 
        "🡪 " +"Nepal"+ "<br>"+"Viene eletto J. Khanal, nuovo primo ministro";
    }
    else if(currentYear == '2012' ){
        var elem = document.getElementById("informazioni").innerHTML =
         "";
    }
    else if(currentYear == '2013' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 " +"Star Trek"+ "<br>"+"Esce il film Into Darkness";
    }
    else if(currentYear == '2014' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "";
    }
    else if(currentYear == '2015' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 " +"Star Trek"+ "<br>"+"Viene annunciata la serie Star Trek: Discovery" +"<br>" + "<br>" + "🡪 " +"Nepal"+ "<br>"+"Un violento terremoto causa molte vittime." +"<br>" + "B. D. Bhandary diventa presidentessa del Nepal";
    }

    else if(currentYear == '2016' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 " + "Star Trek"+ "<br>"+"Cinquantenario della serie e uscita di Star Trek Beyond"  + "<br>" + "<br>" + "🡪 " + "Nepal" + "<br>"+ "Importanti accordi con la Cina"
    }
    else if(currentYear == '2017' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 "+"Star Trek"+ "<br>"+"Esce su Netflix la serie tv Star Trek: Discovery"+"<br>"+"<br>"+ "🡪 " +"Nepal"+"<br>"+"Il volo 409 della Summit Air precipita a Lukla."+"<br>"+"La pallavolo è sport nazionale" ;
    }
    else if(currentYear == '2018' ){
        var elem = document.getElementById("informazioni").innerHTML = "";
    }
    else if(currentYear == '2019' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 " +"Nepal"+ "<br>"+"Viene lanciato NepaliSat-1, primo satellite nepalese";
    }
    else if(currentYear == '2020' ){
        var elem = document.getElementById("informazioni").innerHTML =
        "🡪 " +"Star Trek"+ "<br>"+"Esordio della serie tv Star Trek: Picard"+"<br>"+"<br>"+ "Nepal"+ "<br>"+"Lockdown nazionale da Covid-19";
    }
    else{
        elem = document.getElementById("informazioni").innerHTML = "";
        elem.style.color = 'white';
    }

}

function createRange(name, continentData, index) {

    var axisRange = categoryAxis.axisRanges.create();
    axisRange.axisFill.interactionsEnabled = true;
    axisRange.text = name;
    // first country
    axisRange.category = continentData[0][0];
    // last country
    axisRange.endCategory = continentData[continentData.length - 1][0];

    // every 3rd color for a bigger contrast
    axisRange.axisFill.fill = colorSet;
    axisRange.grid.disabled = true;
    axisRange.label.interactionsEnabled = false;
    axisRange.label.bent = true;

    var axisFill = axisRange.axisFill;
    axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
    axisFill.radius = -20; // negative radius means it is calculated from max radius
    axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
    axisFill.fillOpacity = 0;
    axisFill.togglable = true;

    axisFill.showSystemTooltip = true;
    axisFill.readerTitle = "click to zoom";
    axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    axisFill.events.on("hit", function (event) {
        var dataItem = event.target.dataItem;
        if (!event.target.isActive) {
            categoryAxis.zoom({ start: 0, end: 1 });
        }
        else {
            categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
        }
    })

    // hover state
    var hoverState = axisFill.states.create("hover");
    hoverState.properties.innerRadius = -10;
    hoverState.properties.radius = -25;

    var axisLabel = axisRange.label;
    axisLabel.location = 0.5;
    axisLabel.fill = am4core.color("");
    axisLabel.radius = 3;
    axisLabel.relativeRotation = 0;
}

var slider = yearSliderContainer.createChild(am4core.Slider);
slider.start = 1;
slider.exportable = false;
slider.events.on("rangechanged", function () {
    var start = slider.start;

    chart.startAngle = 270 - start * 179 - 1;
    chart.endAngle = 270 + start * 179 + 1;

    valueAxis.renderer.axisAngle = chart.startAngle;
})

}); // end am4core.ready()



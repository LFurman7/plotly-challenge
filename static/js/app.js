function buildMetadata(sample) {
    // console.log(sample)
    d3.json("../samples.json").then(data => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]

        var Panel = d3.select("#sample-metadata");
        Panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            Panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    })
}

function buildCharts(sample) {
   // console.log(sample)
   d3.json("../samples.json").then(data =>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]
        console.log(result)

        var sample_values = result.sample_values.slice(0,10).reverse();
        var otu_ids = result.otu_ids.slice(0,10).reverse();
        var otu_labels = result.otu_labels.slice(0,10).reverse();

        var ticks = otu_ids.map(otuID => `OTU ${otuID}`)

        var BarData = [{
            x:sample_values,
            y: ticks,
            type:"bar",
            orientation: "h",
            text: otu_labels

        }]

        Plotly.newPlot("bar", BarData)

        var bubblelayout = {
            title:"BActeria Cultures (per Sample)",
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t:30}
        };

        var bubbleData = [{
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot("bubble", bubbleData, bubblelayout);
    })
}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("../samples.json").then(data => {
            
        var sampleNames = data.names;

        sampleNames.forEach(sample=> {
            selector
                .append("option")
                .text(sample)
                .property("value",sample);
        })
        
        var firstSample = sampleNames[0]

        buildCharts(firstSample);
        buildMetadata(firstSample);

    })
    
    
}

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample)
}

init();
function buildMetadata(sample) {}

function buildCharts(sample) {
   // console.log(sample)
   d3.json("../samples.json").then(data =>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]
        console.log(result)

        var sampleValues = result.sample_values.slice(0,10).reverse();
        var otu_ids = result.otu_ids.slice(0,10).reverse();
        var otu_labels = result.otu_labels.slice(0,10).reverse();

        var ticks = otu_ids.map(otuID => `OTU ${otuID}`)

        var BarData = [{
            x:sampleValues,
            y: ticks,
            type:"bar",
            orientation: "h",
            text: otu_labels

        }]

        Plotly.newPlot("bar", BarData)

    })
}

function init() {
    var select = d3.select(#selDataset);

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
            })
    }




        
        console.log(`OTU IDS: ${otu_labels}`)
   });
}

function init() {


    var selector = d3.select("#selDetaset");

    d3.json("../samples.json").then(data => {

       var sampleNames = data.names;

       sampleNames.forEach(sample => {
           selector
                .append("option")
                .text(sample)
                .property("value", sample);
       })

       var firstSample = sampleNames[0]

       // console.log(firstSample) 
        buildCharts(firstSample);
    })

    
   // buildMetadata(firstSample);

}

function optionChanged(newSample) {
   // buildCharts(newSample);
  //  buildMetadata(newSample)
}

init();
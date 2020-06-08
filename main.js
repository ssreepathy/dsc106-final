document.addEventListener('DOMContentLoaded', function() {
    Highcharts.getJSON('year_emissions.json', function(data) {
        let points = [];
        let years = [];
        let total = data[data.length - 1];
        for (i = 0; i < Object.keys(total).length; i++) {            
            points.push([Object.keys(total)[i], parseFloat(Object.values(total)[i])]);
            years.push(Object.keys(total)[i])
        }
        let superscript = 'CO' + '\u2082'
        console.log(superscript);
        Highcharts.chart('line', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Change in '+ superscript  + ' Emissions from 1990-2018'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2018><u>Source</u></a>',
                color: '#FFF'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'MMT of ' + superscript + ' (Million Metric Tons)'
                }
            },
            tooltip: {
                valueSuffix: ' MMT'
            },
            xAxis: {
                title: {
                    text: 'Year'
                }         
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    marker: {
                        enabled: false
                    },
                    pointStart: 1990
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'right',
                verticalAlign: 'top'
            },
            series: [{
                name: 'Total ' + superscript,
                color: '#568AAF',
                data: points
            }]
        })
    })
})

document.addEventListener('DOMContentLoaded', function() {
    Highcharts.getJSON('emissions_type.json', function(data) {
        let co2_amount = 0;
        let ch4_amount = 0;
        let n20_amount = 0;
        for (i = 0; i < 3; i++) {
            if (data[i].Gas === 'CO2') {
                co2_amount += data[i][2018]
            }
            if (data[i].Gas === 'CH4') {
                ch4_amount += data[i][2018]
            }
            if (data[i].Gas === 'N2O') {
                n20_amount += data[i][2018]
            }
        }
        Highcharts.chart('pie', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Types of Gases'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2018><u>Source</u></a>',
                color: '#FFF'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                valueSuffix: ' MMT'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Quantity',
                data: [{
                    name: 'CO' + '\u2082',
                    y: co2_amount
                }, {
                    name: 'CH' + '\u2084',
                    y: ch4_amount
                }, {
                    name: 'N' + '\u2082' + 'O',
                    y: n20_amount
                }]
            }]
        })
    })
})


document.addEventListener('DOMContentLoaded', function() {
    mapData = Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small']);
    Highcharts.getJSON('emissions_states.json', function(data) {
        statesVals = [];
        for (i = 0; i < data.length; i++) {
            statesVals.push({ucName: data[i]['State'], value: parseFloat(data[i][2017])})
        }
        mapData = Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small']);
        mapData.forEach(function (p) {
        var path = p.path,
        copy = {
            path: path
        };
        
        if (path[0][1] === 9727) {
        
        Highcharts.seriesTypes.map.prototype.getBox.call({}, [copy]);
        
        p.middleX = ((path[0][1] + path[1][1]) / 2 - copy._minX) / (copy._maxX - copy._minX); // eslint-disable-line no-underscore-dangle
        p.middleY = ((path[0][2] + path[2][2]) / 2 - copy._minY) / (copy._maxY - copy._minY); // eslint-disable-line no-underscore-dangle
        
        }
        
        p.ucName = p.name.toUpperCase();
        });
        
        Highcharts.mapChart('state', {
            title: {
                text: 'Adjusted CO'+ '\u2082' + ' Emissions Per State 2017'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://www.eia.gov/environment/emissions/state/><u>Source</u></a>',
                color: '#FFF',
                y: 70
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 13.5
            },
            xAxis: {
                labels: {
                    enabled: false
                }
            },
            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#00FF00'],
                    [0.5, '#FFFF00'],
                    [1, '#500007']
                ]
            },    
            series: [{
                mapData: mapData,
                y: 50,
                data: statesVals,
                joinBy: 'ucName',
                name: 'CO' + '\u2082' + ' Million Metric Tons',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.point.properties['hc-a2'];
                    },
                    style: {
                        fontSize: '10px'
                    }
                },
                tooltip: {
                    pointFormat: '{point.name}: {point.value} MMT'
                }
                },  {
                type: 'mapline',
                data: Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small'], 'mapline'),
                color: 'silver'
            }]
        });
    })
})

document.addEventListener('DOMContentLoaded', function() {
    Highcharts.getJSON('emissions_sectors.json', function(data) {
        sectorVals = [];
        for (i = 0; i < data.length; i++) {
            sectorVals.push(parseFloat(data[i][2018]))
        }
        Highcharts.chart('sector', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Emissions of Each Sector 2018'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2018><u>Source</u></a>',
                color: '#FFF'
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Transportation',
            'Electric Power', 'Industrial', 'Residential', 'Commercial'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    x: -10,
                    text: 'CO' + '\u2082' + ' in Million Metric Tons',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' CO' + '\u2082' + ' (MMT)'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    pointWidth: 40
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                x: -10,
                y: -80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            series: [{
                name: 'Transportation',
                data: [sectorVals[1], null, null, null, null]
            }, {
                name: 'Electric Power',
                data: [null, sectorVals[2], null, null, null]
            }, {
                name: 'Industrial',
                data: [null, null, sectorVals[3], null, null]
            }, {
                name: 'Residential',
                data: [null, null, null, sectorVals[4], null]
            }, {
                name: 'Commercial',
                data: [null, null, null, null, sectorVals[5]]
            }]
        })
    })
})

document.addEventListener('DOMContentLoaded', function() {
    Highcharts.getJSON('yearlytemp.json', function(data) {
        let points = [];
        for (i = 0; i < data.length; i++) {
            points.push([Object.values(data[i])[0], parseFloat(Object.values(data[i])[1])])
        }
        Highcharts.chart('happening', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Change in Temperature from 1880-2019'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://data.giss.nasa.gov/gistemp/><u>Source</u></a>',
                color: '#FFF'
            },
            yAxis: {
                min: -1,
                title: {
                    text: 'Change in \xB0C'
                }
            },
            xAxis: {
                title: {
                    text: 'Year'
                }         
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: '\xB0C'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    marker: {
                        enabled: false
                    },
                    pointStart: 1880
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'right',
                verticalAlign: 'top'
            },
            series: [{
                name: 'Temperature Change',
                color: '#CA441F',
                data: points
            }]
        })
    })
})

document.addEventListener('DOMContentLoaded', function() {
    Highcharts.getJSON('electricvehicles.json', function(data) {
        let dataPoints = Object.keys(data).map(function (key) { 
            return [Number(key), data[key]]; 
        });
        let years = [];
        let yearsLabels = [];
        for (i = 0; i < dataPoints.length; i++) {
            yearsLabels.push(dataPoints[i][0])
            years.push(parseFloat(Object.values(dataPoints[i][1])[0].replace(/,/g, '')))
        }
        Highcharts.chart('solution', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Sales of Electric Vehicles from 2011-2019'
            },
            subtitle : {
                useHTML: true,
                text: '<a href=https://afdc.energy.gov/data/><u>Source</u></a>',
                color: '#FFF'
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: yearsLabels,
                title: {
                    text: 'Year'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Vehicles Sold',
                    align: 'middle'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' cars'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    pointWidth: 40
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            series: [{
                name: 'Electric Vehicle Sales',
                color: '#389129',
                data: [years[0], years[1], years[2], years[3], years[4], years[5], years[6], years[7], years[8]]
            }]
        })
    })
})


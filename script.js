$(document).ready(function(){
  buildGraph()
});

function convertCandidate(candidate) {
  var convertedCandidate = {};
  convertedCandidate.name = candidate.candidate_name;
  convertedCandidate.x = candidate.total_receipts;
  convertedCandidate.y = candidate.total_disbursements;
  convertedCandidate.party = candidate.party_full;

  return convertedCandidate;
}

function buildGraph(){
  var url =  "https://api.open.fec.gov/v1/elections/?sort=-total_receipts&per_page=20&office=president&cycle=2016&api_key=bDVXHl2MqHZc7Lj6G6RnFlOZpRNwvftTcRnZ9EKx&page=1"
  $.getJSON(url)
  // .then(convertResultsToObjects)
  .then(function(response){
    console.log(response)

    var results = response.results;
    var convertedResults = _.map(results, convertCandidate);
    var groupedCandidates = _.groupBy(convertedResults, 'party');
    console.log(groupedCandidates)


    $('#candidates-graph').highcharts({
      chart: {
        type: 'scatter'
      },
      title: {
        text: 'Election Funds'
      },
      tooltip: {
          pointFormat: '<b>{point.name}</b><br/>Money Raised: {point.x}<br/>Money Spent: {point.y}'
      },
      xAxis: {
          title: {
              enabled: true,
              text: 'Money Raised'
          },
                // startOnTick: true,
                // endOnTick: true,
                // showLastLabel: true
            },

      yAxis: {
          title: {
              text: 'Money Spent'
          }
      },
      series: [
        {
          name: 'Republican',
          color: 'rgba(223, 83, 83, .5)',
          data: groupedCandidates["Republican Party"]
        },
        {
          name: "Democratic",
          color: "blue",
          data: groupedCandidates["Democratic Party"]
        }

      ]
    });
  })
}

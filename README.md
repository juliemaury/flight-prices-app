
Use of React JS + Bootstrap for the responsive design

My app is made of 7 components : 

-> FromDest : Departure Airport
-> Switch : .svg file
-> ToDest : Arrival Airport 
-> MonthPickerInput : a react month picker 
-> Calendar : .svg file
-> Table
-> Loading : .svg file

I used axios to fetch the data from the API

/////////////////////////////// Problems I faced & solutions

Error when trying to get data from https://www.csa.cz/Umbraco/Api/DestinationCache/GetAllDestinations/?destinations_language=en

-> No Access-Control-Allow-Origin header is present on the requested resource.
-> Test with another source that had the requested Access-Control-Allow-Origin header (https://randomuser.me/api/?results=50&nat=us,dk,fr,gb) -> got an answer. Solution : use a proxy.

//////////////////

Setting a max-height to a table table not possible 
-> tbody in display block and tr in display inline-table
-> percentage to the th because they were not aligned with the columns

//////////////////





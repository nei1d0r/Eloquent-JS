// BUILD A TABLE -------------------------------------------------------

<h1>Mountains</h1>

<div id="mountains"></div>

<script>
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

  // Your code here
  headArray = []
  MOUNTAINS.map((mountain) => {
  	return Object.keys(mountain).map((key) => {
      if (!headArray.includes(key)) headArray.push(key) 
    })
  })
  const rowArray = MOUNTAINS.map((mountain) => {
    return Object.keys(mountain).map((key) => mountain[key])
  })
  
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  table.appendChild(thead)
  // loop over headers and append to th
  headArray.forEach((head) => {
    const th = thead.appendChild(document.createElement('th'))
      th.appendChild(document.createTextNode(head)
    )
  })
  
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  rowArray.forEach((row) => {
	const tRow = document.createElement('tr')
    row.forEach((rData) => {
      const td = document.createElement('td')
      td.appendChild(document.createTextNode(rData))
      if (typeof rData == 'number') td.style["text-align"] = "right"
      tRow.appendChild(td)
    })
    tbody.appendChild(tRow)
  })
  const div = document.getElementById('mountains')
  div.appendChild(table)
</script>

// ELEMENTS BY TAG NAME ------------------------------------------------------

<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
const byTagName = (node, tagName) => {
  tagName = tagName.toUpperCase();
  var hasTagName = [];

  checkChildNode(node.firstChild); // check node's first child
  return hasTagName; 
    
  function checkChildNode(node) { 
    while (node) { // while node exists
      if (node.nodeType == 1 && node.tagName) { // if node is an element
        if (node.tagName === tagName) { // if node's tag name matches given tagName
          hasTagName.push(node); // add node to hasTagName array
        }
        checkChildNode(node.firstChild); // check node's first child recursively
      }
      node = node.nextSibling; // reassign node to its next sibling
    }
  } 
}
  

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>

function createList(){
  var s;
  s = "<ul>"
    + "<li>Armagetiton</li>"
    + "<li>Position Impossible</li>"
    + "<li>Jamaican Me Crazy</li>"
    + "</ul>";

  divMovies = document.getElementById("divMovies");
  divMovies.innerHTML = s;
}

function gametime(){
  //creating individual node. Create text.
  title = document.createTextNode("Here are some things!");
  //Creating an unordered list
  //Create element node.
  list = document.createElement("ul");
  item1 = document.createElement("li");
  //Create text.
  text1 = document.createTextNode("Old Dan");
  //Put inside the li text.
  item1.appendChild(text1);

  item2 = document.createElement("li");
  text2 = document.createTextNode("Chicken Wings");
  item2.appendChild(text2);

  item3 = document.createElement("li");
  text3 = document.createTextNode("Tuna");
  item3.appendChild(text3);

  //Put inside ul
  list.appendChild(item1);
  list.appendChild(item2);
  list.appendChild(item3);

  theD = document.getElementById("theD");
  theD.appendChild(title);
  theD.appendChild(list);
}


function dude(){
  table = document.getElementById("table");
  th = document.getElementById("tableHead");
  item1 = document.getElementById("item1");
  item2 = document.getElementById("item2");

  //Changing the class
  table.className = "dudeTable";
  th.className = "dudeHead";
  item1.className = "dudeItems";
  item2.className = "dudeItems";
}


function chick(){
  table = document.getElementById("table");
  th = document.getElementById("tableHead");
  item1 = document.getElementById("item1");
  item2 = document.getElementById("item2");

  //Changing the class
  table.className = "chickTable";
  th.className = "chickHead";
  item1.className = "chickItems";
  item2.className = "chickItems";
}

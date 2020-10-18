var canvas = document.getElementById("crewmateCanvas");
var context = canvas.getContext("2d");

var crewmate = {
  background: this.data[0].items[0].url,
  character: this.data[1].items[0].url,
  hat: this.data[2].items[0].url,
  dress: this.data[3].items[0].url,
  pet: this.data[4].items[0].url
}

loadMenu = () => {
  let divMenu = document.getElementById("menu");
  divMenu.innerHTML = "";

  this.data.forEach(t => {
    let img_el = document.createElement("img");
    img_el.src = t.url;
    img_el.width = 75;
    img_el.height = 75;
    img_el.onclick = () => {
      let selectedItemURL = this.crewmate[t.key];
      console.log(selectedItemURL);
      const selectedId = this.data.find(a => a.key === t.key).items.find(i => i.url === selectedItemURL).id;
      this.loadItems(t.key, selectedId);
    }
    divMenu.appendChild(img_el);
  });
}

var lastSelected_elm;
loadItems = (key, selectedId) => {
  let divItems = document.getElementById("items");
  divItems.innerHTML = "";
  this.data.find(t => t.key === key).items.forEach(item => {
    let img_el = document.createElement("img");
    img_el.src = item.url;
    img_el.width = 75;
    img_el.height = 75;
    if(item.id === selectedId)
    {
      img_el.classList.add("selected");
      lastSelected_elm = img_el;
    }

    img_el.onclick = (ev) => {
      this.crewmate[key] = item.url;
      lastSelected_elm.classList.remove("selected");
      img_el.classList.add("selected");
      lastSelected_elm = img_el;
      drawCremate();
    }
    divItems.appendChild(img_el);
  });
}

var imgs = {};
var drawCremate = () =>
{
  for(let key in crewmate)
  {
    let img = new Image();
    img.src = crewmate[key];
    imgs[key] = img;
    img.onload = () => {
      if(key === "pet")
      {
        addImagesToCanvas(imgs);
      }
    }
  }
}

addImagesToCanvas = (images) => {
  context.clearRect(0,0,600,600);
  for(let key in images)
  {
    const image = images[key];
    let x = 0;
    let y = 0;
    if(key === "pet")
      x = -50

    context.drawImage(image,x,y);
  }
}

loadMenu();
loadItems("background", 1);
drawCremate();
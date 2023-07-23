$("body").on("click", ".btn-add", e => state.addItem(e.target.value));
$("body").on("click", ".btn-addquan", e => state.addquan(e.target.value));
$("body").on("click", ".btn-modal", () => state.showModal());
$("body").on("click", ".btn-delete", e => state.deleteItem(e.target.value));
$("body").on("click", ".btn-checkout", () => state.checkout());
const state = {
  products: [],
  entity: {
    item: {},
    isShow: false,
  },

  addItem: value => {
    var datas = value.split("|");
    var { id, name, price, capital, margin, loss, qnty, index } =
      state.entity.item;
    var products = state.products;
    var exist = products.find(product => product.id == datas[0]);
    if (exist && exist.id) {
      let model = state.products[exist.index];
      model.qnty = model.qnty + 1;


      /** */
      const entries = Object.entries(state.products)
      let totalitemquantities = 0
      for (let x in entries){
        totalitemquantities += entries[x][1].qnty
      }
      $("#badge").html(`${totalitemquantities}`);
      /** */

      state.products = [...model];
    } else {
      index = products.length;
      id = datas[0];
      name = datas[1];
      price = datas[2];
      capital = datas[3];
      margin = datas[4];
      loss = datas[5];
      qnty = 1;
      products.push({ id, name, price, capital, margin, loss, qnty, index });

      /** */
      const entries = Object.entries(state.products)
      let totalitemquantities = 0
      for (let x in entries){
        totalitemquantities += entries[x][1].qnty
      }
      $("#badge").html(`${totalitemquantities}`);
      /** */
    }



    //$("#badge").html(`${state.products.length}`);
  },

  //hide and show modal
  showModal: async () => {
    if (state.entity.isShow) {
      $("#myModal").hide();
    } else {
      await state.showItems();
      $("#myModal").show();
    }
    state.entity.isShow = !state.entity.isShow;
  },

  //writer of items
  showItems: () => {
    $("#item_list").empty();
    let main = $("#item_list");
    let total = 0;
    state.products.map((product, index) => {
      total += product.price * product.qnty;
      let box = $("<div>", { class: "box" });
      let ul = $("<ul>");
      $("<h2>", {
        class: "title",
        html: `${product.name}`,
      }).appendTo(box);

      $("<div>", {
        class: "price",
        html: `$${product.price}<span>/monthly</span>`,
      }).appendTo(box);

      $("<li>", { html: `${product.capital}+ Minimum Capital` }).appendTo(ul);
      $("<li>", { html: `${product.margin}` }).appendTo(ul);
      $("<li>", { html: `${product.loss}` }).appendTo(ul);
      /*
      $("<li>", {
        style: "color:red",
        html: `Quantity <b>${product.qnty}</b>`,
      }).appendTo(ul);
      */

      ul.appendTo(box);

      /*
      $("<button>", {
        class: "btn btn-delete",
        value: `${product.id}`,
        html: "Delete",
      }).appendTo(box);
      */
      //Additional Testing
      let quantitybtns = `
        <button class="btn btn-addquan" value="${product.id}">+</button>
        <div style="color: #814096; padding: 1rem; width: 50px; font-size: 2.5rem;">
          <b>${product.qnty}</b>
        </div>
        <button class="btn btn-delete" value="${product.id}">
            -
        </button>
      `
      /*
      $("<button>", {
        class: "btn btn-add",
        value: `${product.id}`,
        html: "+",
      })

      */
      $("<div>",
        {
          class : "quantities",
          style : "display:flex; justify-content:center;align-items: center; width: 50%; margin: auto;gap: 3rem;",
          html : `${quantitybtns}`,
        }).appendTo(box);
        
      main.append(box);
    });
    $("#check").html(`Check out total of <b>${total}</b>`).value = total;
  },

  deleteItem: i => {
    const entries = Object.entries(state.products)
    let mainnum = 0
    for (let x in entries){
      console.log(entries[x][1])
      if (entries[x][1].id == i){
        mainnum = entries[x][0]
        break
      }
    }


    //let data = state.products.filter(p => p.id !== i);
    //state.products = data;

    state.products[mainnum]["qnty"] = state.products[mainnum]["qnty"] - 1

    if (state.products[mainnum]["qnty"] == 0){
      let data = state.products.filter(p => p.id !== i);
      state.products = data;
    }

    /** */
    let totalitemquantities = 0
    for (let x in entries){
      totalitemquantities += entries[x][1].qnty
    }
    /** */
    

    $("#badge").html(`${totalitemquantities}`);
    state.showItems();


  },
  addquan : i=>{
      const entries = Object.entries(state.products)
      let mainnum = 0
      for (let x in entries){
        console.log(entries[x][1])
        if (entries[x][1].id == i){
          mainnum = entries[x][0]
          break
        }
      }    

      /** */
      let totalitemquantities = 0
      for (let x in entries){
        totalitemquantities += entries[x][1].qnty
      }
      /** */

      state.products[mainnum]["qnty"] = state.products[mainnum]["qnty"] + 1

      $("#badge").html(`${totalitemquantities}`);
      state.showItems();
  },
  checkout: () => {
    alert("All items are checked out");
    state.products = [];
    $("#badge").html(`${state.products.length}`);
    state.showModal();
  },

};

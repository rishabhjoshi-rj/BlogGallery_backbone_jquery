var Blog = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    blog_text: "",
  },
});
const app = $("#cards");
const container = $("<div/>", {
  class: "row",
}).appendTo("#cards");

window.onload = function () {
  $("#top").hide();
  $("#cards").hide();
};

var count = 0;
var blogText_full = [];

var Homescreen = Backbone.View.extend({
  el: "body",
  initialize: function () {
    listview = new ListView();
    console.log("Helloooooo");
  },
  events: {
    "click button#addbtn2": "rishabh",
  },
  rishabh: function (e) {
    x = $("#landing");
    console.log("HHHHH");

    e.preventDefault();

    if (e.target.innerHTML === "Add New Blog") {
      $("#cards").show();
      e2 = e.target.parentElement.parentElement;

      $(x).hide();

      $("#top").show();
    }
  },
});

var Blogs = Backbone.Collection.extend({});
var blogs = new Blogs();

//ListView
var ListView = Backbone.View.extend({
  el: "body",
  initialize: function () {
    formview = new FormView();
    blogsView = new BlogsView();
    pageview = new pageView();
  },
});

//Formview
var FormView = Backbone.View.extend({
  el: "#top",
  initialize: function () {
    console.log("Enter the form777");
  },
  events: {
    "click button#addnew2": "addme",
  },
  addme: function (e) {
    e.preventDefault();

    console.log("formaddnew");
    var blog = new Blog({
      title: $("#title").val(),
      author: $("#author").val(),

      blog_text: $("#BlogText").val(),

      url: $("#url").val().toString(),
    });

    if (
      $("#title").val() === "" ||
      $("#author").val() === "" ||
      $("#BlogText").val() === ""
    ) {
      const div = $("<div/>", {
        class: "alert alert-danger",
        text: "Please fill in all Fields",
      });
      const container = $("#topcontainer");
      const form = $("#book-form");
      div.insertBefore(form);
      setTimeout(() => $(".alert").remove(), 2000);
    } else {
      $("#title").val("");
      $("#author").val("");

      $("#BlogText").val("");
      $("#url").val("");

      blogs.reset();
      blogs.add(blog);

      const div = $("<div/>", {
        class: "alert alert-success container mt-3",
        text: "Blog Added Successfully to homescreen",
        style: "text-align:center",
      });

      const container = $("body");
      const form = $("#alertdiv");
      div.insertBefore(form);
      setTimeout(() => $(".alert").remove(), 2000);

      $("#landing").show();
      $("#top").hide();
    }
  },
});

var pageView = Backbone.View.extend({
  el: "#cards",

  initialize: function () {
    console.log("PageView");
  },
  events: {
    "click button#viewbt": "view",
  },
  view: function (e) {
    var landing = $("#landing");
    var enlarged = $("#enlarged");
    console.log("DDDDDDDD");
    e2 = e.target.parentElement;

    $("#landing").hide();
    $("#enlarged").show();

    back = $("<button/>", {
      id: "btn_back",
      class: "btn btn-success btn-lg",
      text: "GO BACK",
    });

    edit = $("<button/>", {
      id: "edit",
      class: "btn btn-info btn-lg",
      text: "Edit",
    });

    save = $("<button/>", {
      id: "save",
      class: "btn btn-success btn-lg",
      text: "Save",
    });

    // Country Name of particular click
    const img = e2.querySelector("img").src;
    var title = e2.querySelector("#titles").innerHTML;

    const h = $("<h1/>", {
      id: "h",
      class: "display-4",
      html: title,
    });

    var author = e2.querySelector("#authors").innerHTML.substring(42);

    h1 = $("<h2/>", {
      id: "h1",
      style: "font-family:sohne, 'Helvetica Neue'",
      html: `<i class="fas fa-user"></i>` + author,
    });

    var blog = blogText_full[e2.id[4] - 1];

    h2 = $("<h1/>", {
      class: "display-4",
      id: "h2",
      style: "font-family: 'Roboto', sans-serif",
      html: blog,
    });

    var current_date = $("<p/>", {
      style: "font-weight:400",
      html: new Date().toString().substring(4, 15),
    });

    var blog_heading = $("<h1/>", {
      class: "display-4",

      style: "text-align:center",
      html: "Blog",
    });

    const image = $("<img/>", {
      id: "img3",
      src: img,
    });

    $("#save").hide();

    var cardBig = $("<div/>", {
      class: "card",
      id: "cardBig",
    });

    var cardBig1 = $("<div/>", {
      class: "card-header",
    });

    var cardBig2 = $("<div/>", {
      class: "card-body",
    });
    cardBig1.append(image);

    cardBig2.append(h);
    cardBig2.append(h1);
    cardBig2.append(current_date);
    cardBig2.append(blog_heading);
    cardBig2.append(h2);
    cardBig2.append(back);
    cardBig2.append(edit);
    cardBig2.append(save);

    cardBig.append(cardBig1);
    cardBig.append(cardBig2);

    enlarged.append(cardBig);

    $("#edit").on("click", (e) => {
      $("body").addClass("editing");
      $("#edit").hide();
      $("#save").show();
      console.log($("#h").html());

      var title = document.querySelector("#h").innerHTML;
      var author = document.querySelector("#h1").innerHTML.substring(46);
      var summary = document.querySelector("#h2").innerHTML;

      $("#h").html(
        '<input type="text" class="form-control title-update" value="' +
          title +
          '">'
      );
      $("#h1").html(
        '<input type="text" class="form-control author-update" value="' +
          author +
          '">'
      );

      $("#h2").html(
        '<textarea class="form-control summary-update"  rows="8" cols="200" value="' +
          summary +
          '"></textarea>'
      );
    });
    $("#save").on("click", function (e) {
      $("body").removeClass("editing");
      $("#save").hide();
      $("#edit").show();

      $("#h").html($(".title-update").val());

      $("#h1").html(`<i class="fas fa-user"></i>` + $(".author-update").val());

      if ($(".summary-update").val() == "") {
        $("#h2").html($(".summary-update").attr("value"));
      } else {
        console.log("ouuu");
        $("#h2").html($(".summary-update").val());
      }

      const a = $("#h").html();
      const b = $("#h1").html();

      $("#titles").html(a);
      $("#authors").html(b);
    });

    $("#btn_back").on("click", function (e) {
      if ($(landing).hide()) {
        $(landing).show();
      }
      enlarged.html("");
    });
  },
});

top.addEventListener("click", (e) => {
  c = $("#cards");
  x = $("#landing");
  var top = $("#top");
  if (e.target.innerHTML === "Go Back to Homescreen") {
    e.preventDefault();
    x.show();
    top.hide();
  }
});

//Cardview
var BlogsView = Backbone.View.extend({
  model: blogs,

  initialize: function () {
    console.log("HELLO");
    var self = this;
    this.model.on("add", this.render, this);
  },
  render: function () {
    var self = this;
    this.$el.html("");

    _.each(this.model.toArray(), function (book) {
      const card = $("<div/>", {
        class: "card col-xs-12 col-sm-12 col-md-6 col-lg-3",
      });

      const card1 = $("<div/>", {
        class: "card-header",
      });

      const img = $("<img/>", {
        id: "imgs",
        src: book.get("url"),
      });

      if (book.get("url") === "") {
        img.attr(
          "src",
          "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        );
      }

      card1.append(img);

      var card2 = $("<div></div>", {
        id: "card2",
        class: "card-body",
      });

      var h1 = $("<p></p>", {
        id: "titles",
        text: book.get("title"),
      });

      var h2 = $("<p></p>", {
        id: "authors",
        html: `<i class="fas fa-user"></i>` + book.get("author"),
      });

      blogText_full.push(book.get("blog_text"));

      var h3 = $("<p></p>", {
        id: "summary",
        text: `Summary: ${book.get("blog_text")}`,
      });

      var butrj = $("<button/>", {
        class: "rjbt btn btn-info",
        text: "View Blog",
        id: "viewbt",
      });

      card2.append(h1);
      card2.append(h2);
      if (book.get("blog_text").length > 133) {
        const text = book.get("blog_text").substring(0, 132);
        h3.textContent = `Summary: ${text}`;
      }
      card2.append(h3);

      card.append(card1);
      card.append(card2);
      card.append(butrj);

      count = count + 1;
      if (count > 0) {
        $("#headCount").remove();
      }
      card.attr("id", `card` + count);

      container.append(card);
    });

    return this;
  },
});

var homescreen = new Homescreen();

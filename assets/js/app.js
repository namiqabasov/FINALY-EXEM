const bars = document.querySelector(".bars");
const myul = document.querySelector(".myul");
const Detals = document.querySelector(".Detals");
const porfol = document.querySelector(".porfol");
const myblog = document.querySelector(".myblog");
const Pages = document.querySelector(".Pages");

myblog.addEventListener("click", function () {
  Detals.classList.toggle("clicknex");
});
Pages.addEventListener("click", function () {
  porfol.classList.toggle("clicknex");
});

bars.addEventListener("click", function () {
  myul.classList.toggle("display");
});

const mycard = document.querySelector(".mycard");

async function myfetch() {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();

  data.forEach((element) => {
    mycreate(element);
  });
}

myfetch();

function mycreate(data) {
  const mydiv = document.createElement("div");
  const btndiv = document.createElement("div");
  const myimg = document.createElement("img");
  const myh2 = document.createElement("h2");
  const myp = document.createElement("p");
  const btndelete = document.createElement("button");
  const buttonedit = document.createElement("button");

  btndiv.append(btndelete, buttonedit);

  btndelete.innerText = "REMOVE";
  buttonedit.innerText = "EDIT";
  btndelete.addEventListener("click", function () {
    mydelete(data.id);
    window.location.reload();
  });

  buttonedit.addEventListener("click", () => {
    alert("Melumatlar Unputa daxil olur");
    const id = document.querySelector("#id");
    const myname = document.querySelector("#name");
    const input = document.querySelector("#lorem");
    const img = document.querySelector("#img");
    id.value = data.id;
    img.value = data.img;
    myname.value = data.name;
    input.value = data.lorem;
    const obj1 = {
      id: id.value,
      img: img.value,
      name: myname.value,
      lorem: input.value,
    };
    mydelete(data.id);
    async function mypost() {
      const respons = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj1),
      });
    }

    mypost();
    // async function myput(b) {
    //   const respons = await fetch(`http://localhost:3000/posts/${b}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(obj1),
    //   });
    // }

    // myput(data.id);
  });

  mydiv.classList.add("newcard");

  myimg.src = data.img;

  myh2.innerText = data.name;
  myp.innerText = data.lorem;

  mydiv.append(myimg, myh2, myp, btndiv);
  mycard.appendChild(mydiv);
}

const myform = document.querySelector(".formbtn");
myform.addEventListener("click", () => {
  const id = document.querySelector("#id");
  const myname = document.querySelector("#name");
  const input = document.querySelector("#lorem");
  const img = document.querySelector("#img");
  if (id.value === "" || img.value === "" || myname.value === "") {
    alert("MELUMATLARI TAM DAXIL EDIN");
  } else {
    const obj = {
      id: id.value,
      img: img.value,
      name: myname.value,
      lorem: input.value,
    };
    async function mypost() {
      const respons = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    }
    mypost();
  }
  window.location.reload();
});

async function mydelete(a) {
  const response = await fetch(`http://localhost:3000/posts/${a}`, {
    method: "DELETE",
  });
}

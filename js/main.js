
    let btn = document.getElementById("responsive-menu-btn");
    let nav = document.getElementById("menu")
    let con = true
    function menu() {
        if (con) {
            nav.style.left = "0"
            con = false
        } else {
            nav.style.left = "-200%"
            con = true
        }
    }

    btn.addEventListener("click", menu)

    $(".item").click(function(){
        let target=$(this).parent().children(".slide")
        $(target).slideToggle()
    })



BD =[
    {
        id: 1,
        title:"el inocente",
        category: "policial",
        author: "harlan coben",
        price: 14000,
        stock: 'en stock',
        href:"",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9cGyBpIClOxu6-cdEV7fMThDmLlVti3romA&usqp=CAU",
    },
    {
        id: 2,
        title:"la sombra del viento",
        category: "drama",
        author: "ruiz zafon",
        price: 18000,
        stock: 'agotado',
        href:"",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLH70HN8U7MgAtWnofoCQ7bhjRIfJN5okUthWnXZdOLjUk_pn2eMTRxA9n878yJcbHv1A&usqp=CAU",
    },
]


// document.body.innerHTML = BD[0].price

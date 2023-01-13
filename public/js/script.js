function func1(a){
    const x = a.parentElement.parentElement.children[1].innerText;
    const cost  = a.parentElement.children[1].innerText;
    const name = a.parentElement.parentElement.children[1].innerText;
    const cost1 = JSON.stringify(cost);
    localStorage.setItem("costing", cost1);

    const name1 = JSON.stringify(name);
    localStorage.setItem("nameing", name1);
    let date = new Date();
    const order_id = date.getTime();
    const order_di1 = JSON.stringify(order_id);
    localStorage.setItem("oderiding",order_di1 );
}
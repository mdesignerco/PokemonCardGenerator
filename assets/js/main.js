window.onload = function() {
const card = document.querySelector('.card'),
    style = document.querySelector('.hover'),
    takeScreenShot = document.querySelector('.saveCard');

card.addEventListener("mousemove", (e)=> mOver(e), false);
card.addEventListener("mouseout", (e)=> mOut(e), false);


function mOver(element) {
    console.log('element', element)
    let position = [element.offsetX, element.offsetY];
    element.preventDefault();
    let cardItem  = this;
    console.log('this',cardItem);
    //Math for mouse position
    let left = position[0],
        top = position[1],
        height = card.offsetHeight,
        width = card.offsetWidth,
        positionX = Math.abs( Math.floor( 100 / width * left )-100 ),
        positionY = Math.abs( Math.floor( 100 / height * top )-100 ),
        positionA = (50-positionX)+(50-positionY);
        console.log(positionA)
    //Math for Gradient / background positions
    let positionLeft = (50+(positionX - 50)/1.5),
        positionTop  = (50+(positionY - 50)/1.5),
        positionX_Spark = (50+(positionX - 50)/7),
        positionY_Spark = (50+(positionY - 50)/7),
        positionOpacity = 20+( Math.abs( positionA ) * 1.5 ),
        topY = ( (positionTop - 50) /2 ) * -1,
        topX = ( (positionLeft - 50) /1.5 ) * .5;
    // css to apply for active card
    let gradientPosition = `background-position: ${positionLeft}% ${positionTop}%;`,
        sparkPosition = `background-position: ${positionX_Spark}% ${positionY_Spark}%;`,
        opacity = `opacity: ${positionOpacity/100};`,
        transform = `transform: rotateX(${topY}deg) rotateY(${topX}deg);`;
    //need to use a <style> tag for pseudo elements
    let ContentStyle = `.card:hover::before { ${gradientPosition} }  /* gradient */
        .card:hover::after { ${sparkPosition} ${opacity} }   /* sparkles */`
    // set / apply css class and style
    card.setAttribute("style", transform);
    style.innerHTML  = ContentStyle;

    //clearTimeout(x);
}



function mOut() {
    style.innerHTML ='';
    card.setAttribute("style", '');
}

setTimeout(()=> {
    takeScreenShot.style.top = '0';
    takeScreenShot.addEventListener('click', ()=> takeShot());
    takeScreenShot.addEventListener('mouseover', ()=> {
        const cardName = document.querySelector('.pokeName');
        takeScreenShot.textContent = `Download ${cardName.textContent}`
    })  
    takeScreenShot.addEventListener('mouseout', ()=> {
        const cardName = document.querySelector('.pokeName');
        takeScreenShot.textContent = `Download`
    }) 
}, 5000);


function takeShot() {
    const node = document.getElementById('app'),
    cardName = document.querySelector('.pokeName');

    domtoimage.toBlob(node)
    .then(function (blob) {
        window.saveAs(blob, `mdesigner-${cardName.textContent}.jpg`);
    });
}

}
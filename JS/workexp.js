function init() {
    let floating = document.getElementsByClassName('float');
    for (let index = 0; index < floating.length; index++) {
        floating[index].addEventListener('mouseover', function(event){
            event.target.classList.remove("float");
        });

        floating[index].addEventListener('mouseout', function(event){
            event.target.classList.add("float");
        });

        let children = floating[index].childNodes;
        for(let i = 0; i < children.length; i++) {
            children[i].addEventListener('mouseover', function(event){
                floating[index].classList.remove("float");
            });
            children[i].addEventListener('mouseout', function(event){
                floating[index].classList.add("float");
            });
        }
    }
}

init();
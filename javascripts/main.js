(function(){
    function $(id){
        return document.getElementById(id)
    }
    var trigger = $('js-menu-icon');
    trigger && (trigger.onclick = function(e){
        var nav = $('js-nav'),
            statu = nav.style.display;
        if(statu === 'none'){
            nav.style.display = 'block'
        }else{
            nav.style.display = 'none'
        }
    })
})();
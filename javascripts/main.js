(function(){
    function $(id){
        return document.getElementById(id)
    }

    var trigger = $('js-menu-icon');
    console.log(trigger);
    trigger && (trigger.onclick = function(e){
        console.log('ddd');
        var nav = $('js-nav'),
            statu = nav.style.display;

        if(statu === 'none'){
            nav.style.display = ''
        }else{
            nav.style.display = 'none'
        }
    })
});
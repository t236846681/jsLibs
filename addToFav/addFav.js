/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-6-9
 * Time: 上午11:21
 * To change this template use File | Settings | File Templates.
 */
function addFav(url,title){
    try{
        window.external.addFavorite(url,title);
    }catch(e) {
        try{
            window.sidebar.addPanel(title,url,"");
        }catch(e){
            alert("您的浏览器不支持此功能，windows系统请按ctrl+D，Mac系统请按Cmd+D来加入收藏夹！");
        }
    }
}
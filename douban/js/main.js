//jsonp跨域的封装函数
//因为ajax不支持跨域

//解决的问题
//返回的接口数据 在当前页面怎么调用
//参数怎么传过去

function jsonp(url,arg,fn){

    // var arg = {
    //     page:1,
    //     count:10,
    //     callback:function(){

    //     }
    // }

    //动态创建一个script标签 并且设置src的属性
    var srpt = document.createElement("script");

    //拼接参数在url地址后面
    //url?page=1&count=10&callback=func

    var queryString = '';//这个变量保存参数的字符串

    for(var key in arg){
        queryString += '&' + key + '=' + arg[key] + '&';
    }

    //console.log(queryString);

    //随机生成一个回调函数
    var funName = 'fun_' + Math.random().toString().substr(3);
   // console.log(funName);

    //把传进来的回调函数挂载到window对象上面，可以全局使用
    window[funName] = fn;

    //判断地址后面是否有  ? 
    if(url.indexOf('?') == -1) {
        url += '?' + queryString;
    } else {
        url += queryString;
    }

    //在url地址的最后添加一个回调函数，传给了豆瓣的api服务器
    url += 'callback=' + funName;

    srpt.src = url;

   //srpt.src="https://api.douban.com/v2/movie/in_theaters?";

    //把得到的script标签添加到dom上面
    document.body.appendChild(srpt);

    

    
}
// jsonp('https://api.douban.com/v2/movie/in_theaters',{
//     apikey:'0b2bdeda43b5688921839c8ecb20399b'
// },function(data){
//     console.log(data);
// });

//jquery加载开始运行
$(function(){
    jsonp('https://api.douban.com/v2/movie/in_theaters',{
        apikey:'0b2bdeda43b5688921839c8ecb20399b'
        },function(data){
            
            var htmlStr = '';
            var res = data.subjects;
            res.forEach(function(item, index){
                if (index == 0) {
                    htmlStr += `
                    <div class="item active">
                    <div class="row text-center">
                    `;
                } else {
                    htmlStr += `
                    <div class="item">
                    <div class="row text-center">
                    `;
                }
    
                for (var per of item.casts) {
                   // console.log(per);
                    if (per.avatars != 'null')  {
                        htmlStr += `
                        <!-- ITEM-->
                        <div class="span3">
                            <div class="thumbnail product-item">
                                <a href="${per.alt}">
                                    <img src="${per.avatars.medium}" class='img-size'>
                                </a>
                            </div>
                            <h5>${per.name}</h5>
                            <p>
                                <a href="${per.alt}" rol="button" class="btn btn-primary btn-sm">查看详情 &gt;&gt;</a>
                            </p>
                        </div>
                        <!-- ITEM-->
                        `;
                    }
                }
    
                htmlStr += `
                    </div>
                  </div>  
                `;
    
                $("#myCarousel2 .carousel-inner").html(htmlStr);
    
            })
        }
    );

    //获取TOP10电影的数据
    jsonp('https://api.douban.com/v2/movie/top250',{
        apikey:'0b2bdeda43b5688921839c8ecb20399b'
    },function(data){
        //console.log(data);
        var htmlStr = '';
        var rel = data.subjects;

        for(var i=0;i<20;i++){
            htmlStr += `
                <li><a href="${rel[i].alt}">${rel[i].title}</a></li>
            `;
            $("#topTen").html(htmlStr);
        }
    });

  
    //执行搜索功能
    $("#search-btn").click(function(){
        var search_info = $("#search-input").val().trim();
        var htmlStr = '';
        if(search_info == ''){
            alert('请输入查询内容！');
        }else{
            jsonp('https://api.douban.com/v2/movie/in_theaters',{
                apikey:'0b2bdeda43b5688921839c8ecb20399b',
            },function(data){
          //  console.log(data);

                //搜索组装页面
                htmlStr += `
                    <div style="color:red">豆瓣搜索接口不可用，请求失败！</div>
                `;
                $("#search-tip").html(htmlStr);
            });
        }
    });






})



//直接这么访问是解决不了的
// $.get('https://api.douban.com/v2/movie/in_theaters', {}, function (data) {
//     console.log(data);
// }, 'json');
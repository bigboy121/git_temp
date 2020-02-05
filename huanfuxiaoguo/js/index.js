window.onload = function(){
	// 获取按钮
	var btn = document.getElementById("btn");
	//获取body
	var body = document.getElementsByTagName("body")[0];

	//判断点击换肤的条件 
	var btn_click = true;

	// 要换肤的css文件名称
	var url="mycss/bg_black.css";
	
	//按钮点击 实现换肤
	btn.onclick = function(){
		if(btn_click){
			addStyle(url);
			btn_click = false;
		}else{
			moveLink(url);
			btn_click = true;
			
		}
	}
	
	//添加link黑夜模式
	function addStyle(url){
		//创建link标签
		var link = document.createElement("link");
		//获取head 为了在head后添加换肤属性节点
		var head = document.getElementsByTagName("head")[0];
		//设置添加的link的属性
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", url);
		head.appendChild(link);
	}
	
	//移除link的黑夜模式
	function moveLink(url){
		//获取link
		var links = document.getElementsByTagName("link");
		for(var i=0;i<links.length;i++){
			//利用getAttribute()方法 判断移除换肤的属性值
			if(links[i].getAttribute("href") == url){
					links[i].parentNode.removeChild(links[i]);
				}
		}
	}
	//var link = document.querySelector('link[href="bg_black.css"]');
}

window.onload=function(){
	adweb.app.toTip();
	adweb.app.toBanner();
	adweb.app.toSel();
	adweb.app.toRun();
}

var adweb={}    //命名空间
adweb.tools={}  //工具
//兼容getElementsByClassName的工具
adweb.tools.getByClass=function(oParent,oClass){
	var oAll=oParent.getElementsByTagName("*");
	var i=0;
	var arr=[];
	for(i=0;i<oAll.length;i++){
		if(oAll[i].className==oClass){
			arr.push(oAll[i]);
		}
	}
	return arr;
	
};
//获取元素样式的工具
adweb.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};


adweb.ui={}   //组件
//输入框功能实现
adweb.ui.textChange=function(obj,str){
	obj.onfocus=function(){
		if(this.value=="Search website"){
			this.value="";
		}
	};
	obj.onblur=function(){
		if(this.value==""){
			this.value="Search website";
		}
	};
}
//淡入淡出功能实现
adweb.ui.fadeIn=function(obj){
	    var oCur=adweb.tools.getStyle(obj,"opacity");
	    if(oCur==1){
	    	return false;
	    }
	    
		var value=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iSpeed=5;
			if(value!=100){
				value += iSpeed;
				obj.style.opacity=value/100;
				obj.style.filter = 'alpha(opacity='+value+')';
			}else{
				clearInterval(obj.timer);
			}
		},30);
}//淡入
adweb.ui.fadeOut=function(obj){
	var oCur=adweb.tools.getStyle(obj,"opacity");
	    if(oCur==0){
	    	return false;
	    }
	
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iSpeed=-5;
		if(value!=0){
			value+=iSpeed;
			obj.style.opacity=value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}else{
			clearInterval(obj.timer);
		}
	},30)
}//淡出
adweb.ui.moveLeft = function(obj,old,now){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};


adweb.app={}  //应用
//焦点在输入框时·焦点移出输入框时，输入框文字内容文字变化
adweb.app.toTip=function(){
	var oTxt1=document.getElementById("text1");
	var oTxt2=document.getElementById("text2");
	
	adweb.ui.textChange(oTxt1,"Search website");
	adweb.ui.textChange(oTxt2,"Search website");	
}
//广告区域轮播图
adweb.app.toBanner=function(){
	var oAd=document.getElementsByClassName("ad")[0];
	var oLi=oAd.getElementsByTagName("li");
	
	var oPrevbg=adweb.tools.getByClass(oAd,"prev_bg")[0];
	var oNextbg=adweb.tools.getByClass(oAd,"next_bg")[0];
	
	var oPrev=adweb.tools.getByClass(oAd,"prev")[0];
	var oNext=adweb.tools.getByClass(oAd,"next")[0];
	
	var iNow=0;
	
	var timer=setInterval(auto,3500);
	oLi[0].style.opacity=1;
	oLi[0].style.filter="alpha(opacity=100)";
	function auto(){
		
		if(iNow == oLi.length-1){
			iNow = 0;
		}else{
			iNow++;
		}
		for(var i=0;i<oLi.length;i++){
		    adweb.ui.fadeOut(oLi[i]);
	    }
		adweb.ui.fadeIn(oLi[iNow]);
	};
	
	function autoPrev(){
		//var iNow=oLi.length;
		if(iNow==0){
			iNow=oLi.length-1;
		}else{
			iNow--;
		}
		
		for(var i=0;i<oLi.length;i++){
		    adweb.ui.fadeOut(oLi[i]);
	    }
		adweb.ui.fadeIn(oLi[iNow]);
	};
	
	oPrevbg.onmouseover=oPrev.onmouseover=function(){
		oPrev.style.display="block";
		clearInterval(timer);
	}
	oNextbg.onmouseover=oNext.onmouseover=function(){
		oNext.style.display="block";
		clearInterval(timer);
	}
	oPrevbg.onmouseout=function(){
		oPrev.style.display="none";
        timer=setInterval(auto,2500);
	}
	oNextbg.onmouseout=function(){
		oNext.style.display="none";
        timer=setInterval(auto,2500);
	}
	oPrev.onclick=function(){
		autoPrev();
	}
	oNext.onclick=function(){
		auto();
	}
};
adweb.app.toSel=function(){
	var oSel=document.getElementById("sel");
	var aDd=oSel.getElementsByTagName("dd");
	var aUl=oSel.getElementsByTagName("ul");
	var aH2=oSel.getElementsByTagName("h2");
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index=i;
		aDd[i].onclick=function(ev){
		var oEvent=ev||event;
		//this对应的是Dd，先将this赋值给This，以后可以直接在里面的函数读取到外面的this。
		var This=this;
		//循环，每一个aDd对应的ul的display都为none，也就是都隐藏。
		for(var i=0;i<aUl.length;i++){
			aUl[i].style.display="none";
		}
		//ul的当前项的display为block，显示。
		aUl[this.index].style.display="block";
		//当点击屏幕其他地方时，这个block的display就为none。
		document.onclick=function(){
			aUl[This.index].style.display="none";
		};
		//因为会事件冒泡，导致点击Dd时和点击屏幕其他地方时一样为none，所以删除冒泡
		oEvent.cancelBubble=true;
	}
	};
			for(var i=0;i<aUl.length;i++){
				aUl[i].index=i;
			(function(ul){
				var aLi=oSel.getElementsByTagName("li");
				for(var i=0;i<aLi.length;i++){
					aLi[i].onmouseover=function(){
						this.className="active";
					}
					aLi[i].onmouseout=function(){
						this.className="";
					}
					aLi[i].onclick=function(ev){
						var event=ev||event;
						aH2[this.parentNode.index].innerHTML=this.innerHTML;
						this.parentNode.style.display="none";
						//因为这个会冒泡，导致Dd也这样，所以需要删除冒泡；
						event.cancelBubble=true;
					}
				}
			})(aUl[i])
			};	
};
adweb.app.toRun = function(){
	
	var oRun = document.getElementById('run1');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oPrev = adweb.tools.getByClass(oRun,'prev')[0];
	var oNext = adweb.tools.getByClass(oRun,'next')[0];
	
	var iNow = 0;
	
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	oPrev.onclick = function(){
		
		if(iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		
		adweb.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		
		iNow--;
		
	};
	
	oNext.onclick = function(){
		
		if(iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		
		adweb.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		
		iNow++;
		
	};
	
	
};

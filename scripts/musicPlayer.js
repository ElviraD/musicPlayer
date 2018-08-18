var arrMusic = [
	{
		musicName:'一月，银装素裹',
		musicUrl:'music/1.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/1.jpg'
	},
	{
		musicName:'二月，莺飞草长',
		musicUrl:'music/2.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/2.jpg'
	},
	{
		musicName:'三月，桃沐春风',
		musicUrl:'music/3.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/3.jpg'
	},
	{
		musicName:'四月，初雨微凉',
		musicUrl:'music/4.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/4.jpg'
	},
	{
		musicName:'五月，和风微醺',
		musicUrl:'music/5.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/5.jpg'
	},
	{
		musicName:'六月，晴雨流转',
		musicUrl:'music/6.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/6.jpg'
	},
	{
		musicName:'七月，蝉鸣月色',
		musicUrl:'music/7.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/7.jpg'
	},
	{
		musicName:'八月，盛夏未央',
		musicUrl:'music/8.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/8.jpg'
	},
	{
		musicName:'九月，一叶知秋',
		musicUrl:'music/9.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/9.jpg'
	},
	{
		musicName:'十月，霪雨缠绵',
		musicUrl:'music/10.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/10.jpg'
	},
	{
		musicName:'十一月，深秋叙',
		musicUrl:'music/11.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/11.jpg'
	},
	{
		musicName:'十二月，初雪诉',
		musicUrl:'music/12.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/12.jpg'
	},
	{
		musicName:'神龙',
		musicUrl:'music/13.mp3',
		anthor:'紫竹笛韵',
		musicImg:'images/13.jpg'
	}
];

$(function(){
	var s1;	// 设置定时器
	var minu = 0;
	var sec = 0;
	var totalTime;	// 歌曲时长
	var ave;
	var currentMusic;	// 当前播放音乐index

	function RealWidth(){
		var TotalWidth = $('body').width();
		var WidthPer = $('#playProgress').width();
		var realWidth = TotalWidth * WidthPer / 100;
		return realWidth;
	}
	// 获取进度条左边距离浏览器的距离
	var ProcessLeft = ($('body')[0].clientWidth - RealWidth()) / 2;
	var realWidth = RealWidth();
	var count = 0;
	var flagPlay = false;

	function Playing(){
		sec = parseInt(sec);
		minu = parseInt(minu);
		sec = sec + 1;
		if(sec == 60){
			sec = 0;
			minu = minu + 1;
		}
		sec = parseInt(sec) < 10 ? ('0' + parseInt(sec)) : sec;
		minu = parseInt(minu) < 10 ? ('0' + parseInt(minu)) : minu;
		$('#startTime').html(minu + ':' + sec);
		// 进度条上圆点位置
		var leftPos = $('#playRound').css('left');
		var leftNum = parseFloat(leftPos.substring(0,leftPos.length-2));
		var leftVal = leftNum + ave;

		$('#playRound').css('left',leftVal + 'px');
	}

	document.getElementById('Play').oncanplay = function(){
		// console.log('toggle');
		if(count == 0){
			sec = 0;
			minu = 0;
			$('#playRound').css('left','-16px');
			totalTime = document.getElementById('Play').duration;
			var mm = parseInt(totalTime / 60);
			var ss = parseInt(totalTime % 60);
			$('#endTime').html(mm + ':' + ss);
			// console.log(totalTime);
			// console.log(parseInt(realWidth));
			ave = parseFloat(realWidth) / totalTime;
		}
		count++;

		s1 = setInterval(Playing,1000);
	}

	// 点击滚动进度条
	$('#playProgress').click(function(e){
		clearInterval(s1);
		var currPos = e.pageX;
		// console.log(e.pageX);

		$('#playRound').css('left',currPos - ProcessLeft - 19);
		var Pos = currPos - ProcessLeft;
		// console.log("Left位置：" + Pos);
		var currTime = Math.round(Pos / ave);
		// console.log(currTime);
		document.getElementById('Play').currentTime = currTime;

		if(flagPlay == false){
			$('#Play').triggle('play');
			$('#Playerbtn').attr('class','btnImg');
		}

		minu = parseInt(currTime / 60);
		sec = parseInt(currTime % 60);
		sec = parseInt(sec) < 10 ? ('0' + parseInt(sec)) : sec;
		minu = parseInt(minu) < 10 ? ('0' + parseInt(minu)) : minu;
		$('#startTime').html(minu + ':' + sec);
	});

	// 点击歌曲播放
	$('#musicList').click(function(e){
		flagPlay = true;
		$('#musicList li').each(function(index,el){
			$(el).removeClass('Playing');
		});
		var target = e.target.tagName;
		var musicUrl;
		if(target == 'LI' || target == 'SPAN'){
			if($('#Playerbtn').attr('class') == 'btnImgInit'){
				$('#Playerbtn').attr('class','btnImg');
			} else {
				$('#Playerbtn').attr('class','btnImgInit');
				setTimeout(function(){
					$('#Playerbtn').attr('class','btnImg');
				},50);
			}
			if(target == 'LI'){
				$(e.target).addClass('Playing');
				musicUrl = 'music/' + $(e.target).text();
			} else {
				musicUrl = $(e.target).parent().text();
			}

			for(var i=0;i<arrMusic.length;i++){
				if(musicUrl.indexOf(arrMusic[i].musicName) != -1){
					currentMusic = i;
					$('#Play').attr({
						'src':arrMusic[i].musicUrl,
						'autoplay':'autoplay'
					});
					$('#musicName').text(arrMusic[i].musicName + '\n' + arrMusic[i].anthor);
					$('#musicImg').attr({
						'src':arrMusic[i].musicImg
					})
					var musicImgUrl = arrMusic[i].musicImg;
					$('#imgUrl').attr('src',musicImgUrl);
				}
			}
			if(s1){
				clearInterval(s1);
				sec = 0;
				minu = 0;
				$('#playRound').css('left','-16px');
				count = 0;
			}
		}	
	});

	// 播放、暂停
	$('#Playerbtn').click(function(e){
		e.stopPropagation();
		if($(this).attr('class') == 'btnImg'){
			$(this).attr('class','btnImgInit');
			$('#Play').trigger('pause');
			flagPlay = false;
			clearInterval(s1);
		} else {
			$(this).attr('class') == 'btnImg';
			$('#Play').trigger('play');
			flagPlay = true;
			s1 = setInterval(Playing, 1000);
		}
	});

	// 打开播放界面，隐藏主界面
	$('#musicFooter').click(function(){
		$('#playerPage').show();
		$('#musicBox').hide();
	});

	document.getElementById('Play').onended = function(){
		clearInterval(s1);
		$('#musicList li').each(function(index,el){
			$(el).removeClass('Playing');
		});
		var selector = '#musicList li:' + 'eq(' + (currentMusic + 1) + ')';
		$(selector).addClass('Playing');
		if(currentMusic == arrMusic.length - 1){
			clearInterval(s1);
		}
		if(currentMusic != arrMusic.length - 1){
			$('#Play').attr('src',arrMusic[currentMusic+1].musicUrl);
			$('#imgUrl').attr('src',arrMusic[currentMusic+1].musicImg);
			count = 0;
			$('#musicName').text(arrMusic[currentMusic+1].musicName + '\n' + arrMusic[currentMusic+1].anthor);
			currentMusic++;
		}
	}

	// 播放页面->返回
	$('#returnArrow').click(function(){
		$('#playerPage').hide();
		$('#musicBox').show();
	});
});
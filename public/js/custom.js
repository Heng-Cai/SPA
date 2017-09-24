$(document).ready(function() {
	// 缓存输入任务
	var listCache = [];
	var list = '';
	$('#add').on('click', function() {
		list = $('#list').val();
		// 输入框为空时提醒用户
		if (list === '') {
			$('#alert1')
				.removeClass('alert-success')
				.addClass('alert-danger')
				.text('任务不能为空')
				.fadeIn().fadeOut(2000);
			// 使输入框获得焦点
			$('#list').get(0).focus();
		} else {
			// 判断输入是否为重复任务
			var isSame = listCache.some(function(item) {
				return(item === list);
			});
			if (!isSame) {
				// 不是重复任务则正常添加
				addList(list);
				listCache.push(list);
				// 添加完成后清空输入框
				$('#list').val('');
			} else {
				// 为重复任务则显示选择框
				$('#alert2').fadeIn();
			}
		}
	});
	$('#yes').on('click', function() {
		// 确认添加重复任务
		$('#alert2').hide();
		addList(list);
		$('#list').val('');					
	});
	$('#no').on('click', function() {
		// 确认不添加重复任务
		$('#alert2').hide();
		// 选中输入框内所有文本
		$('#list').get(0).select();
	});
	$('#alert2 .close').on('click', function() {
		// 关闭选择框则默认不添加重复任务
		$('#alert2').hide();
	});
	// 用于移除已完成任务
	// 利用事件冒泡机制，将事件处理程序注册在父级元素上
	$('#list-result').on('click', function() {
		if ($(event.target).is('.close') ) {
			var removedList = $(event.target).prev().text();
			listCache = listCache.filter(function(item) {
				return (item !== removedList);
			});
			$(event.target).parent().hide();
			$('#alert1')
				.removeClass('alert-danger')
				.addClass('alert-success')
				.text('移除任务成功')
				.fadeIn().fadeOut(2000);
		}		
	});
});

function addList(list) {
	$('#list-result')
		.append(
			'<li class="list-group-item">' +
			'<span>' + list + '</span>' + 
			'<span class="close">&times;</span></li>')
		.show();
	$('#alert1')
		.removeClass('alert-danger')
		.addClass('alert-success')
		.text('添加任务成功')
		.fadeIn().fadeOut(2000);
}

$(document).ready(function() {
	// 缓存输入内容
	var indexCache = '';
  // 利用 keyup 事件时在中文输入法状态下将输入的英文 enter 入框时，不会触发 keyup 
  // 改用 input 事件
  $('#search-index').on('input', function() {
  	// 去除输入内容空格
  	var index = $(this).val().replace(/\s/g, '');
  	if (index === '') {
  		// 输入框为空时
  		// 清除并隐藏搜索结果
  		// 重置输入缓存
  		indexCache = '';
  		$('#search-result').empty().hide();
  		$('.col-sm-6 .well').text('查询结果');
  	} else if (index === indexCache) {
  		// 两次输入内容一致时，不进行 AJAX 请求
  		return false;
  	} else {
  		// 输入与上次不一致，清除并隐藏上次搜索结果
  		$('#search-result').empty().hide();
  		// AJAX 请求
  		$.ajax({
  			type: 'POST',
  			url: '/lib/provinceData.json',
  			data: {value: index},
  			success: function(msg) {
  				if (msg !== '[]') {
  					var msg = JSON.parse(msg);
  					for (var i = 0; i < msg.length; i++) {
  						$('#search-result')
  							.append('<li class="list-group-item">' + msg[i].name + '</li>')
  							.show();
  					}
  					$('#search-result .list-group-item')
  						.css('cursor', 'pointer')
  						.each(function(indx) {
  							$(this).on('click', function() {
						  			$('#search-result').hide();
						  			$('.col-sm-6 .well').text(msg[indx].name + ' 简称： ' + msg[indx].short);
						  	});
  					})
  				}
  			},
				error: function(jqXHR, textStatus) {
					alert('Request failed: ' + textStatus);
				}
			});
  		indexCache = index;
  	}
  });
});
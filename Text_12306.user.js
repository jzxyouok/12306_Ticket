// ==UserScript==
// @name         12306 Assistant
// @description  12306 订票助手之(自动登录，自动查票，自动订单)
// @include      *://kyfw.12306.cn/otn*
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

function withjQuery(callback, safe) {
	if ( typeof (jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";

		if (safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery, window);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		} else {
			var dollar = undefined;
			if ( typeof ($) != "undefined")
				dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery, window);
			});
		}
		document.head.appendChild(script);
	} else {
		setTimeout(function() {
			//Firefox supports
			callback(jQuery, typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		}, 30);
	}
}

withjQuery(function($, window) {
	function route(match, fn) {
		if (window.location.href.indexOf(match) != -1) {
			fn();
		};
	}

	var SubmitToken = "";
	var leftTicketStr = "";

	route("leftTicket/init", QueryTicket);

	// 查询是否有票
	function QueryTicket() {

		var isTicketAvailable = false;
		var isStudentTicket = false;
		var isAutoQueryEnabled = false;

		var ticketType = new Array();
		$("#float th").each(function(i, e) {
			ticketType.push(false);
			if (i > 3 && i < 15) {
				ticketType[i] = true;
				var that = $("<input/>").attr("type", "checkBox").attr("checked", true);
				that.index = i;
				that.change(function() {// 绑定change事件
					ticketType[that.index] = this.checked;
				});
				$(e).append(that);
			}
		});
		var Block = true;
		$('#query_ticket').bind('click', function(event) {
			Block = true;
			setTimeout(function() {
				$("#queryLeftTable tr").each(function(index, e) {
					if (checkTickets(e)) {
						$(this).removeClass('bgc');
						isTicketAvailable = true;
						if (Block && isTicketAvailable) {
							Block = false;
							notify('抢到票了', 3000, true);
							OKMusic();
						}
						$(this).css("background-color", "#FFF7A8");
					}
				});
			}, 500);
		});

		var queryTimes = 1;

		function notify(str, timeout, skipAlert) {// Webkit 桌面通知
			if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
				var notification = webkitNotifications.createNotification("http://www.12306.cn/mormhweb/images/favicon.ico", '抢票消息', str);
				notification.show();
				if (timeout) {
					setTimeout(function() {
						notification.cancel();
					}, timeout)
				}
			} else {
				if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
					window.webkitNotifications.requestPermission();
				}
				if (!skipAlert) {
					alert(str);
				}
			}
		}

		var audio = null;
		function OKMusic() {
			if (window.Audio) {
				if (!audio) {
					audio = new Audio("http://www.w3school.com.cn/i/song.mp3");
					audio.loop = false;
				}
				audio.play();
			} else {
			}
		}

		var $special = $("<input type='text' />");

		function checkTickets(row) {
			var v1 = $special.val();
			if (v1 != '') {
				var v2 = $.trim($(row).find(".train a").text());
				if (v1.indexOf(v2) == -1)
					return false;
				if ($(row).find(".no-br a").length == 0) {
					return false;
				}
			}
			var cnt = 0;
			$(row).find("td").each(function(i, e) {
				if (i > 0 && i < 12 && ticketType[i + 3]) {
					var info = $.trim($(e).text());
					if (info != "--" && info != "无") {
						$(this).css("background-color", "#2CC03E");
						cnt++;
					}
				}
			});
			if (cnt && Block) {
				$(row).find(".no-br a").click();
				$.post("https://kyfw.12306.cn/otn/confirmPassenger/initDc", {
					"_json_att" : ""
				}, function(data) {
					console.log(data);
					var str = $.trim(data.match(/globalRepeatSubmitToken.+/));
					str = str.substr(str.indexOf("= ")).match(/[a-zA-Z0-9]+/);
					if (str != "")
						SubmitToken = str;
				});
				setTimeout(function() {
					var $t = $("#defaultwarningAlert_id");
					if ($t.length) {
						$t.remove();
						return false;
					}
					$t = $(".dhtmlx_wins_body_outer");
					if ($t.length) {
						setTimeout(function() {
							$t = $t.find('#loginForm');
							$t.find("input").eq(0).val('*****@qq.com');
							$t.find("input").eq(1).val('********');
							$('#randCode').keyup(function(e) {
								var str = $.trim(e.target.value);
								if (str.length == 4)
									$t.find("#loginSubAsyn").get(0).click();
							});
						}, 1000);
					}
				}, 100);
			}
			return cnt;
		}

		var timer = null;
		var ui = $("<div>请先选择好出发地，目的地，和出发时间。&nbsp;&nbsp;&nbsp;</div>").append($("<input id='isStudentTicket' type='checkbox' />").change(function() {
			isStudentTicket = this.checked;
		})).append($("<label for='isStudentTicket'></label>").html("学生票&nbsp;&nbsp;")).append($("<button style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'/>").attr("id", "refreshButton").html("开始刷票").click(function() {
			var self = this;
			if (!isAutoQueryEnabled) {
				isTicketAvailable = false;
				isAutoQueryEnabled = true;
				timer = setInterval(function() {
					if (isTicketAvailable) {
						self.innerHTML = "开始刷票";
						isAutoQueryEnabled = false;
						clearInterval(timer);
						return;
					}
					document.getElementById("refreshTimes").innerHTML = queryTimes++;
					self.innerHTML = "停止刷票";
					if (isAutoQueryEnabled) {
						if (isStudentTicket)
							$("#sf2").click();
						$("#query_ticket").get(0).click();
					}
				}, 2000);
			} else {
				isAutoQueryEnabled = false;
				isTicketAvailable = false;
				self.innerHTML = "开始刷票";
				clearInterval(timer);
			}
		})).append($("<span>").html("&nbsp;&nbsp;尝试次数：").append($("<span/>").attr("id", "refreshTimes").text("0"))).append(
		//Custom ticket type
		$("<div>如果只需要刷特定的票种，请在余票信息下面勾选。</div>").append($("<a href='#' style='color: blue;'>只勾选坐票&nbsp;&nbsp;</a>").click(function() {
			$("#float th").each(function(i, e) {
				if (i > 3 && i < 15) {
					var val = this.innerHTML.indexOf("座") != -1;
					var el = $(this).find("input").attr("checked", val);
					el && el[0] && (ticketType[el[0].index] = val );
				}
			});
		})).append($("<a href='#' style='color: blue;'>只勾选卧铺&nbsp;&nbsp;</a>").click(function() {
			$("#float th").each(function(i, e) {
				if (i > 3 && i < 15) {
					var val = this.innerHTML.indexOf("卧") != -1;
					var el = $(this).find("input").attr("checked", val);
					el && el[0] && (ticketType[el[0].index] = val );
				}
			});
		}))).append($("<div>限定出发车次：</div>").append($special).append("不限制不填写，限定多次用逗号分割,例如: G32,G34"));

		var container = $("#sear-result");
		container.length ? ui.insertBefore(container) : ui.appendTo(document.body);
	}

	route("login/init", function() {
		//login
		var url = "https://kyfw.12306.cn/otn/login/init";
		var queryurl = "https://kyfw.12306.cn/otn/queryOrder/init";
		//Check had login, redirect to query url
		if (window.parent && window.parent.$) {
			var str = window.parent.$("#login_user").attr("href");
			if (str && str.indexOf("index/initMy12306") != -1) {
				window.location.href = queryurl;
				return;
			}
		}
		$("#username").val('*****@qq.com');
		$("#password").val('*****');

		var count = 1;
		//初始化
		$("#loginSub").after($("<a href='#' style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'/>").attr("id", "refreshButton").html("自动登录").click(function() {
			count = 1;
			$(this).html("(1)次登录中...");
			//notify('开始尝试登录，请耐心等待！', 4000);
			submitForm();
		}));

		function reLogin() {
			count++;
			$('#refreshButton').html("(" + count + ")次登录中...");
			setTimeout(submitForm, 2000);
		}

		function submitForm() {
			$.ajax({
				type : "POST",
				url : "https://kyfw.12306.cn/otn/login/loginAysnSuggest",
				data : {
					"loginUserDTO.user_name" : $("#username").val(),
					"userDTO.password" : $("#password").val(),
					"randCode" : $("#randCode").val()
				},
				beforeSend : function(xhr) {
					try {
						xhr.setRequestHeader('X-Requested-With', {
							toString : function() {
								return '';
							}
						});
						xhr.setRequestHeader('Cache-Control', 'max-age=0');
						xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
					} catch(e) {
					};
				},
				timeout : 30000,
				success : function(msg) {
					if (msg['data'].loginCheck != 'Y') {
						alert('请输入正确登录信息');
						reLogin();
					} else {
						alert('登录成功，开始查询车票吧！');
						window.location.replace(queryurl);
					}
				},
				error : function(msg) {
					reLogin();
				}
			});
		}

	});

	route('confirmPassenger/initDc', function() {
		setTimeout(function() {
			if (!$("input.check:checked").length) {
				$("input.check:first").click();
			}
			$.post("https://kyfw.12306.cn/otn/confirmPassenger/initDc", {
				"_json_att" : ""
			}, function(data) {
				var str = $.trim(data.match(/globalRepeatSubmitToken.+/));
				str = str.substr(str.indexOf("= ")).match(/[a-zA-Z0-9]+/);
				if (str != "")
					SubmitToken = str;
			});
			$("#randCode").off('keyup');
			$("#randCode").focus().keyup(function(e) {
				var str = $.trim(e.target.value);
				if (str.length == 4) {
					$.post("https://kyfw.12306.cn/otn/passcodeNew/checkRandCodeAnsyn", {
						"randCode" : $("#randCode").val(),
						"rand" : "randp"
					}, function(data) {
						if (data.data == "N") {
							$(".i-re").click();
						} else {
							submitForm();
							return;
						}
					});
				}
			});

			var userInfoUrl = "https://kyfw.12306.cn/otn/queryOrder/initNoComplete";

			var count = 1, freq = 1000, doing = false, timer, $msg = $("<div style='padding-left:470px;'></div>");

			function submitForm() {
				timer = null;
				var info;

				$.post("https://kyfw.12306.cn/otn/confirmPassenger/getPassengerDTOs", {
					"REPEAT_SUBMIT_TOKEN" : SubmitToken,
					"_json_att" : ""
				}, function(data) {

					info = eval(data.data.normal_passengers)[0];

					$.ajax({
						url : "https://kyfw.12306.cn/otn/confirmPassenger/checkOrderInfo",
						data : {
							'cancel_flag' : '2',
							'bed_level_order_num' : '000000000000000000000000000000',
							'REPEAT_SUBMIT_TOKEN' : SubmitToken,
							"randCode" : $("#randCode").val(),
							'passengerTicketStr' : '3,0,' + '1,' + info.passenger_name + ',1,' + info.passenger_id_no + ',' + info.mobile_no + ',N',
							'oldPassengerStr' : info.passenger_name + ',1,' + info.passenger_id_no + ',' + info.mobile_no + info.passenger_type + '_',
							'tour_flag' : 'dc'
						},
						beforeSend : function(xhr) {
							try {
								xhr.setRequestHeader('X-Requested-With', {
									toString : function() {
										return '';
									}
								});
								xhr.setRequestHeader('Cache-Control', 'max-age=0');
								xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
							} catch(e) {
							};
						},
						type : "POST",
						timeout : 30000,
						success : function(data) {
							if (data.data.submitStatus) {
								$.post("https://kyfw.12306.cn/otn/confirmPassenger/confirmSingleForQueue", {
									'REPEAT_SUBMIT_TOKEN' : SubmitToken,
									//"leftTicketStr" : "1015653007404405002630279503121015650165",
									'purpose_codes' : '00',
									'passengerTicketStr' : '3,0,' + '1,' + info.passenger_name + ',1,' + info.passenger_id_no + ',' + info.mobile_no + ',N',
									'oldPassengerStr' : info.passenger_name + ',1,' + info.passenger_id_no + ',' + info.mobile_no + info.passenger_type + '_',
								}, function(msg) {
									alert(msg.data.submitStatus);
									if (msg.data.submitStatus) {
										var audio;
										if (window.Audio) {
											audio = new Audio("http://www.w3school.com.cn/i/song.ogg");
											audio.loop = true;
											audio.play();
										}
										setTimeout(function() {
											if (confirm("车票预订成，去付款？")) {
												window.location.replace(userInfoUrl);
											} else {
												if (audio && !audio.paused)
													audio.pause();
											}
										}, 100);
									} else {
										stop(msg.data.errMsg || '未知错误');
									}
								})
							} else {
								var reTryMessage = ['用户过多', '验证码', '请不要重复提交', '没有足够的票!', '车次不开行'];
								for (var i = 0; i < reTryMessage.length; i++) {
									if (data.data.errMsg.indexOf(reTryMessage[i]) != -1) {
										reSubmitForm(reTryMessage[i]);
										return;
									}
								};
								stop(data.data.errMsg || '未知错误');
							}
						},
						error : function(msg) {
							reSubmitForm("网络错误");
						}
					});
				})
			};
			function reSubmitForm(msg) {
				if (!doing)
					return;
				count++;
				$msg.html("(" + count + ")次自动提交中... " + (msg || ""));
				timer = setTimeout(submitForm, freq || 50);
			}

			function stop(msg) {
				doing = false;
				$msg.html("(" + count + ")次 已停止");
				$('#refreshButton').html("自动提交订单");
				timer && clearTimeout(timer);
				if (msg != '')
					alert(msg);
			}

			if ($("#refreshButton").size() < 1) {

				$(".lay-btn").append($("<a style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'></a>").attr("id", "refreshButton").html("自动提交订单").click(function() {
					if (this.innerHTML.indexOf("自动提交订单") == -1) {
						doing = false;
						stop();
					} else {
						doing = true;
						this.innerHTML = "停止自动提交";
						reSubmitForm();
					}
					return false;
				}));
				$(".lay-btn").append("自动提交频率：").append($("<select id='freq'><option value='50' >频繁</option><option value='500' selected='' >正常</option><option value='2000' >缓慢</option></select>").change(function() {
					freq = parseInt($(this).val());
				})).append($msg);
			}
		}, 500);
	});

}, true);

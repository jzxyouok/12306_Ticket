var closeWin;
var dhxWins;
var isSubmitOrder = true;
var randCodeForm;
var submitOrderClickEvent;
var preStepClickEvent;
(function() {
	$(document).ready(function() {
		var a = f();
		j(a);
		$("#randCode").on("keyup", function() {
			if (!($("#randCode").val() != "" && $("#randCode").val().length == 4)) {
				$("#i-ok").css("display", "none")
			}
		})
	});
	var k;

	function j(G) {
		dhxWins = new dhtmlXWindows();
		dhxWins.enableAutoViewport(true);
		dhxWins.setSkin("dhx_terrace");
		dhxWins.setImagePath(ctx + "resources/js/rich/windows/imgs/");
		closeWin = function(l, m) {
			unLoadGrayBackground();
			ableClickSubmitButtonOrPreStepBUtton();
			if (dhxWins.isWindow(l + "_")) {
				dhxWins.window(l + "_").setModal(false);
				dhxWins.window(l + "_").hide();
				if (m) {
					$("#randCode").val("");
					refreshImg("passenger", "randp")
				}
			}
		};
		k = function(l, o, r, t, p) {
			var m = '<div class="tit">' + (o ? '<span class="colorC">' + l + "</span>" : l) + "</div>";
			var q = "<P>" + r + "</p>";
			var n = o ? '<p>请点击[<a href="' + ctx + 'queryOrder/init"><strong>我的12306</strong></a>]办理其他业务。您也可以点击[<a href="' + ctx + 'leftTicket/init"><strong>预订车票</strong></a>]，重新规划您的旅程。</p>' : '<P>查看订单处理情况，请点击“<a href="' + ctx + 'queryOrder/initNoComplete">未完成订单</a>”</P>';
			$("#iamge_status_id").removeClass().addClass("icon i-" + p);
			if (t) {
				$("#up-box-hd_id").html("提示<a id='closeTranforDialog_id' href='#nogo'>关闭</a>");
				n = "";
				$("#lay-btn_id").html("<a href='#nogo' id='qr_closeTranforDialog_id' class='btn92s'>确认</a>")
			} else {
				$("#up-box-hd_id").html("提示");
				$("#lay-btn_id").html("")
			}
			$("#orderResultInfo_id").html(m + (r == "" || r == null || r == "undefined" || r == undefined ? "" : q) + n);
			c("transforNotice_id");
			if (t) {
				$("#closeTranforDialog_id").click(function() {
					closeWin("transforNotice_id", true)
				});
				$("#qr_closeTranforDialog_id").click(function() {
					closeWin("transforNotice_id", true);
					$("#i-ok").css("display", "none")
				})
			}
		};

		function c(l) {
			closeWin(l, false);
			disableClickSubmitButtonOrPreStepBUtton();
			if ("checkticketinfo_id" == l) {
				var n = ticketInfoForPassengerForm.queryLeftNewDetailDTO;
				if (n.to_station_telecode == ticket_submit_order.special_areas.lso || n.to_station_telecode == ticket_submit_order.special_areas.dao || n.to_station_telecode == ticket_submit_order.special_areas.ado || n.to_station_telecode == ticket_submit_order.special_areas.nqo || n.to_station_telecode == ticket_submit_order.special_areas.tho) {
					if (b()) {
						$("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
						$("#notice_2_id").html("2.根据现行规定，外国人在购买进西藏火车票时，须出示西藏自治区外事办公室或旅游局、商务厅的批准函（电），或者出示中国内地司局级接待单位出具的、已征得自治区上述部门同意的证明信函。台湾同胞赴藏从事旅游、商务活动，须事先向西藏自治区旅游局或商务厅提出申请，购买进藏火车票时须出示有关批准函。");
						if (Q()) {
							$("#notice_3_id").html("3.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
						} else {
							$("#notice_3_id").html("")
						}
					}
				} else {
					$("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
					if (Q()) {
						$("#notice_3_id").html("2.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
					} else {
						$("#notice_3_id").html("")
					}
				}
			}
			var o = T(l);
			var p = $(window).width() / 2 - 300;
			var m = P() + ($(window).height() / 2 - 200);
			o.setDimension($("#content_" + l).width(), $("#content_" + l).height() + 10);
			$(".dhtmlx_window_active").height($("#content_" + l).height());
			$(".dhtmlx_window_active").css({
				left: p + "px",
				top: m + "px"
			})
		}
		function Q() {
			for (var l = 0; l < limit_tickets.length; l++) {
				var m = limit_tickets[l];
				if (m.ticket_type == ticket_submit_order.ticket_type.student) {
					return true
				}
			}
			return false
		}
		function b() {
			for (var l = 0; l < limit_tickets.length; l++) {
				var m = limit_tickets[l];
				if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc) && m.save_status != "" && m.id_type == ticket_submit_order.passenger_card_type.passport) {
					return true
				} else {
					if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc) && m.id_type == ticket_submit_order.passenger_card_type.passport) {
						return true
					}
				}
			}
			return false
		}
		$("#close_checkticketdialog_id").click(function() {
			closeWin("checkticketinfo_id", true)
		});
		$("#back_edit_id").click(function() {
			$("#qr_submit_id").show();
			closeWin("checkticketinfo_id", true);
			$("#i-ok").css("display", "none")
		});

		function F() {
			if (ticketInfoForPassengerForm.isAsync == ticket_submit_order.request_flag.isAsync) {
				R(ticketInfoForPassengerForm.tour_flag)
			} else {
				e(ticketInfoForPassengerForm.tour_flag)
			}
		}
		function I() {
			var l = $("#qr_submit_id");
			l.unbind("click");
			l.removeClass("btn92s").addClass("btn92")
		}
		function J() {
			var l = $("#qr_submit_id");
			l.bind("click", O);
			l.removeClass("btn92").addClass("btn92s")
		}
		function O() {
			closeWin("checkticketinfo_id", false);
			loadGrayBackground();
			F()
		}
		function N(l) {
			if (S()) {
				disableClickSubmitButtonOrPreStepBUtton();
				E()
			} else {
				unLoadGrayBackground();
				return
			}
		}
		submitOrderClickEvent = function() {
			loadGrayBackground();
			N()
		};

		function T(l) {
			var m = dhxWins.createWindow(l + "_", 0, 0, 660, 100);
			m.attachObject(l);
			m.clearIcon();
			m.denyResize();
			m.setModal(true);
			m.center();
			m.button("park").hide();
			m.button("minmax1").hide();
			m.hideHeader();
			return m
		}
		function P() {
			if ("pageYOffset" in window) {
				return window.pageYOffset
			} else {
				if (document.compatMode == "BackCompat") {
					return document.body.scrollTop
				} else {
					return document.documentElement.scrollTop
				}
			}
		}
		function e(m) {
			k("正在处理，请稍候。", false, "", false, "work");
			var l;
			if (m == ticket_submit_order.tour_flag.dc) {
				l...()
			}
		}
		function L(l, m) {
			rt = "";
			seat_1 = -1;
			seat_2 = -1;
			i = 0;
			while (i < l.length) {
				s = l.substr(i, 10);
				c_seat = s.substr(0, 1);
				if (c_seat == m) {
					count = s.substr(6, 4);
					while (count.length > 1 && count.substr(0, 1) == "0") {
						count = count.substr(1, count.length)
					}
					count = parseInt(count);
					if (count < 3000) {
						seat_1 = count
					} else {
						seat_2 = (count - 3000)
					}
				}
				i = i + 10
			}
			if (seat_1 > -1) {
				rt += seat_1
			}
			if (seat_2 > -1) {
				rt += "," + seat_2
			}
			return rt
		}
		preStepClickEvent = function() {
			otsRedirect("post", ctx + "leftTicket/init?random=" + new Date().getTime(), {
				pre_step_flag: "preStep"
			});
			return false
		};

		function H(m, l) {
			$("#" + m).removeClass("btn92s");
			$("#" + m).addClass("btn92")
		}
		function U(m, l) {
			$("#" + m).removeClass("btn92");
			$("#" + m).addClass("btn92s")
		}
		function S() {
			upadateSavePassengerInfo();
			stepFirValidatorTicketInfo(false);
			$("#randCode").blur();
			var m = true;
			var l = $("label[class='submitordererror']");
			for (var n = 0; n < l.length; n++) {
				if ($(l[n]).css("display") != "none") {
					m = false;
					break
				}
			}
			if (m && h() && g()) {
				return true
			} else {
				return false
			}
		}
	}
	function h() {
		var c = $("span[id$='_check']");
		var a = true;
		for (var b = 0; b < c.length; b++) {
			if ($(c[b]).css("display") != "none") {
				a = false;
				break
			}
		}
		return a
	}
	function g() {
		if (limit_tickets.length > init_limit_ticket_num) {
			k("最多只能购买" + init_limit_ticket_num + "张票", true, "", true, "warn");
			return false
		} else {
			if (limit_tickets.length < 1) {
				k("至少选择一位乘客", true, "", true, "warn");
				return false
			}
		}
		var t = 0;
		var c = new Array();
		var w = new Array();
		var v = "3456ACFGHL";
		var d = new Array();
		var a = new Array();
		for (var r = 0; r < limit_tickets.length; r++) {
			var b = limit_tickets[r];
			a.push(b.ticket_type);
			if ((ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) && ticket_submit_order.ticket_type.child != b.ticket_type) {
				if (jQuery.inArray(b.id_no, d) < 0) {
					d.push(b.id_no)
				} else {
					var e = ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(0, 4) + "年" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(4, 2) + "月" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(6, 2) + "日";
					k("出票失败", true, "互联网售票实行实名制：证件号<span style='color:red'><i><b>" + b.id_no + "</b></i></span>只能购买" + e + "车次" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.station_train_code + "的一张车票！", true, "warn");
					return false
				}
			} else {
				if ((ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) && b.save_status != "" && ticket_submit_order.ticket_type.child != b.ticket_type) {
					if (jQuery.inArray(b.id_no, d) < 0) {
						d.push(b.id_no)
					} else {
						var e = ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(0, 4) + "年" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(4, 2) + "月" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(6, 2) + "日";
						k("出票失败", true, "互联网售票实行实名制：证件号<span style='color:red'><i><b>" + b.id_no + "</b></i></span>只能购买" + e + "车次" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.station_train_code + "的一张车票！", true, "warn");
						return false
					}
				}
			}
			if (b.save_status != "") {
				t++;
				if (ticket_submit_order.tour_flag.gc == ticketInfoForPassengerForm.tour_flag) {
					if (w.length > 0) {
						if (jQuery.inArray(b.seat_type, w) < 0) {
							k("出票失败", true, "改签时，必须选择相同席别", true, "warn");
							return false
						}
					}
					w.push(b.seat_type);
					if (v.indexOf(b.seat_type) > -1) {
						c.push(b.seat_type)
					}
					if (c.length > 1) {
						k("出票失败", true, "卧铺不支持批量改签，请单张改签！", true, "warn");
						return false
					}
				}
			}
			if (b.ticket_type == ticket_submit_order.ticket_type.disability) {
				var u = id_type_code;
				if (u != ticket_submit_order.passenger_card_type.two) {
					k("出票失败", true, "第 " + (r + 1) + " 张车票： 当前登录用户证件类型不是二代身份证，购买残疾军人（伤残警察）优待票需使用中华人民共和国居民身份证！", true, "warn");
					return false
				} else {
					if (b.id_type != ticket_submit_order.passenger_card_type.two) {
						k("出票失败", true, "第 " + (r + 1) + " 张车票： 乘客证件类型不是二代身份证，购买残疾军人（伤残警察）优待票需使用中华人民共和国居民身份证！", true, "warn");
						return false
					}
				}
			}
			if (ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) {
				if (b.ticket_type == ticket_submit_order.ticket_type.student) {
					if (b.passenger_type != ticket_submit_order.passenger_type.student) {
						k("出票失败", true, "第 " + (r + 1) + " 张车票： 乘客不是学生，请从常用联系人中选择学生购买此车票。", true, "warn");
						return false
					}
				}
			}
		}
		if (ticket_submit_order.tour_flag.gc != ticketInfoForPassengerForm.tour_flag) {
			if (jQuery.inArray(ticket_submit_order.ticket_type.child, a) == 0) {
				if (jQuery.inArray(ticket_submit_order.ticket_type.adult, a) < 0) {
					k("儿童不能单独旅行，请与成人票一同购买", true, "", true, "warn");
					return false
				}
			}
		}
		if (ticket_submit_order.tour_flag.fc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.gc == ticketInfoForPassengerForm.tour_flag) {
			if (t == 0) {
				k(ticket_submit_order.tour_flag.fc == ticketInfoForPassengerForm.tour_flag ? "此次购买返程车票至少选择一位乘客" : "此次改签至少选择一位乘客", true, "", true, "warn");
				return false
			}
		}
		return true
	}
	function f() {
		randCodeForm = $("#randCodeForm_id").validate({
			onkeyup: false,
			focusInvalid: true,
			errorLabelContainer: $("#randCodeErrorNotice_id"),
			errorClass: "submitordererror",
			rules: {
				randCode: {
					required: true,
					randCodeFormat: true,
					checkRandCode: "randp"
				}
			},
			messages: {
				randCode: {
					required: "验证码不能为空",
					randCodeFormat: "验证码只能由数字或字母组成!",
					checkRandCode: "验证码错误!"
				}
			}
		});
		randCodeForm.checkForm();
		return randCodeForm
	}
})();
var selectedTicketPassengerAll;
var responseNormalPassengerClick;
var addPassengerInfo;
var responseDjPassengerClick;
var delPassengerInfo;
var upadateSavePassengerInfo;
var getpassengerTickets;
var getOldPassengers;
var renderTickInfo;
var limit_tickets;
var doTicketTitleShow;
var renderCheckTickInfo;
var stepFirValidatorTicketInfo;
var updateAllCheckBox;
var updateSeatTypeByeTickeType;
var getSeatTypePriceForSeatName;
var getI18nResourceValueBykeyForJs;
var getDjPassengerOfPassengerType;
var getSuitNameByFlag;
var getSeatTypePrices;
var ableClickSubmitButtonOrPreStepBUtton;
var disableClickSubmitButtonOrPreStepBUtton;
(function() {
	var a9 = new Array();
	var bi = new Array();
	var aO = new Array();
	var aR = new Array();
	var aM = 8;
	var bj;
	limit_tickets = new Array();
	var bk = null;
	$(document).ready(function() {
		bq();
		ax();
		bj = a6(ticket_seat_codeMap, defaultTicketTypes);
		initPageTitle("1");
		doTicketTitleShow(false);
		ay();
		bw();
		if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc) {
			aA();
			bg();
			bn()
		}
		$("#selected_ticket_passenger_all").prop("checked", true);
		aN();
		$.initLoginForm();
		$("#randCode").on("keyup", function(a) {
			a = a || window.event;
			if ($("#randCode").val().length == 4 && bk != $("#randCode").val()) {
				$.ajax({
					url: ctx + "passcodeNew/checkRandCodeAnsyn",
					type: "post",
					data: {
						randCode: $("#randCode").val(),
						rand: "randp"
					},
					async: false,
					success: function(b) {
						if (b.data == "N") {
							$("#i-ok").css("display", "none")
						} else {
							submitOrderClickEvent();
							$("#randCode").removeClass("error");
							$("#randCodeErrorNotice_id").hide();
							$("#i-ok").css("display", "block");
							return
						}
					}
				})
			}
			bk = $("#randCode").val()
		})
	});

	function ax() {
		$.views.helpers({
			seatTypePriceForSeatName: function(a) {
				return getSeatTypePriceForSeatName(a)
			},
			getValueBykeyFromI18N: function(a) {
				getI18nResourceValueBykeyForJs(a)
			},
			getTourFlagByKey: function(a) {
				return ticket_submit_order.tour_flag[a]
			},
			getTicketType: function(a) {
				return ticket_submit_order.ticket_type[a]
			},
			getIdType: function(a) {
				return ticket_submit_order.passenger_card_type[a]
			},
			getSuitName: function(b, a) {
				return getSuitNameByFlag(b, a)
			},
			getCurrentUserIdType: function() {
				return id_type_code
			},
			isExistWZ: function(a) {
				if (ticket_submit_order.seatType.yz_type == a) {
					var b = getSeatTypePrices();
					for (var d = 0; d < b.length; d++) {
						var c = b[d];
						if (c.seat_type_name == "硬座" && c.wp_statu) {
							return true
						}
					}
				}
				return false
			},
			isCanAdd: function() {
				return can_add
			}
		})
	}
	function a6(e, b) {
		var a = new Array();
		for (var c in e) {
			for (var d in b) {
				if (b[d].id == c) {
					a.push(b[d]);
					break
				}
			}
		}
		a = a.sort(function(f, g) {
			if (g.id > f.id) {
				return -1
			} else {
				if (g.id == f.id) {
					return 0
				} else {
					return 1
				}
			}
		});
		return a
	}
	function bE() {
		$("#psInfo").mouseenter(function(a) {
			var c = a.pageY + 10;
			var b = a.pageX;
			$(".srr-tips").eq(1).css({
				top: c,
				left: b
			});
			$(".srr-tips").eq(1).show()
		});
		$("#psInfo").mouseleave(function() {
			$(".srr-tips").hide()
		})
	}
	function bx() {
		$("#psInfo").mouseenter(function(a) {
			var c = a.pageY + 10;
			var b = a.pageX;
			$(".srr-tips").eq(0).css({
				top: c,
				left: b
			});
			$(".srr-tips").eq(0).show()
		});
		$("#psInfo").mouseleave(function() {
			$(".srr-tips").hide()
		})
	}
	jQuery.extend({
		initLoginForm: function() {
			$("#randCodeForm_id").validate({
				wrapper: "li",
				rules: {
					randCode: {
						randCodeRequired: true,
						randCodeLength: true,
						randCodeFormat: true,
						checkRandCode: "randp"
					}
				},
				errorPlacement: function() {}
			})
		}
	});

	function aN() {
		$("#randCodeForm_id").on("submit", function(a) {
			a.preventDefault()
		})
	}
	function aV() {
		$(".pos-rel input").focus(function() {
			elemOnkeyupNotice(this);
			$(this).next().show();
			$(this).css("border", "1px solid #2D8DCF")
		}).mouseover(function() {
			if (!$(this).prop("disabled")) {
				elemOnkeyupNotice(this);
				$(this).next().show();
				$(this).css("border", "1px solid #2D8DCF")
			}
		});
		$(".pos-rel input").mouseout(function() {
			$(this).next().hide();
			$(this).css("border", "1px solid #CFCDC7")
		});
		$(".pos-rel input").blur(function() {
			$(this).next().hide();
			$(this).css("border", "1px solid #CFCDC7")
		})
	}
	function bw() {
		bf("0")
	}
	function bf(e) {
		if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc && goOrderDTO != null) {
			var d = goOrderDTO.tickets;
			var a = new Array();
			for (var c = 0; c < d.length; c++) {
				var b = d[c];
				a.push(new aG(new Date(b.train_date.time), new Date(b.stationTrainDTO.start_time.time), b.stationTrainDTO.station_train_code, b.stationTrainDTO.from_station_name, b.stationTrainDTO.to_station_name, b.seat_type_name, b.coach_name, b.seat_name, b.passengerDTO.passenger_name, b.passengerDTO.passenger_id_type_name, b.ticket_type_name, b.ticket_price));
				limit_tickets.push(new aY("sdAdd_" + aZ(), b.seat_type_code, b.seat_type_name, b.ticket_type_code, b.ticket_type_name, b.passengerDTO.passenger_name, b.passengerDTO.passenger_id_type_code, b.passengerDTO.passenger_id_type_name, b.passengerDTO.passenger_id_no, b.passengerDTO.mobile_no, "checked='checked'", ticketInfoForPassengerForm.tour_flag, true, "", true))
			}
			br(a);
			ableClickSubmitButtonOrPreStepBUtton()
		} else {
			if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc && oldTicketDTOs != null) {
				var f = new Array();
				for (var c = 0; c < oldTicketDTOs.length; c++) {
					var b = oldTicketDTOs[c];
					f.push(new aG(new Date(b.train_date.time), new Date(b.stationTrainDTO.start_time.time), b.stationTrainDTO.sta...ve i - save - dis ");a5(d);if(IsStudentDate){aL("提示","请从常用联系人中选择学生旅客")}else{aL("提示","学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");$(a).find("
					option ").first().attr("
					selected ","
					selected ")}}else{if(!(f.indexOf("
					djPassenger_ ")>-1||f.indexOf("
					normalPassenger_ ")>-1)){$("
					# passenger_id_type_ "+d).removeAttr("
					style ");$("
					# save_ "+d).next().removeClass("
					i - save i - save - dis ").addClass("
					i - save ");aU($(a).val(),d);bh(d,false)}}selectedTicketPassengerAll(document.getElementById("
					selected_ticket_passenger_all "),false);if(!(f.indexOf("
					djPassenger_ ")>-1||f.indexOf("
					normalPassenger_ ")>-1)){bD(a)}b.empty();for(var e=0;e<c.length;e++){b.append(" < option value = '"+c[e].id+"' > "+c[e].value+"（￥"+getSeatTypePriceForSeatName(c[e].value)+"） < /option>")}};function aU(e,b){var d=$("span[id^=del_"+b+"]").attr("id");var c=d.split("_")[2]+"_"+d.split("_")[3];for(var a=0;a<limit_tickets.length;a++){var f=limit_tickets[a];if(f.only_id==c){if(f.name==""&&f.phone_no==""&&f.id_no==""){limit_tickets[a].ticket_type=e;break}}}}function a5(k){var j=$("span[id^=del_"+k+"]").attr("id");if(undefined!=j&&"undefined"!=j&&""!=j){var h=j.split("_")[2]+"_"+j.split("_")[3];$("#passenger_name_"+k).val("");$("#passenger_id_no_"+k).val("");$("#phone_no_"+k).val("");for(var a=0;a<limit_tickets.length;a++){var g=limit_tickets[a];if(g.only_id==h){var c=aZ();var i=new aY("sdAdd_"+c,"","",ticket_submit_order.ticket_type.student,"","","","","","","",ticketInfoForPassengerForm.tour_flag,true,"",true);limit_tickets[a]=i;$("span[id^=del_"+k+"]").attr("id","del_"+j.split("_")[1]+"_sdAdd_"+c);break}}if(h.indexOf("djPassenger")>-1){var b=a9[h.split("_")[1]];var d="djPassenger_"+b.passenger_name+"_"+b.passenger_id_type_code+"_"+b.passenger_id_no+"_"+(b.mobile_no==""?"null":b.mobile_no);$("#"+d).prop("checked",false);$("#"+d).next().removeClass();for(var a=0;a<aO.length;a++){var l=aO[a];if(l==d){aO.splice(a,1);break}}}else{if(h.indexOf("normalPassenger")>-1){var e=bi[h.split("_")[1]];var d="normalPassenger_"+e.passenger_name+"_"+e.passenger_id_type_code+"_"+e.passenger_id_no+"_"+(e.mobile_no==""?"null":e.mobile_no);$("#"+d).prop("checked",false);$("#"+d).next().removeClass();for(var a=0;a<aR.length;a++){var f=aR[a];if(f==d){aR.splice(a,1);break}}}}}}function bt(b){var d=b.name+"_"+b.id_type+"_"+b.id_no;for(var c=0;c<bi.length;c++){var a=bi[c].passenger_name+"_"+bi[c].passenger_id_type_code+"_"+bi[c].passenger_id_no;if(d==a){return bi[c]}}return""}function bh(b,a){$("#passenger_name_"+b).prop("readonly",a);$("#passenger_name_"+b).prop("disabled",a);$("#passenger_id_type_"+b).prop("disabled",a);$("#passenger_id_no_"+b).prop("readonly",a);$("#phone_no_"+b).prop("readonly",a);$("#passenger_id_no_"+b).prop("disabled",a);$("#phone_no_"+b).prop("disabled",a);$("#save_"+b).prop("disabled",a);$("#save_"+b).prop("checked",!a)}function bD(d){var f=$(d).attr("id").split("_")[1];var c=$("#passenger_id_type_"+f);var e=c.val();c.empty();if($(d).val()==ticket_submit_order.ticket_type.disability){var a=false;for(var b=0;b<init_cardTypes.length;b++){if(init_cardTypes[b].id==ticket_submit_order.passenger_card_type.two){c.append("<option value='"+init_cardTypes[b].id+"' "+(init_cardTypes[b].id==e?"selected='selected'":"")+">"+init_cardTypes[b].value+"</option > ");a=true}}if(!a){aL("提示","对不起，您填写的乘车人 < span style = 'color:black;font-size:30px' > < i > "+$("
					# passenger_name_ "+f).val()+" < /i></span > 不能购买残军票！");for(var b=0;b<init_cardTypes.length;b++){c.append(" < option value = '"+init_cardTypes[b].id+"'"+(init_cardTypes[b].id==e?"
					selected = 'selected'":"")+" > "+init_cardTypes[b].value+" < /option>")}}}else{for(var b=0;b<init_cardTypes.length;b++){c.append("<option value='"+init_cardTypes[b].id+"'"+(init_cardTypes[b].id==e?"selected='selected'":"")+">"+init_cardTypes[b].value+"</option > ")}}}getSeatTypePriceForSeatName=function(d){var a=0;var b=getSeatTypePrices();for(var c=0;c<b.length;c++){if(b[c].seat_type_name==d){a=b[c].ticket_price;break}}return a};getSeatTypePrices=function(){var a=function(g,h,i){this.seat_type_name=g;this.ticket_price=h==Number(0)?"":h;this.ticket_statu=i;this.wp_statu=i=="无票"?true:false};var d=new Array();var c=ticketInfoForPassengerForm.leftDetails;for(var b=0;b<c.length;b++){var e=c[b].split(/[(,)]/);var f=new a(e[0],Number(e[1].replace("元","")=="--"?0:e[1].replace("元","")).toFixed(1),e[2]);d.push(f)}d=d.sort(function(g,h){if(Number(g.ticket_price)<Number(h.ticket_price)){return 1}else{if(Number(g.ticket_price)==Number(h.ticket_price)){return 0}else{return -1}}});return d};getI18nResourceValueBykeyForJs=function(a){return submitorder_messages[a]};getSuitNameByFlag=function(d,c){var e=0;var a=0;var f=0;for(var b=0;b<d.length;b++){if(/^[一-龥]+/.test(d.charAt(b))){e+=2;if(b<3){f+=1}}else{e+=1}if(e<=12){a+=1}}if(c){e+=6;if(e>12){return d.substr(0,f==3?3:4)+"...(学生)"}else{return d+" (学生)"}}else{if(e>12){return d.substr(0,5)+"..."}else{return d}}return""};function bv(){$("
					# jfzfNoticeId ").hide()}function aE(){$("
					# jfzfNoticeId ").show()}function aL(a,b){alertWarningMsgByTit_header(a,b)}})();
function OrderQueueWaitTime(e,f,d){this.tourFlag=e;this.waitMethod=f;this.finishMethod=d;this.dispTime=1;this.nextRequestTime=1;this.isFinished=false;this.waitObj}OrderQueueWaitTime.prototype.start=function(){var b=this;b.timerJob();window.setInterval(function(){b.timerJob()},1000)};OrderQueueWaitTime.prototype.timerJob=function(){if(this.isFinished){return}if(this.dispTime<=0){this.isFinished=true;this.finishMethod(this.tourFlag,this.dispTime,this.waitObj);return}if(this.dispTime==this.nextRequestTime){this.getWaitTime()}var e=this.dispTime;var f="";var d=parseInt(e/60);if(d>=1){f=d+"分";e=e%60}else{f="
					1分"}this.waitMethod(this.tourFlag,this.dispTime>1?--this.dispTime:1,f)};OrderQueueWaitTime.prototype.getWaitTime=function(){var b=this;$.ajax({url:ctx+"
					confirmPassenger / queryOrderWaitTime ? random = "+new Date().getTime(),type:"
					GET ",data:{tourFlag:b.tourFlag},dataType:"
					json ",success:function(h){var f=h.data;if(!f.queryOrderWaitTimeStatus){window.location.href=ctx+"
					login / init ? random = "+new Date().getTime()}else{if(f!=null){b.waitObj=f;b.dispTime=f.waitTime;var g=parseInt(f.waitTime/1.5);g=g>60?60:g;var a=f.waitTime-g;b.nextRequestTime=a<=0?1:a}}},error:function(a,e,f){return false}})};
jQuery.validator.addMethod("
					checkLoginUserName ",function(c,a){var d=false;var e=/^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;var b=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[ -퟿豈-﷏ﷰ-￯])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[ -퟿豈-﷏ﷰ-￯])+)*)|((")(((( |	)*(
))?( |	)+)?(([--]|!|[#-[]|[]-~]|[ -퟿豈-﷏ﷰ-￯])|(\\([-	
-]|[ -퟿豈-﷏ﷰ-￯]))))*((( |	)*(
))?( |	)+)?(")))@((([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])|(([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])([a-z]|\d|-|\.|_|~|[ -퟿豈-﷏ﷰ-￯])*([a-z]|\d|[ -퟿豈-﷏ﷰ-￯])))\.)+(([a-z]|[ -퟿豈-﷏ﷰ-￯])|(([a-z]|[ -퟿豈-﷏ﷰ-￯])([a-z]|\d|-|\.|_|~|[ -퟿豈-﷏ﷰ-￯])*([a-z]|[ -퟿豈-﷏ﷰ-￯])))$/i;if(e.test(c)||b.test(c)){d=true}return this.optional(a)||d},"
					wrong username.");jQuery.validator.addMethod("
					requiredUserName ",function(b,a){if("用户名／邮箱"==b){return false}if(b==null||""==b){return false}return true},"
					wrong username.");jQuery.validator.addMethod("
					requiredSchoolName ",function(b,a){if("简码／汉字"==b){return false}if(b==null||""==b){return false}return true},"
					wrong schoolname.");jQuery.validator.addMethod("
					randCodeRequired ",function(b,a){$("
					# i - ok ").css("
					display ","
					none ");return b.length>0},"验证码错误!");jQuery.validator.addMethod("
					randCodeFormat ",function(a,c){$("
					# i - ok ").css("
					display ","
					none ");var b=/^[a-zA-Z0-9]+$/;return this.optional(c)||b.test(a)},"验证码错误!");jQuery.validator.addMethod("
					randCodeLength ",function(b,a){$("
					# i - ok ").css("
					display ","
					none ");return b.length==4},"验证码错误!.");jQuery.validator.addMethod("
					integrationCheck ",function(c,b){var a=/^\d{6}$/;return this.optional(b)||a.test(c)},"
					wrong integrationpassword ");jQuery.validator.addMethod("
					integrationPwdCheck ",function(c,b,a){if($("
					# "+a[0]).val()==$("
					# "+a[1]).val()){return true}return false},"两次输入密码不一致!.");jQuery.validator.addMethod("
					checkRandCode ",function(a,d,b){var c=true;if(a&&a.length==4){$.ajax({url:ctx+"
					passcodeNew / checkRandCodeAnsyn ",type:"
					post ",data:{randCode:a,rand:b},async:false,success:function(e){if(e.data=="
					N "){c=false;$("
					# i - ok ").css("
					display ","
					none ")}else{c=true;$("
					# i - ok ").css("
					display ","
					block ")}}})}else{c=false;$("
					# i - ok ").css("
					display ","
					none ")}return c},"验证码错误!.");jQuery.validator.addMethod("
					validateUsersName ",function(b,a){return this.optional(a)||/^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)},"用户名只能由字母、数字或_组成");jQuery.validator.addMethod("
					checkWriteSpace ",function(a,c){for(var b=0;b<a.length;b++){if(a.charCodeAt(b)==32){return false}}return true},"
					contain writespace ");jQuery.validator.addMethod("
					validateRandCode ",function(b,a){return this.optional(a)||/^[a-zA-Z0-9]+$/.test(b)},"验证码错误!.");jQuery.validator.addMethod("
					checkPassward ",function(a,e,c){var b=true;for(var d=0;d<a.length;d++){if(a.charCodeAt(d)==39||a.charCodeAt(d)==60||a.charCodeAt(d)==62){b=false}if(!b){break}}return this.optional(e)||b},"
					Passward wrong ");function validateSecIdCard(c){var b=0;var f=c;var a={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙",21:"辽宁",22:"吉林",23:"黑龙",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};if(!/^\d{17}(\d|x)$/i.test(f)){return false}f=f.replace(/x$/i,"
					a ");if(a[parseInt(f.substr(0,2))]==null){return false}var h=f.substr(6,4)+" - "+Number(f.substr(10,2))+" - "+Number(f.substr(12,2));var e=new Date(h.replace(/-/g," / "));if(h!=(e.getFullYear()+" - "+(e.getMonth()+1)+" - "+e.getDate())){return false}for(var g=17;g>=0;g--){b+=(Math.pow(2,g)%11)*parseInt(f.charAt(17-g),11)}if(b%11!=1){return false}return true}function validateFirIdCard(c){var b=0;var f;var a={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙",21:"辽宁",22:"吉林",23:"黑龙",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};if(c.length==15){f=idCardUpdate(c)}else{f=c}if(!/^\d{17}(\d|x)$/i.test(f)){return false}f=f.replace(/x$/i,"
					a ");if(a[parseInt(f.substr(0,2))]==null){return false}var h=f.substr(6,4)+" - "+Number(f.substr(10,2))+" - "+Number(f.substr(12,2));var e=new Date(h.replace(/-/g," / "));if(h!=(e.getFullYear()+" - "+(e.getMonth()+1)+" - "+e.getDate())){return false}for(var g=17;g>=0;g--){b+=(Math.pow(2,g)%11)*parseInt(f.charAt(17-g),11)}if(b%11!=1){return false}return true}function idCardUpdate(d){var f;var c=/^(\d){15}$/;if(c.test(d)){var b=0;var e=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);var a=new Array("
					1 ","
					0 ","
					X ","
					9 ","
					8 ","
					7 ","
					6 ","
					5 ","
					4 ","
					3 ","
					2 ");d=d.substr(0,6)+"
					19 "+d.substr(6,d.length-6);for(var g=0;g<d.length;g++){b+=parseInt(d.substr(g,1))*e[g]}d+=a[b%11];f=d}...or.addMethod("
					studentStationRequired ",function(c,b,a){if($(a).val()=="
					3 "){return c&&trim(c)!="简拼 / 全拼 / 汉字"&&trim(c)!=""}return true},"
					wrong studentStationRequired.");jQuery.validator.addMethod("
					studentValidateName ",function(c,b,a){if($(a).val()=="
					3 "){return this.optional(b)||/^[a-zA-Z一-龥0-9\_]+$/.test(c)}return true},"
					wrong username.");jQuery.validator.addMethod("
					checkStudentName ",function(c,b,a){if($(a).val()=="
					3 "){if((!c||trim(c)==""||trim(c)=="简码 / 汉字")){return false}}return true},"
					wrong username.");jQuery.validator.addMethod("
					isQuestionNull ",function(c,b,a){if(jQuery.trim(c)!=""){if(jQuery.trim($(a[0]).val())=="
					customQuestion "&&jQuery.trim($(a[1]).val())==""||jQuery.trim($(a[0]).val())==""){return false}}return true},"
					you should input the question ");jQuery.validator.addMethod("
					isAnswerNull ",function(c,b,a){if((jQuery.trim($(a[0]).val())=="
					customQuestion "&&jQuery.trim($(a[1]).val())!="")||(jQuery.trim($(a[0]).val())!="")){if(jQuery.trim(c)==""){return false}}return true},"
					you should input the answer ");function checkSex(a,c,b){if(!checkSexByCardId(a,c,b)){if(!confirm("性别与身份证中的性别不符，是否继续 ? ")){return false}else{return true}}else{return true}}function checkSexByCardId(a,c,d){function e(j,f){var i=null;if(f.length==15){i=f.substring(14,15)}else{if(f.length==18){i=f.substring(16,17)}else{return true}}if(i=="
					x "||i=="
					X "){i="
					10 "}var h=parseInt(i);var g=h%2;if(g===0&&j==="
					F "){return true}else{if(g===1&&j==="
					M "){return true}else{return false}}}var b=$(d).val();if(checkIfSecIdCard($(c).val())&&validateSecIdCard(b)){if(b!==""){return e(a,b)}else{return true}}else{if(checkIfFirIdCard($(c).val())&&validateFirIdCard(b)){if(b!==""){return e(a,b)}else{return true}}else{return true}}}function checkBirdDateByCardId(a,c,e){var d=null;var b=$(e).val();if(checkIfSecIdCard($(c).val())&&b!==""&&validateSecIdCard(b)){d=b.substring(6,14)}else{if(checkIfFirIdCard($(c).val())&&b!==""&&validateFirIdCard(b)){if(b.length==15){d="
					19 "+b.substring(6,12)}else{if(b.length==18){d=b.substring(6,14)}}}else{return true}}if(a!==""){a=a.replace(/-/g,"");if(a!=d){return false}else{return true}}else{return true}}function checkBirdate(a,c,b){if(!checkBirdDateByCardId(a,c,b)){if(!confirm("出生日期与身份证中的出生日期不符，是否继续 ? ")){return false}else{return true}}else{return true}}jQuery.validator.addMethod("
					checkPwdValidate ",function(b,a){return this.optional(a)||/(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)},"
					contain writespace ");jQuery.validator.addMethod("
					checkConfirmPassWard ",function(c,b,a){if($(a).val()!=null){return $(a).val()==c}return true},"
					contain writespace ");jQuery.validator.addMethod("
					IVR_passwd_format ",function(c,b){var a=/^[0-9]{6}$/;return this.optional(b)||a.test(c)},"验证码错误!.");jQuery.validator.addMethod("
					checkStation ",function(b,a){if((!b||trim(b)==""||trim(b)=="简拼 / 全拼 / 汉字"||trim(b)=="简拼 / 全拼 / 汉字或↑↓")){return false}return true},"
					wrong username.");jQuery.validator.addMethod("
					checkAnsyUserName ",function(c,a,d){var f=d[0];var b=$("
					# "+d[1]).val();var e=true;$.ajax({url:f+" ? user_name = "+c,type:"
					get ",async:false,success:function(g,h){if(g.data==true){e=false}else{e=true}},error:function(i,h,g){e=false}});return e},"
					wrong cardNo ");function checkPwdRank(c,d,b){var e=$(c);var a=e.val();if(a.length<=6||new RegExp(" ^ [a - zA - Z] {
						6,
					}
					$ ").test(a)||new RegExp(" ^ [0 - 9] {
						6,
					}
					$ ").test(a)||new RegExp(" ^ [_] {
						6,
					}
					$ ").test(a)){$("
					# "+d).attr("
					title ","危险");$("
					# "+b).html("危险");$("
					# "+d).removeClass("
					rank - a ");$("
					# "+d).removeClass("
					rank - b ");$("
					# "+d).removeClass("
					rank - c ");$("
					# "+d).addClass("
					rank - a ")}else{if(a.length>6&&new RegExp(" [a - zA - Z]").test(a)&&new RegExp(" [0 - 9]").test(a)&&new RegExp(" [_]").test(a)){$("
					# "+d).attr("
					title ","安全");$("
					# "+b).html("安全");$("
					# "+d).removeClass("
					rank - a ");$("
					# "+d).removeClass("
					rank - b ");$("
					# "+d).removeClass("
					rank - c ");$("
					# "+d).addClass("
					rank - c ")}else{$("
					# "+d).attr("
					title ","一般");$("
					# "+b).html("一般");$("
					# "+d).removeClass("
					rank - a ");$("
					# "+d).removeClass("
					rank - b ");$("
					# "+d).removeClass("
					rank - c ");$("
					# "+d).addClass("
					rank - b ")}}}Array.prototype.unique=function(){var c={},b=this.length;for(var a=0;a<b;a++){if(typeof c[this[a]]=="
					undefined "){c[this[a]]=1}}this.length=0;b=0;for(var a in c){this[b++]=a}return this};function checkSearchPwdRank(c,f,b){var h=$(c);var a=h.val();if(a.length<6){$("
					# "+f).attr("
					title ","危险");$("
					# "+b).html("危险");$("
					# "+f).removeClass("
					rank - a ");$("
					# "+f).removeClass("
					rank - b ");$("
					# "+f).removeClass("
					rank - c ");$("
					# "+f).addClass("
					rank - a ")}else{var d=[];for(var e=0;e<6;e++){d.push(a.charAt(e))}d=d.unique();var g=d.length;if(g==1){$("
					# "+f).attr("
					title ","危险");$("
					# "+b).html("危险");$("
					# "+f).removeClass("
					rank - a ");$("
					# "+f).removeClass("
					rank - b ");$("
					# "+f).removeClass("
					rank - c ");$("
					# "+f).addClass("
					rank - a ")}else{if(g>1&&g<5){$("
					# "+f).attr("
					title ","一般");$("
					# "+b).html("一般");$("
					# "+f).removeClass("
					rank - a ");$("
					# "+f).removeClass("
					rank - b ");$("
					# "+f).removeClass("
					rank - c ");$("
					# "+f).addClass("
					rank - b ")}else{$("
					# "+f).attr("
					title ","安全");$("
					# "+b).html("安全");$("
					# "+f).removeClass("
					rank - a ");$("
					# "+f).removeClass("
					rank - b ");$("
					# "+f).removeClass("
					rank - c ");$("
					# "+f).addClass("
					rank - c ")}}}};
var defaultLoadGrayBackgroundModalbox="";var loadGrayBackground;var unLoadGrayBackground;(function(){loadGrayBackground=function(){var b=dhtmlx.modalbox({targSrc:'<div><img src="'+ctx+'
					resources / images / loading.gif "></img></div>',callback:function(){}});defaultLoadGrayBackgroundModalbox=b};unLoadGrayBackground=function(){if(defaultLoadGrayBackgroundModalbox!=""){dhtmlx.modalbox.hide(defaultLoadGrayBackgroundModalbox);defaultLoadGrayBackgroundModalbox=""}}})();
var ticket_submit_order={ticket_type:{adult:"
					1 ",child:"
					2 ",student:"
					3 ",disability:"
					4 "},ticket_type_name:{"
					1 ":"成人票","
					2 ":"孩票","
					3 ":"学生票","
					4 ":"伤残军人票"},tour_flag:{dc:"
					dc ",wc:"
					wc ",fc:"
					fc ",gc:"
					gc ",lc1:"
					l1 ",lc2:"
					l2 "},passenger_type:{adult:"
					1 ",child:"
					2 ",student:"
					3 ",disability:"
					4 "},passenger_card_type:{two:"
					1 ",one:"
					2 ",tmp:"
					3 ",passport:"
					B ",hongkong_macau:"
					C ",taiwan:"
					G "},request_flag:{isAsync:"
					1 "},ticket_query_flag:{query_commom:"
					00 ",query_student:"
					0X00 "},seatType:{yz_type:"
					1 "},special_areas:{lso:"
					LSO ",dao:"
					DAO ",ado:"
					ADO ",nqo:"
					NQO ",tho:"
					THO "}};
var submitorder_messages={"
					message.confirm ":"您确认吗？","
					message.info ":"信息提示","
					button.ok ":"确认","
					message.error ":"错误提示"};
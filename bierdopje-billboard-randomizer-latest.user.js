// ==UserScript==
// @name         Bierdopje Billboard Randomizer
// @namespace    http://www.bierdopje.com
// @version      1.0
// @description  Randomizes the billboard on the homepage.
// @match        http://*.bierdopje.com/
// @run-at       document-start
// @grant        unsafeWindow
// @require      http://code.jquery.com/jquery-1.10.2.js
// @author       Tom
// @copyright    2016+, Tom
// ==/UserScript==
/* jshint -W097 */
/* global $, console */
'use strict';

console.log("Bierdopje billboard randomizer ready to rock and roll");

var ROTATION_SPEED = 7500; // ms. Default value: 7500. Recommended: 4000 ~ 10000
var TOTAL_BOARDS = $("#billboard div").size();

$(function() {
	preInit();
	
	function preInit() {
		stopDefaultBillboardBehavior();
		hideDefaultBillboard();
		setInitialBillboard();
	}
	
	function stopDefaultBillboardBehavior() {
		for (var i = 1; i <= 10; i++) {
			window.clearInterval(i);
		}
	}
	
	function hideDefaultBillboard() {
		$("#billboard div:eq(0)").hide();
		$("#billboardtext div:eq(0)").hide();
	}
	
	function setInitialBillboard() {
		var random = Math.floor((Math.random() * TOTAL_BOARDS) + 1);
		
		$("#billboard div:eq(" + random + ")").show();
		$("#billboardtext div:eq(" + random + ")").show();
	}
});

$(window).load(function() {
	postInit();
	
	function postInit() {
		setInterval(showNextItemOnBillboard, ROTATION_SPEED);
	}

	function showNextItemOnBillboard() {
		var currentBoardImage = $("#billboard div:visible");
		var currentBoardText = $("#billboardtext div:visible");
		var nextRandomBoard = Math.floor((Math.random() * TOTAL_BOARDS) + 1);

		currentBoardText.slideUp("slow", function() {
			$("#billboard div:eq(" + nextRandomBoard + ")").animate({
				width: 'show'
			}, 'slow', function() {
				currentBoardImage.fadeOut("slow", function() {
					$("#billboardtext div:eq(" + nextRandomBoard + ")").slideDown("slow");
				});
			});
		});
	}
});
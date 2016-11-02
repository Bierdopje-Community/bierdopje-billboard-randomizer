// ==UserScript==
// @name         Bierdopje Billboard Randomizer
// @namespace    http://www.bierdopje.com
// @version      0.0.1
// @description  Randomizes the billboard on the homepage
// @match        http://*.bierdopje.com/
// @run-at       document-start
// @grant        unsafeWindow
// @require      http://code.jquery.com/jquery-1.10.2.js
// @author       Tom
// @copyright    2016+, Tom
// ==/UserScript==
/* jshint -W097 */
/*global $, console */
'use strict';

// DO NOT USE, DOES NOT WORK (PROPERLY)

var ROTATION_SPEED = 7500; // ms, default value

$(function() {
	initialize();

	function initialize() {
		hideOriginalBillboard();
		stopOriginalInterval();
		
		var totalBillBoards = $("#billboard div").size();
		initializeFirstBillboard(totalBillBoards);
		
		//setInterval(showNextItemOnBillboard(totalBillBoards), ROTATION_SPEED);
	}
	
	function hideOriginalBillboard() {
		$("#billboard div:eq(0)").hide();
		$("#billboardtext div:eq(0)").hide();
	}
	
	function stopOriginalInterval() {
		var intervalId = setInterval("rotator", 7500);
		
		for (var i = 1; i <= intervalId; i++) {
			clearInterval(i);
		}
	}
	
	function initializeFirstBillboard(totalBillBoards) {
		var initValue = Math.floor((Math.random() * totalBillBoards) + 1);
		
		$("#billboard div:eq(" + initValue + ")").show();
		$("#billboardtext div:eq(" + initValue + ")").show();
	}
	
	function showNextItemOnBillboard(totalBillBoards) {
		var random = Math.floor((Math.random() * totalBillBoards) + 1);
		console.log("rotating to: " + random);
		console.log("totalBillBoards: " + totalBillBoards);
		
		$("#billboardtext div:visible").slideUp("slow", function() {
			$("#billboard div:eq(" + random + ")").animate({
				width: 'show'
			}, 'slow', function() {
				$("#billboard div:visible").fadeOut("slow", function() {
					$("#billboardtext div:eq(" + random + ")").slideDown("slow");
				});
			});
		});
	}
});
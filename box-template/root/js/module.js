/*
 * @Author      {%=AuthorName%}
 * @Email       {%=AuthorEmail%}
 * @Date        {%=timeString%}
 * @Description {%=Description%}
 * !!cmd:compress=true
 */

 define(['require', 'exports', 'jquery'], function(require, exports, $) {
 	var package{%=timeStamp%} = {
 		init: function() {
 			this.cotainer = $('.{%=ModuleName%}');

 			this.events();
 		},
 		events: function() {

 		}
 	};

 	$(function() {
 		package{%=timeStamp%}.init();
 	});
 });
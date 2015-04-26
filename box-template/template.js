'use strict';

// This brief template description will be displayed along with the template name when the user runs grunt init or grunt-init to display a list of all available init templates.
exports.description = '无线开发环境初始化';

// If specified, this optional extended description will be displayed before any prompts are displayed. This is a good place to give the user a little help explaining naming conventions, which prompts may be required or optional, etc.
exports.notes = '\n1、进入自己的某个目录\
				 \n2、在该目录下运行“grunt-init box-template”命令并填写一些项目信息\
				 \n3、之后在该目录下运行“npm install”命令安装依赖包\
				 \n4、最后在该目录下运行“grunt”命令预览项目静态文件'

// If this optional (but recommended) wildcard pattern or array of wildcard patterns is matched, Grunt will abort with a warning that the user can override with --force. This is very useful in cases where the init template could potentially override existing files.

// 防止文件被覆盖
exports.warnOn = "{{%=ModuleName%}}";

//生成当前时间
var 
	nowTime = new Date,
	nowYear = nowTime.getFullYear(),
	nowMonth = nowTime.getMonth()+1,
	nowDay = nowTime.getDate(),
	nowHours = nowTime.getHours(),
	nowMinutes = nowTime.getMinutes(),
	nowSeconds = nowTime.getSeconds(),
	timeString = '',
	spliceTimeString = '';

nowMonth = nowMonth <= 9 ? '0' + nowMonth : nowMonth;
nowDay = nowDay <= 9 ? '0' + nowDay : nowDay;
nowHours = nowHours <= 9 ? '0' + nowHours : nowHours;
nowMinutes = nowMinutes <= 9 ? '0' + nowMinutes : nowMinutes;
nowSeconds = nowSeconds <= 9 ? '0' + nowSeconds : nowSeconds;

timeString = [nowYear, nowMonth, nowDay].join('.') + ' ' + [nowHours, nowMinutes, nowSeconds].join(':');

spliceTimeString = [nowYear, nowMonth, nowDay, nowHours, nowMinutes].join('');

// The grunt argument is a reference to grunt, containing all the grunt methods and libs. The init argument is an object containing methods and properties specific to this init template. The done argument is a function that must be called when the init template is done executing.
exports.template = function(grunt, init, done) {
	init.process({}, [
		init.prompt('ModuleName', 'mod-'+spliceTimeString),
		init.prompt('Description', '盒子组件'),
		init.prompt('AuthorName', 'shijun.lisj'),
		init.prompt('AuthorEmail', 'shijun.lisj@alibaba-inc.com')
	], function(err, props) {
		//生成当前时间字符串
		props.timeString = timeString;
		//默认生成的时间戳
		props.timeStamp = spliceTimeString;

		// As long as a template uses the init.filesToCopy and init.copyAndProcess methods, any files in the root/ subdirectory will be copied to the current directory when the init template is run.
		// Note that all copied files will be processed as templates, with any {% %} template being processed against the collected props data object, unless the noProcess option is set.
		var files = init.filesToCopy(props);
		init.copyAndProcess(files, props);
	});
};
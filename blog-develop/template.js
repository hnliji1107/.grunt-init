'use strict';

// This brief template description will be displayed along with the template name when the user runs grunt init or grunt-init to display a list of all available init templates.
exports.description = '创建一个blog任务模板';

// If specified, this optional extended description will be displayed before any prompts are displayed. This is a good place to give the user a little help explaining naming conventions, which prompts may be required or optional, etc.
exports.notes = '\n首先通过“grunt-init blog-develop”命令在某个文件夹下创建一个项目，之后进入创建的文件夹（默认是blog-task）中运行“npm install”命令初始化执行环境，最后执行“grunt”命令。\
	 			 \n可以指定需要运行项目的位置（相对于blog-task文件夹），这里默认是“../resource-blog/”。';

// If this optional (but recommended) wildcard pattern or array of wildcard patterns is matched, Grunt will abort with a warning that the user can override with --force. This is very useful in cases where the init template could potentially override existing files.

// 防止Gruntfile.js、package.json被覆盖
exports.warnOn = "{blog-task/Gruntfile.js, blog-task/package.json}";

// The grunt argument is a reference to grunt, containing all the grunt methods and libs. The init argument is an object containing methods and properties specific to this init template. The done argument is a function that must be called when the init template is done executing.
exports.template = function(grunt, init, done) {
	init.process({}, [
		init.prompt('blogPath', '../resource-blog/')
	], function(err, props) {
		// As long as a template uses the init.filesToCopy and init.copyAndProcess methods, any files in the root/ subdirectory will be copied to the current directory when the init template is run.
		// Note that all copied files will be processed as templates, with any {% %} template being processed against the collected props data object, unless the noProcess option is set.
		var files = init.filesToCopy(props);
		init.copyAndProcess(files, props);
	});
};
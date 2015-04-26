module.exports = function(grunt) {
	// 加载所有的任务，https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        rootPath: '{%= BlogName %}/',
        jsBasePath: '<%= rootPath %>js/',
        cssBasePath: '<%= rootPath %>css/',
        htmlBasePath: '<%= rootPath %>templates/',
        imgBasePath: '<%= rootPath %>images/',
        SyntaxHighlighterPath: '<%= rootPath %>SyntaxHighlighter/',

        // 检测代码中的错误
        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
            files: ['<%= jsBasePath %>*.js']
        },

        // 压缩指定文件夹中所有的js文件为一个js文件，并存放在指定文件夹中。
        // https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            main_min: {
                files: {
                    '<%= jsBasePath %>compressor/main.min.js': [
                        '<%= jsBasePath %>boxy.js',
                        '<%= jsBasePath %>common.js',
                        '<%= jsBasePath %>module.js'
                    ]
                }
            }
            ,asynLoadJs_min : {
                files: {
                    '<%= jsBasePath %>compressor/asynLoadJs.min.js': [
                        '<%= jsBasePath %>asynLoadJs.js'
                    ]
                }
            }
            ,shx_min: {
                files: {
                    '<%= SyntaxHighlighterPath %>Scripts/compressor/shx.min.js': [
                        '<%= SyntaxHighlighterPath %>Scripts/shCore.js',
                        '<%= SyntaxHighlighterPath %>Scripts/shBrushCss.js',
                        '<%= SyntaxHighlighterPath %>Scripts/shBrushJScript.js',
                        '<%= SyntaxHighlighterPath %>Scripts/shBrushPhp.js',
                        '<%= SyntaxHighlighterPath %>Scripts/shBrushXml.js',
                    ]
                }
            }
        },

        // 压缩指定文件夹中所有的css文件为一个css文件，并存放在指定文件夹中。
        // https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            common_css: {
                files: {
                    '<%= cssBasePath %>compressor/common.min.css': ['<%= cssBasePath %>common.css']
                }
            }
        },

        // 监控指定文件，一旦任何文件出现改动就会执行指定的任务（这里会执行 jshint 和 qunit 任务）。
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            files: ['<%= jsBasePath %>*.js', '<%= cssBasePath %>*.css'],
            tasks: [/*'jshint', */'uglify', 'cssmin', 'watch']
        }
    });

    // Default task(s).
    grunt.registerTask('default', [/*'jshint', */'uglify', 'cssmin', 'watch']);

};
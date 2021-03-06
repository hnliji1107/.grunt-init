﻿module.exports = function(grunt) {
    // 加载所有的任务，https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    //显示每一个任务所花的时间和百分比
    require('time-grunt')(grunt);
    
    // 工作根目录
    var workspace = '{%=ModuleName%}';

    // 插件配置
    grunt.initConfig({
    	// 文件根目录
        workspace: workspace

        // 本地静态服务器配置，https://github.com/gruntjs/grunt-contrib-connect
        ,connect: {
            options: {
                port: 9000,
                // 可配置为本机某个 IP、localhost 或域名
                hostname: 'localhost',
                // 声明给 watch 监听的端口
                livereload: 35729
            }

            // https://github.com/intesso/connect-livereload
            ,livereload: {
                options: {
                    middleware: function(connect, options) {
                        return [
                            // 把脚本，注入到静态文件中
                            require('connect-livereload')({
                                port: '<%=connect.options.livereload%>'
                            }),
                            // 静态文件服务器的路径
                            connect.static(options.base),
                            // 启用目录浏览(相当于IIS中的目录浏览)
                            connect.directory(options.base)
                        ];
                    }
                }
            }
 
            ,server: {
                options: {
                    // 自动打开网页
                    open: true,
                    // 主目录
                    base: '<%=workspace%>'
                }
            }
        }
 	
 		// 实时监控，https://github.com/gruntjs/grunt-contrib-watch
        ,watch: {
            livereload: {
                options: {
                    // 监听前面声明的端口
                    livereload: '<%=connect.options.livereload%>'
                },
                
                // 下面文件的改变就会实时刷新网页
                files: [
                    '<%=workspace%>/**/*.*'
                ]
            }

            ,css: {
                files: ['<%=workspace%>/css/*.less']
                ,tasks: ['less:style']
            }
        }

        // less预处理，https://github.com/gruntjs/grunt-contrib-less
        ,less: {
            style: {
                files: {
                    '<%=workspace%>/css/module.css': '<%=workspace%>/css/module.less'
                }
            }
        }
    });
 	
 	// 注意，connect:server实现实时预览的页面（该页面默认是当前文件夹下的index.html，如果不存在，则显示当前文件夹中的文件列表）必须保证有body元素。
 	// 因为livereload插件会在body元素最后追加一个livereload.js脚本用于服务器和静态页面通信。
    grunt.registerTask('default', ['connect:server', 'less:style', 'watch']);
}
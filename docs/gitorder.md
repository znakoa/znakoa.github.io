---
sidebar_position: 1
---

# git常见实战命令


### 查看状态
```
$ git status
```      

### 添加管理(将文件或目录添加到本地仓库的暂存区)
```
$ git add filename  ### 将指定的文件添加到暂存区
$ git add path/     ### 将指定的目录添加到暂存区
$ git add .         ### 将当前目录所有内容(文件和文件夹)添加到暂存区
$ git add --all     ### 将当前目录所有内容(文件和文件夹)添加到暂存区
```


### 将文件移出暂存区
```
$ git rm --cached filenamed
```


### 将暂存区的内容提交到本地仓库 （yarn lint:fix   处理eslint格式）
```
$ git commit -m ''
 build:用于修改项目构建系统，例如修改依赖库、外部接口或者升级Node 版本等;
 chore:用于对非业务性代码进行修改，例如修改构建流程或者工具配置等;
 ci: 用于修改持续集成流程，例如修改Travis、Jenkins等工作流配置; 
 docs:用于修改文档，例如修改README 文件、API 文档等; 
 style: 用于修改代码的样式，例如调整缩进、空格、空行等;
 refactor:用于重构代码，例如修改代码结构、变量名、函数名等但不修改功能逻辑;
 perf: 用于优化性能，例如提升代码的性能、减少内存占用等;
 test: 用于修改测试用例，例如添加、删除、修改代码的测试用例等。
```


### 查看提交日志
```
$ git log
 ```


### 恢复历史版本
``` 
$ git reset --hard hash(前六位)
$ git push -f origin xxx 推送到远程 
```
 

### 恢复文件
```
$ git checkout filename
 ```


### 查看分支
```
$ git branch
```


### 更新远程分支
```
$ git fetch origin
```

### 或者
```
$ git remote update origin --prune 
 ```


### 创建分支
```
$ git branch 分支名
```


### 推送/拉取到远程分支 git pull是两个指令的组合：git fetch和git merge
```
$git push/pull origin 分支名
```


### 切换分支
```
$ git checkout 分支名
```


### 返回上游分支
```
$ git checkout -
```


### 合并远程分支 
```
$ git merge 远程分支名
```


### 代码冲突后，放弃或者退出流程：
### 放弃,回到操作前的样子，就像什么都没发生过
```
$ gits cherry-pick --abort
```


### 退出,不回到操作前的样子,即保留已经 cherry-pick 成功的 commit，并退出 cherry-pick 流程：
```
$ git cherry-pick --quit
```


### 删除本地已合并的分支：
```
$ git branch -D [branchName] 
```


### 删除远程分支: 
```
$ git push origin --delete [branchname]
```


### 添加远程仓库地址 并取名 origin
```
$ git remote add origin url    //一般新建仓库就有，直接复制
```


### 创建并切换到 XXX 分支
```
$ git branch -M XXX
```


### 将本地仓库推送到远程仓库
```
$ git push -u origin 分支名    //一般新建仓库就有，直接复制   //git push -u origin master   主分支
```


### 如果返回： fatal: 远程 origin 已经存在。   此时只需要将远程配置删除，重新添加即可；
```
$ git remote rm origin
```


### 克隆远程仓库(从无到有)
```
$ git clone https://github.com/jxsrzj0325/mi.com.git
```


### 从远程仓库拉取分支(更新)
```
$ git pull origin master
```


### 保存当前未commit的代码
```
$ git stash
```


### 保存当前未commit的代码并添加备注
```
$ git stash save "备注的内容"
```


### 列出stash的所有记录
```
$ git stash list
```


### 删除stash的所有记录
```
$ git stash clear
```


### 应用最近一次的stash
```
$ git stash apply
```


### 应用最近一次的stash，随后删除该记录
```
$ git stash pop
```


### 删除最近的一次stash
```
$ git stash drop
```


### 查看所有tag
```
$ git tag -l 
```


### 打tag
```
$ git tag v1.0.0 
```


### 提交tag
```
$ git push origin v1.0.0 
```


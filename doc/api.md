
user:  
```
user: {
    name: "name",
    id: "123",
}
```  

link:  
```  
link: {
    webname: "web name",
    url: "www.xxx.yyy",
}
```


## GET /api/appinfo  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| name | app 名 | `"app name"` |
| authors | 作者列表 | `[user]` |
| createdate | 创建日期 | `"2023-11-11"` |
| updatedate | 修改日子 | `"2023-11-11"` |
| links | 相关链接 | `[{webname: "link name", url: "www.xxx.yyy"}]` |
| tags | 标签 | `[{name: "tag name", _id: 123}]` |
| platform | 运行平台 | `["Windows", "Web"]` | 
| logo | 头像 | `"upload/applogo/xxx.png"` |

## GET /api/appdescribe  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| describe | 主页描述 | `"home page"` |  

## GET /api/comments  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| comments | 评论列表 | `[{_id: "", author: user, score: 5, content: "content"}]` |  

## GET /api/replies  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | comment id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| replies | 回复列表 | `[{_id: "", author: user}]` |  

## GET /api/appdownload

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| downloads | 下载列表 | `[{platform: "Windows", uploaddate: "2023-11-11", downloadid=""}]` |  

## GET /api/userinfo  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | user id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| user | 用户名、id | `user` |  
| intro | 简介 | `"intro"` |
| type | 用户类型 | `"普通用户"` |
| regdate | 注册时间 | `"2023-11-11"` |
| visdate | 访问时间 | `"2023-11-11"` |
| links | 相关链接 | `[{webname: "link name", url: "www.xxx.yyy"}]` |
| logo | 头像 | `"upload/userlogo/xxx.png"` |

## GET /api/userprojects  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | user id | `""` |  

returns 

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| projects | 用户项目 id 列表 | `["123"]` |  

## GET /api/tags  

params  

none  

returns 

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| tags | 标签列表 | `[_id: "123", name: "tag name"]` |  

## GET /api/search  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| tag（可选） | 选定标签 | `"123"` |
| platform（可选） | 选定平台 | `"Windows"` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| projects | 搜索结果项目 id 列表 | `["123"]` |  

## POST /api/appinfo  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id（可选） | 项目 id，留空为新建 | `123` |
| name | 项目名称 | `"app name"` |
| tags | 项目标签的 id 的列表 | `[2, 4]` |
| paltform | 运行平台列表 | `["Windows", "Web"]` |
| links | 相关链接列表 | `[{webname: "url name", url: "www.xxx.yyy"}]` |
| describe | 描述 | `"hello world"` |

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 项目 id | `123` |  

## POST /api/userinfo

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 用户 id | `123` |
| intro | 用户描述 | `"I'm user"` |
| links | 用户链接 | `[{webname: "url name", url: "www.xxx.yyy"}]` |   

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 用户 id | `123` |

## POST /api/comment  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| score | 打分 | `5` |
| content | 评论内容 | `"hello"` |  
| parent | 被打分 app 的 id | `123` |

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 评论 id | `123` |  

## POST /api/reply  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| parent | 被回复的评论 id | `123` |
| content | 回复内容 | `"hello"` |

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 回复 id | `123` |

## POST /api/userinfo  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| intro | 自我介绍 | `"hello"` |
| links | 相关链接 | `[{webname: "link name", url: "www.xxx.yyy"}]` |

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | 用户 id | `123` |  

## POST /api/login 

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| name | 用户名 | `"1st"` |
| password | 密码 | `123456` |

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| token | 用户token | `ahsfkgfjhgfjsadf` |


然后userinfo这些都改成传token了

## POST /api/usercreate 

params  
```
const newuser = new User({
        name:req.body.name,
        intro:req.body.intro,
        password:req.body.password,
        regdate:nowDate,
        visdate:nowDate,
        projects:req.body.projects,
        links:req.body.links,
        type:req.body.type,
    });
```
returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \token | 用户 token | `12asdffasdafsd3` |  

## POST /api/whoami

params  

none  

returns  

| 名称 | 解释 | 示例 |
| user | 客户端登陆用户信息 | `{name:"username", _id:123456}` |  

若未登陆，`_id` 为 0  




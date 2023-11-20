
```  
user: {
    name: "name",
    id: "123",
}
```  

## GET /appinfo  

params  

| \_id | app id | `""` |  

returns  

| name | app 名 | `"app name"` |
| authors | 作者列表 | `["1", "2"]` |
| creatdate | 创建日期 | `"2023-11-11"` |
| updatedate | 修改日子 | `"2023-11-11"` |
| links | 相关链接 | `[{name: "link name", url: "www.xxx.yyy"}]` |
| tags | 标签 | `["tag name"]` |
| platform | 运行平台 | `["Windows", "Web"]` | 

## GET /appdescribe  

params  

| \_id | app id | `""` |  

returns  

| describe | 主页描述 | `"home page"` |  

## GET /comments  

params  

| \_id | app id | `""` |  

returns  

| comments | 评论列表 | `[{_id: "", author: user, score: 5, content: "content"}]` |  

## GET /replies  

params  

| \_id | comment id | `""` |  

returns  

| replies | 回复列表 | `[{_id: "", author: user}]` |  

## GET /appdownload

params  

| \_id | app id | `""` |  

returns  

| downloads | 下载列表 | `[{platform: "Windows", uploaddate: "2023-11-11", downloadid=""}]` |  

## GET /userinfo  

params  

| \_id | user id | `""` |  

returns  

| user | 用户名、id | `user` |  
| intro | 简介 | `"intro"` |
| type | 用户类型 | `"普通用户"` |
| regdate | 注册时间 | `"2023-11-11"` |
| visdate | 访问时间 | `"2023-11-11"` |
| links | 相关链接 | `[{name: "link name", url: "www.xxx.yyy"}]` |

## GET /userprojects  

params  

| \_id | user id | `""` |  

returns 

| projects | 用户项目 id 列表 | `["123"]` |  

## GET /tags  

params  

| none |  

returns 

| tags | 标签列表 | `[\_id: "123", name: "tag name"]` |  

## GET /search  

params  

| tag（可选） | 选定标签 | `"123"` |
| platform（可选） | 选定平台 | `"Windows"` |  

returns  

| projects | 搜索结果项目 id 列表 | `["123"]` |  




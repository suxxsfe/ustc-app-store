
```  
user: {
    name: "name",
    id: "123",
}
```  

## GET /appinfo  

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
| links | 相关链接 | `[{name: "link name", url: "www.xxx.yyy"}]` |
| tags | 标签 | `["tag name"]` |
| platform | 运行平台 | `["Windows", "Web"]` | 

## GET /appdescribe  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| describe | 主页描述 | `"home page"` |  

## GET /comments  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| comments | 评论列表 | `[{_id: "", author: user, score: 5, content: "content"}]` |  

## GET /replies  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | comment id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| replies | 回复列表 | `[{_id: "", author: user}]` |  

## GET /appdownload

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | app id | `""` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| downloads | 下载列表 | `[{platform: "Windows", uploaddate: "2023-11-11", downloadid=""}]` |  

## GET /userinfo  

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
| links | 相关链接 | `[{name: "link name", url: "www.xxx.yyy"}]` |

## GET /userprojects  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| \_id | user id | `""` |  

returns 

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| projects | 用户项目 id 列表 | `["123"]` |  

## GET /tags  

params  

none  

returns 

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| tags | 标签列表 | `[_id: "123", name: "tag name"]` |  

## GET /search  

params  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| tag（可选） | 选定标签 | `"123"` |
| platform（可选） | 选定平台 | `"Windows"` |  

returns  

| 名称 | 解释 | 示例 |
| ---- | ---- | ---- |
| projects | 搜索结果项目 id 列表 | `["123"]` |  




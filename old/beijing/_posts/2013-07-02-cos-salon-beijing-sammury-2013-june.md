---
layout: post
title:  "COS数据分析沙龙（北京站）第9期纪要"
img: p4.jpg
---

<p>2013年6月23日，第9期COS数据分析沙龙（北京站）在明主1016如期举行。本期沙龙主题是“RHadoop助R突破大数据难关”；沙龙嘉宾张丹先生围绕沙龙主题分享了有关在<code>ubuntu</code>系统下配置<code>RHadoop</code>的相关知识以及基于<code>RHadoop</code>完成数据分析工作的相关案例。</p>
<!-- more -->
<img title="" alt="配图" src="http://blog.fens.me/wp-content/uploads/2013/06/photo-cos1-small.jpg">

<p>张丹先生，系资深程序开发员，R语言爱好者；前天际网职员，混迹互联网和软件行业多年；曾参与开发多种不同类型的系统及应用，熟悉R/JAVA/PHP/Javacript等语言。对系统架构、编程算法、数据分析等诸多领域有自身见解，并推出了两款互联网小应用：<a href="http://www.fens.me">晒粉丝</a>和<a href="http://apps.weibo.com/chinaweatherapp">每日天气</a>。</p>
<p>沙龙开始嘉宾先对<code>RHadoop</code>项目的基本情况作了简要介绍：RHadoop<code>是由</code>RevolutionAnalytics<code>发起的基于</code>R<code>语言的开源数据分析项目。目前，</code>RHadoop<code>系列包包含</code>rmr<code>、</code>rhdfs<code>和</code>rhbase<code>三个</code>R<code>包，其分别与</code>Hadoop<code>系统架构中的</code>MapReduce<code>、</code>HDFS<code>和</code>HBase<code>相应。由于它们并未发布到</code>CRAN<code>上，因此，需要到</code>github<code>上的</code>RHadoop主页来寻找，具体地址在<a href="https://github.com/RevolutionAnalytics/RHadoop/wiki">这里</a>。<br>
<span id="more-8036"></span><br>
接下来，介绍了安装<code>RHadoop</code>需要的系统环境以及在Ubuntu系统下安装R软件的命令。由于<code>RHadoop</code>包在使用过程中要调用多个其它支撑包，因此，在安装之前，需要安装好<code>rJava</code>，<code>reshape2</code>，<code>Rcpp</code>，<code>iterators</code>，<code>itertools</code>，<code>digest</code>，<code>RJSONIO</code>，<code>functional</code>等8个支撑包。完成上述步骤之后，即可安装<code>rhdfs</code>和<code>rmr2</code>包了。</p>
<p><code>RHadoop</code>的命令与原生<code>Hadoop</code>命令相仿，只是为了调用方便做了一些封装。以<code>rhdfs</code>包为例。查看<code>hdfs</code>文件目录的<code>Hadoop</code>原生语句是：</p>
<pre>hadoopfs-ls/user
</pre>
<p>其对应的<code>RHadoop</code>的命令语句是：</p>
<pre>hdfs.ls("/user/")
</pre>
<p>查看<code>hadoop</code>数据文件的<code>hadoop</code>语句是：</p>
<pre>hadoopfs-cat /user/hdfs/o_same_school/part-m-00000
</pre>
<p>其对应的<code>RHadoop</code>的命令是：</p>
<pre>hdfs.cat(”/user/hdfs/o_same_school/part-m-00000″)
</pre>
<p>课件<code>RHadoop</code>的命令更符合<code>R</code>用户的习惯。</p>
<p><code>rmr2</code>包是帮助<code>R</code>实现<code>Map-Reduce</code>算法的包，基于它我们可以做很多提高效率的事情。一个简单的例子是：</p>
<pre>small.ints= 1:100000
sapply(small.ints, function(x) x^2)
</pre>
<p>基于<code>rmr2</code>的命令是：</p>
<pre>small.ints= to.dfs(1:100000)
mapreduce(input = small.ints, map = function(k, v) cbind(v, v^2))
from.dfs("/tmp/RtmpWnzxl4/file5deb791fcbd5")
</pre>
<p>由于<code>MapReduce</code>只能访问<code>HDFS</code>文件系统，因而，使用<code>MapReduce</code>功能之前需要借助<code>to.dfs()</code>函数将数据存储到<code>HDFS</code>文件系统里。调用<code>MapReduce</code>的运算结果时需要借助<code>from.dfs()</code>函数从<code>HDFS</code>文件系统中将其取出。</p>
<p>下面可以借助<code>rmr2</code>包对某个<code>*.txt</code>文件中出现的英文单词进行计数，相应的代码为：</p>
<pre>input&lt;-'/user/hdfs/o_same_school/part-m-00000'
wordcount= function(input, output = NULL, pattern = " "){
wc.map = function(., lines) {
keyval(unlist( strsplit( x = lines,split= pattern)),1)
}
wc.reduce=function(word, counts ) {
keyval(word, sum(counts))
}
mapreduce(input = input ,output = output, input.format= "text",
map = wc.map, reduce = wc.reduce,combine= T)
}
wordcount(input)
</pre>
<p><code>RHadoop</code>系列包的最后一个包是<code>RHbase</code>，它相当于是一个管理数据库的包。其包含的函数如下：</p>
<ul>
<li>hb.compact.table</li>
<li>hb.describe.table</li>
<li>hb.insert</li>
<li>hb.regions.table</li>
<li>hb.defaults</li>
<li>hb.get</li>
<li>hb.insert.data.frame</li>
<li>hb.scan</li>
<li>hb.delete</li>
<li>hb.delete</li>
<li>hb.get.data.frame</li>
<li>hb.list.tables</li>
<li>hb.scan.ex</li>
<li>hb.delete.table</li>
<li>hb.init</li>
<li>hb.new.table</li>
<li>hb.set.table.mode</li>
</ul>
<p>沙龙最后，嘉宾分享了基于原生<code>R</code>代码和<code>RHadoop</code> 实现推荐系统中经常用到的<code>协同过滤算法</code>的内容。<code>协同过滤算法</code>的原生思想比较简单，包含以下三个步骤：</p>
<ul>
<li>建立物品的同现矩阵</li>
<li>建立用户对物品的评分矩阵</li>
<li>矩阵计算推荐结果</li>
</ul>
<p>对应的原生<code>R</code>代码和<code>RHadoop</code>代码分别是：</p>
<h1>加载plyr包</h1>
<pre>library(plyr)</pre>
<h1>读取数据集</h1>
<pre>train&lt;-read.csv(file="small.csv",header=FALSE)
names(train)&lt;-c("user","item","pref")</pre>
<h1>计算用户列表</h1>
<pre>usersUnique&lt;-function(){
   users&lt;-unique(train$user) 
   users[order(users)] 
}</pre>
<h1>计算商品列表方法</h1>
<pre>itemsUnique&lt;-function(){ 
   items&lt;-unique(train$item) 
   items[order(items)] 
}</pre>
<h1>用户列表</h1>
<pre>users&lt;-usersUnique()
users</pre>
<h1>商品列表</h1>
<pre>items&lt;-itemsUnique()
items</pre>
<h1>建立商品列表索引</h1>
<pre>index&lt;-function(x) which(items %in% x)
data&lt;-ddply(train,.(user,item,pref),summarize,idx=index(item))</pre>
<h1>同现矩阵</h1>
<pre>cooccurrence&lt;-function(data){
   n&lt;-length(items)
   co&lt;-matrix(rep(0,n*n),nrow=n)
   for(u in users){
     idx&lt;-index(data$item[which(data$user==u)])
     m&lt;-merge(idx,idx)
       for(iin 1:nrow(m)){
          co[m$x[i],m$y[i]]=co[m$x[i],m$y[i]]+1
       }
   }
   return(co)
}</pre>
<h1>推荐算法</h1>
<pre>recommend&lt;-function(udata=udata,co=coMatrix,num=0){
   n&lt;-length(items) # all of pref
   pref&lt;-rep(0,n)
   pref[udata$idx]&lt;-udata$pref
   ## 用户评分矩阵
   userx&lt;-matrix(pref,nrow=n)
   ## 同现矩阵 * 评分矩阵
   r&lt;-co %*% userx
   ## 推荐结果排序
   r[udata$idx]&lt;-0
   idx&lt;-order(r,decreasing=TRUE)
   topn&lt;-data.frame(user=rep(udata$user[1],length(idx)),
                       item=items[idx], val=r[idx])
   ## 推荐结果取前num个
   if(num&gt;0) topn&lt;-head(topn,num) 
   ## 返回结果
   return(topn)
}
</pre>
<p>来自百度（销售管理中心）、新浪、IBM、亚马逊、京东、豆瓣、小米、去哪儿、中科软、泽佳、华丽志、宽连十方；ICON、新华网、<br>
银华基金、诺亚舟财务咨询有限公司、富国基金、安永；中国铁道科学研究院、中科院地理所、密苏里大学哥伦比亚、中国人民大学、<br>
中国中医科学院、苏州大学、北京邮电大学等企业和高校的人员报名参与了此次活动，席间与嘉宾积极互动，围绕主题展开了深入精彩的讨论。</p>
<h3>幻灯片下载</h3>
<p><a href="http://doc.fens.me/rhadoop-cos.pdf">COS数据沙龙第9期幻灯片</a></p>
<p><strong>现场图片</strong></p>
<p> <a href="http://blog.fens.me/wp-content/uploads/2013/06/rhadoop-cos4.jpg"><img class="alignnone size-full wp-image-787" alt="rhadoop-cos4" src="http://blog.fens.me/wp-content/uploads/2013/06/rhadoop-cos4.jpg" height="900" width="649"></a></p>
<p><strong>沙龙视频：</strong></p>
<p><strong>预告片</strong><br>
<iframe src="http://player.youku.com/embed/XNTc3NTE1NjI0" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p><strong>自我介绍</strong><br>
<iframe src="http://player.youku.com/embed/XNTc3OTk3NzAw" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p><strong>第一部分 – RHadoop的安装与使用介绍</strong><br>
<iframe src="http://player.youku.com/embed/XNTc4MDczMjQw" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p><strong>第二部分 – R实现MapReduce协同过滤算法</strong><br>
<iframe src="http://player.youku.com/embed/XNTc4MDU4NjE2" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p><strong>第三部分 – 操作演示</strong><br>
<iframe src="http://player.youku.com/embed/XNTc4MjE4Mjcy" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p><strong>第四部分 – 自由讨论</strong><br>
<iframe src="http://player.youku.com/embed/XNTc4MTYxNzQw" allowfullscreen="" frameborder="0" height="510" width="620"></iframe></p>
<p>更多沙龙信息请查看 <a href="http://cos.name/salon">http://cos.name/salon</a></p>
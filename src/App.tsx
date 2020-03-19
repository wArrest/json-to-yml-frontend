import React from 'react';
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <div className="info">
        <br/>
        <h2>JSON和YML在线转换</h2>
        <br/>
        <p>无聊的在线小项目，源码可参考 <a href="https://github.com/wArrest/json-to-yml-frontend">github地址</a></p>

        <h3>YAML:</h3>
        <p>YAML (YAML Ain't a Markup
          Language)YAML不是一种标记语言，通常以.yml为后缀的文件，是一种直观的能够被电脑识别的数据序列化格式，并且容易被人类阅读，容易和脚本语言交互的，可以被支持YAML库的不同的编程语言程序导入，一种专门用来写配置文件的语言。可用于如：
          Java，C/C++, Ruby, Python, Perl, C#, PHP等。</p>
        <h3>JSON:</h3>
        <p>
          JSON(JavaScript Object Notation)是一种轻量级的数据交换格式，它基于JavaScript的一个子集，易于人的编写和阅读，也易于机器解析。
          JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。
        </p>
      </div>
      <div className="json-editor"><h2>JSON</h2>
        <textarea/>
      </div>
      <div className="yml-editor"><h2>YAML</h2>
        <textarea/>
      </div>
    </div>
  );
}

export default App;
